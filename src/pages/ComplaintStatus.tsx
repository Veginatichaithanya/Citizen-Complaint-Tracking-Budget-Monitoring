import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { mockComplaints } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const ComplaintStatus = () => {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700 border-yellow-300",
    under_investigation: "bg-blue-500/10 text-blue-700 border-blue-300",
    resolved: "bg-green-500/10 text-green-700 border-green-300",
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      className: "font-mono text-sm",
    },
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "department",
      label: "Department",
      className: "text-muted-foreground",
    },
    {
      key: "priority",
      label: "Priority",
      render: (item: typeof mockComplaints[0]) => (
        <Badge
          variant="outline"
          className={
            item.priority === "high"
              ? "bg-red-500/10 text-red-700 border-red-300"
              : "bg-blue-500/10 text-blue-700 border-blue-300"
          }
        >
          {item.priority.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: typeof mockComplaints[0]) => (
        <Badge className={statusColors[item.status]} variant="outline">
          {item.status.replace("_", " ").toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "dateSubmitted",
      label: "Submitted",
      className: "text-muted-foreground",
    },
  ];

  const stats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter((c) => c.status === "pending").length,
    investigating: mockComplaints.filter((c) => c.status === "under_investigation").length,
    resolved: mockComplaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <DashboardLayout role="citizen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Complaint Status
          </h1>
          <p className="text-muted-foreground mt-2">
            Track the progress of your submitted complaints
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <CardTitle className="text-sm font-medium">Investigating</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.investigating}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <DataTable
          data={mockComplaints}
          columns={columns}
          onRowClick={(item) => console.log("View complaint:", item.id)}
        />

        {/* Timeline Example */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Recent Complaint Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaints[0].timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    {index < mockComplaints[0].timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-foreground capitalize">
                      {event.status.replace("_", " ")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{event.note}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintStatus;
