import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";

type Complaint = Tables<"complaints">;

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700 border-yellow-300",
    in_progress: "bg-blue-500/10 text-blue-700 border-blue-300",
    work_started: "bg-purple-500/10 text-purple-700 border-purple-300",
    completed: "bg-green-500/10 text-green-700 border-green-300",
    rejected: "bg-red-500/10 text-red-700 border-red-300",
  };

  const priorityColors: Record<string, string> = {
    high: "bg-red-500/10 text-red-700 border-red-300",
    medium: "bg-blue-500/10 text-blue-700 border-blue-300",
    low: "bg-gray-500/10 text-gray-700 border-gray-300",
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm hidden lg:table-cell",
      render: (item: Complaint) => item.id.slice(0, 8),
    },
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "department",
      label: "Department",
      className: "text-muted-foreground hidden md:table-cell",
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
      key: "priority",
      label: "Priority",
      className: "hidden lg:table-cell",
      render: (item: Complaint) => (
        <Badge
          variant="outline"
          className={priorityColors[item.priority || "medium"]}
        >
          {(item.priority || "medium").toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "assigned_authority_id",
      label: "Assigned",
      className: "hidden md:table-cell",
      render: (item: Complaint) => (
        <span className="text-muted-foreground text-sm">
          {item.assigned_authority_id ? "Assigned" : "Unassigned"}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MessageSquare className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">All Complaints</h1>
              <p className="text-muted-foreground mt-1">Review and assign complaints</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            <Input placeholder="Search..." className="flex-1 md:w-48" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground mt-1">{complaints.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {complaints.filter((c) => c.status === "pending").length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {complaints.filter((c) => c.status === "in_progress" || c.status === "work_started").length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {complaints.filter((c) => c.status === "completed").length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable data={complaints} columns={columns} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminComplaints;
