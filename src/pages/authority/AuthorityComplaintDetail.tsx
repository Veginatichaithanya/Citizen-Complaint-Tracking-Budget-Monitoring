import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Building, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/authority/StatusBadge";
import ActionUpdateForm from "@/components/authority/ActionUpdateForm";
import Timeline, { TimelineItem } from "@/components/authority/Timeline";
import { mockComplaints } from "@/lib/mockData";

const AuthorityComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find complaint by ID
  const complaint = mockComplaints.find((c) => c.id === id);

  if (!complaint) {
    return (
      <DashboardLayout role="authority">
        <div className="text-center py-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Complaint Not Found</h2>
          <Button onClick={() => navigate("/authority/complaints")}>
            <ArrowLeft size={16} className="mr-2" /> Back to Complaints
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const mockTimeline: TimelineItem[] = [
    {
      id: "1",
      date: "March 15, 2024",
      time: "10:30 AM",
      title: "Complaint Assigned",
      description: "Complaint assigned to you by Admin",
      author: "System Admin",
      type: "admin",
    },
    {
      id: "2",
      date: "March 16, 2024",
      time: "02:15 PM",
      title: "Investigation Started",
      description: "Site visit scheduled and initial assessment completed",
      author: "Authority Officer",
      type: "authority",
    },
  ];

  return (
    <DashboardLayout role="authority">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/authority/complaints")}>
            <ArrowLeft size={18} className="mr-2" /> Back to Complaints
          </Button>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Complaint Summary */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground font-mono">{complaint.id}</p>
              <h1 className="text-3xl font-serif font-bold mt-1">{complaint.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <User className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted By</p>
                <p className="font-medium">John Citizen</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <Building className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{complaint.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <Calendar className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Assigned</p>
                <p className="font-medium">{complaint.dateSubmitted}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-start gap-2">
              <FileText className="text-muted-foreground mt-1" size={18} />
              <div>
                <h3 className="font-semibold mb-2">Citizen's Message</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. The road conditions are severely 
                  deteriorated, causing significant inconvenience to residents and posing safety risks. 
                  Immediate attention is required to prevent accidents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Action Form and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Update Form */}
          <div>
            <ActionUpdateForm complaintId={complaint.id} />
          </div>

          {/* Activity Timeline */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-6">Activity Timeline</h3>
            <Timeline items={mockTimeline} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuthorityComplaintDetail;
