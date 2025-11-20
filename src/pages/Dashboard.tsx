import { FileText, MessageSquare, CheckCircle, AlertCircle, Users, Star, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCard from "@/components/DashboardCard";
import DataTable from "@/components/DataTable";
import CitizenHero from "@/components/CitizenHero";
import ParallaxBanner from "@/components/ParallaxBanner";
import { mockActivities, mockComplaints } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
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
      key: "status",
      label: "Status",
      render: (item: typeof mockComplaints[0]) => (
        <Badge className={statusColors[item.status] || ""} variant="outline">
          {item.status.replace("_", " ").toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "dateSubmitted",
      label: "Date",
      className: "text-muted-foreground",
    },
  ];

  return (
    <DashboardLayout role="citizen">
      <div className="space-y-8">
        {/* Hero Section */}
        <CitizenHero />

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 animate-fade-in">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="View Budget Data"
              description="Browse and analyze public budget allocations"
              icon={FileText}
              actionLabel="Browse Budgets"
              actionLink="/budgets"
              className="animate-fade-in"
            />
            <DashboardCard
              title="File Complaint"
              description="Report budget misuse or corruption concerns"
              icon={MessageSquare}
              actionLabel="New Complaint"
              actionLink="/complaint/new"
              className="animate-fade-in"
            />
            <DashboardCard
              title="Check Status"
              description="Track your complaint progress and updates"
              icon={TrendingUp}
              actionLabel="View Status"
              actionLink="/complaint/status"
              className="animate-fade-in"
            />
            <DashboardCard
              title="Create Groups"
              description="Collaborate with other citizens"
              icon={Users}
              actionLabel="Manage Groups"
              actionLink="/groups"
              className="animate-fade-in"
            />
            <DashboardCard
              title="Give Suggestions"
              description="Provide feedback to improve transparency"
              icon={Star}
              actionLabel="Submit Ideas"
              actionLink="/suggestions"
              className="animate-fade-in"
            />
            <DashboardCard
              title="Browse Complaints"
              description="View public complaints and discussions"
              icon={CheckCircle}
              actionLabel="Explore"
              actionLink="/complaints/browse"
              className="animate-fade-in"
            />
          </div>
        </div>

        {/* Parallax Separator */}
        <ParallaxBanner />

        {/* Stats Grid */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6">Your Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Budgets"
              value={25}
              icon={FileText}
              trend={{ value: 12, label: "from last month" }}
            />
            <DashboardCard
              title="My Complaints"
              value={3}
              icon={MessageSquare}
              trend={{ value: -5, label: "from last month" }}
            />
            <DashboardCard
              title="Resolved"
              value={2}
              icon={CheckCircle}
              trend={{ value: 100, label: "resolution rate" }}
            />
            <DashboardCard
              title="Pending"
              value={1}
              icon={AlertCircle}
              trend={{ value: 0, label: "awaiting action" }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Recent Activity
          </h2>
          <div className="grid gap-4">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {activity.icon === "FileText" && (
                      <FileText className="text-primary" size={20} />
                    )}
                    {activity.icon === "CheckCircle" && (
                      <CheckCircle className="text-primary" size={20} />
                    )}
                    {activity.icon === "Shield" && (
                      <AlertCircle className="text-primary" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {activity.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Complaints */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">
            My Complaints
          </h2>
          <DataTable
            data={mockComplaints.slice(0, 3)}
            columns={columns}
            onRowClick={(item) => console.log("Clicked:", item)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
