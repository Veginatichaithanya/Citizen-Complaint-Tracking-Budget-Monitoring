import DashboardLayout from "@/components/DashboardLayout";
import { mockComplaints } from "@/lib/mockData";
import { MessageSquare } from "lucide-react";
import ComplaintTable, { Complaint } from "@/components/authority/ComplaintTable";

const AuthorityComplaints = () => {
  const assignedToMe: Complaint[] = mockComplaints
    .filter((c) => c.assignedTo === "Authority Officer 1")
    .map((c) => ({
      id: c.id,
      citizenName: "John Citizen",
      title: c.title,
      department: c.department,
      description: "Complaint description",
      dateAssigned: c.dateSubmitted,
      status: c.status,
      priority: c.priority,
    }));

  return (
    <DashboardLayout role="authority">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageSquare className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Assigned Complaints</h1>
            <p className="text-muted-foreground mt-1">Review and manage your assigned cases</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground">Total Assigned</p>
            <p className="text-2xl font-bold text-foreground mt-1">{assignedToMe.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground">High Priority</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {assignedToMe.filter((c) => c.priority === "high").length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {assignedToMe.filter((c) => c.status === "resolved").length}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <ComplaintTable complaints={assignedToMe} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuthorityComplaints;
