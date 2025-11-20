import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare } from "lucide-react";
import Timeline, { TimelineItem } from "@/components/authority/Timeline";

const AuthorityCommunication = () => {
  const mockCommunications: TimelineItem[] = [
    {
      id: "1",
      date: "March 18, 2024",
      time: "11:45 AM",
      title: "Admin Query",
      description: "Please provide an update on the road repair status in Ward 5.",
      author: "Admin - Municipal Office",
      type: "admin",
    },
    {
      id: "2",
      date: "March 18, 2024",
      time: "03:20 PM",
      title: "Authority Response",
      description: "Site inspection completed. Work will commence on March 20th. Expected completion in 5 days.",
      author: "You",
      type: "authority",
    },
    {
      id: "3",
      date: "March 17, 2024",
      time: "09:30 AM",
      title: "Citizen Follow-up",
      description: "Requesting status update on complaint #C001. No progress visible yet.",
      author: "John Citizen",
      type: "citizen",
    },
    {
      id: "4",
      date: "March 17, 2024",
      time: "02:15 PM",
      title: "Authority Update",
      description: "Materials have been ordered. Awaiting delivery. Will update once work begins.",
      author: "You",
      type: "authority",
    },
    {
      id: "5",
      date: "March 15, 2024",
      time: "04:00 PM",
      title: "Admin Assignment",
      description: "New complaint assigned regarding water supply disruption in Ward 3.",
      author: "Admin - Municipal Office",
      type: "admin",
    },
  ];

  return (
    <DashboardLayout role="authority">
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageSquare className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Communication Logs</h1>
            <p className="text-muted-foreground mt-1">
              Track all messages and updates between you, admin, and citizens
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <Timeline items={mockCommunications} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuthorityCommunication;
