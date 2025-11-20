import { MessageSquare, CheckCircle, Clock, TrendingUp, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCard from "@/components/DashboardCard";
import { mockComplaints } from "@/lib/mockData";
import AuthorityParallaxHero from "@/components/authority/AuthorityParallaxHero";
import heroImage from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthorityDashboard = () => {
  const navigate = useNavigate();
  const assignedToMe = mockComplaints.filter((c) => c.assignedTo === "Authority Officer 1");
  const resolved = assignedToMe.filter((c) => c.status === "resolved");
  const pending = assignedToMe.filter((c) => c.status === "pending");
  const investigating = assignedToMe.filter((c) => c.status === "under_investigation");

  return (
    <>
      <AuthorityParallaxHero
        title="Municipal Authority Dashboard"
        subtitle="Manage assigned complaints and ensure transparency"
        imageUrl={heroImage}
      />
      
      <DashboardLayout role="authority">
        <div className="space-y-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">Track and manage your assigned work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="text-primary" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{assignedToMe.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Assigned to Me</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[hsl(var(--status-investigating))]/10 rounded-lg">
                  <Clock className="text-[hsl(var(--status-investigating))]" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{investigating.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Under Investigation</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[hsl(var(--status-completed))]/10 rounded-lg">
                  <CheckCircle className="text-[hsl(var(--status-completed))]" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{resolved.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Resolved</p>
              <p className="text-xs text-[hsl(var(--status-completed))] mt-2">+25% this month</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="text-accent" size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {Math.round((resolved.length / assignedToMe.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Resolution Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Urgent Complaints</h3>
                <div className="p-2 bg-[hsl(var(--status-rejected))]/10 rounded">
                  <AlertCircle className="text-[hsl(var(--status-rejected))]" size={20} />
                </div>
              </div>
              <div className="space-y-3">
                {assignedToMe
                  .filter((c) => c.priority === "high")
                  .map((complaint) => (
                    <div
                      key={complaint.id}
                      className="p-4 bg-[hsl(var(--status-rejected))]/5 border border-[hsl(var(--status-rejected))]/20 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/authority/complaint/${complaint.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-foreground font-mono text-sm">{complaint.id}</p>
                          <p className="text-sm text-foreground/80 mt-1">{complaint.title}</p>
                        </div>
                        <span className="text-xs px-3 py-1 bg-[hsl(var(--status-rejected))]/10 text-[hsl(var(--status-rejected))] rounded-full font-medium">
                          URGENT
                        </span>
                      </div>
                    </div>
                  ))}
                {assignedToMe.filter((c) => c.priority === "high").length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No urgent complaints</p>
                )}
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {assignedToMe.slice(0, 4).map((complaint, index) => (
                  <div
                    key={complaint.id}
                    className="flex gap-3 items-start p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/authority/complaint/${complaint.id}`)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{complaint.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Status: {complaint.status.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate("/authority/complaints")}
              >
                View All Complaints
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AuthorityDashboard;
