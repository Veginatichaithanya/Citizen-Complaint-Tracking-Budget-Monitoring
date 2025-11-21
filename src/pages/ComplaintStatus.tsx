import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface Complaint {
  id: string;
  title: string;
  description: string;
  department: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

interface ComplaintUpdate {
  id: number;
  update_text: string;
  created_at: string;
  status: string;
}

const ComplaintStatus = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [latestComplaint, setLatestComplaint] = useState<Complaint | null>(null);
  const [timeline, setTimeline] = useState<ComplaintUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700 border-yellow-300",
    in_progress: "bg-blue-500/10 text-blue-700 border-blue-300",
    work_started: "bg-purple-500/10 text-purple-700 border-purple-300",
    completed: "bg-green-500/10 text-green-700 border-green-300",
    rejected: "bg-red-500/10 text-red-700 border-red-300",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-blue-500/10 text-blue-700 border-blue-300",
    medium: "bg-yellow-500/10 text-yellow-700 border-yellow-300",
    high: "bg-red-500/10 text-red-700 border-red-300",
  };

  // Fetch complaints for current user
  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .eq("citizen_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching complaints:", error);
      } else {
        setComplaints(data || []);
        if (data && data.length > 0) {
          setLatestComplaint(data[0]);
          fetchTimeline(data[0].id);
        }
      }
      setLoading(false);
    };

    fetchComplaints();
  }, [user]);

  // Fetch timeline for the latest complaint
  const fetchTimeline = async (complaintId: string) => {
    const { data, error } = await supabase
      .from("complaint_updates")
      .select("*")
      .eq("complaint_id", complaintId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching timeline:", error);
    } else {
      setTimeline(data || []);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("complaint-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "complaints",
          filter: `citizen_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Complaint change received:", payload);
          
          if (payload.eventType === "INSERT") {
            setComplaints((prev) => [payload.new as Complaint, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setComplaints((prev) =>
              prev.map((c) =>
                c.id === payload.new.id ? (payload.new as Complaint) : c
              )
            );
            if (latestComplaint?.id === payload.new.id) {
              setLatestComplaint(payload.new as Complaint);
            }
          } else if (payload.eventType === "DELETE") {
            setComplaints((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "complaint_updates",
        },
        (payload) => {
          console.log("New complaint update:", payload);
          if (latestComplaint && (payload.new as any).complaint_id === latestComplaint.id) {
            setTimeline((prev) => [...prev, payload.new as ComplaintUpdate]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, latestComplaint]);

  // Calculate statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in_progress" || c.status === "work_started").length,
    completed: complaints.filter((c) => c.status === "completed").length,
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-xs",
      render: (item: Complaint) => item.id.substring(0, 8),
    },
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "department",
      label: "Department",
      className: "text-muted-foreground capitalize",
      render: (item: Complaint) => item.department.replace("_", " "),
    },
    {
      key: "priority",
      label: "Priority",
      render: (item: Complaint) => (
        <Badge variant="outline" className={priorityColors[item.priority] || ""}>
          {item.priority.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: Complaint) => (
        <Badge className={statusColors[item.status] || ""} variant="outline">
          {item.status.replace("_", " ").toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Submitted",
      className: "text-muted-foreground",
      render: (item: Complaint) => format(new Date(item.created_at), "MMM dd, yyyy"),
    },
  ];

  return (
    <DashboardLayout role="citizen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Complaint Status
          </h1>
          <p className="text-muted-foreground mt-2">
            Track the progress of your submitted complaints in real-time
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading your complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Complaints Yet</h3>
              <p className="text-muted-foreground">
                You haven't submitted any complaints. Start by reporting an issue.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pending}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.inProgress}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completed}</div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <div className="animate-fade-in">
              <DataTable
                data={complaints}
                columns={columns}
                onRowClick={(item) => console.log("View complaint:", item.id)}
              />
            </div>

            {/* Timeline for latest complaint */}
            {latestComplaint && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-serif">
                    Recent Complaint Timeline
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {latestComplaint.title}
                  </p>
                </CardHeader>
                <CardContent>
                  {timeline.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No updates yet for this complaint
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {/* Initial submission */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                          {timeline.length > 0 && (
                            <div className="w-0.5 h-12 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium text-foreground">
                            Submitted
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Complaint submitted by you
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(latestComplaint.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                          </p>
                        </div>
                      </div>

                      {/* Updates */}
                      {timeline.map((event, index) => (
                        <div key={event.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-primary rounded-full" />
                            {index < timeline.length - 1 && (
                              <div className="w-0.5 h-12 bg-border" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium text-foreground capitalize">
                              {event.status?.replace("_", " ") || "Update"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {event.update_text}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(event.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ComplaintStatus;
