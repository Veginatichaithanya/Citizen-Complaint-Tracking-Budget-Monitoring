import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle } from "lucide-react";
import ComplaintTable, { Complaint } from "@/components/authority/ComplaintTable";
import { mockComplaints } from "@/lib/mockData";

const AuthorityCompleted = () => {
  const completedComplaints: Complaint[] = mockComplaints
    .filter((c) => c.status === "resolved" && c.assignedTo === "Authority Officer 1")
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
          <div className="p-3 bg-[hsl(var(--status-completed))]/10 rounded-full">
            <CheckCircle className="text-[hsl(var(--status-completed))]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Completed Complaints</h1>
            <p className="text-muted-foreground mt-1">
              View all successfully resolved cases
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Completed</p>
            <p className="text-2xl font-bold text-foreground mt-1">{completedComplaints.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {completedComplaints.filter((c) => new Date(c.dateAssigned).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
            <p className="text-2xl font-bold text-foreground mt-1">3.5 days</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <ComplaintTable complaints={completedComplaints} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuthorityCompleted;
