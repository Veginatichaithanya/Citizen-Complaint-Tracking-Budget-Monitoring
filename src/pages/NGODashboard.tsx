import { FileText, Shield, CheckCircle, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCard from "@/components/DashboardCard";
import { mockNGOReports, mockComplaints } from "@/lib/mockData";

const NGODashboard = () => {
  const verifiedComplaints = mockComplaints.filter((c) => c.status === "resolved").length;

  return (
    <DashboardLayout role="ngo">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">NGO Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor transparency and verify compliance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Published Reports"
            value={mockNGOReports.length}
            icon={FileText}
            trend={{ value: 12, label: "this quarter" }}
          />
          <DashboardCard
            title="Verified Complaints"
            value={verifiedComplaints}
            icon={Shield}
          />
          <DashboardCard
            title="Compliance Rate"
            value="85%"
            icon={CheckCircle}
            trend={{ value: 5, label: "from last quarter" }}
          />
          <DashboardCard
            title="Active Investigations"
            value={mockComplaints.filter((c) => c.status === "under_investigation").length}
            icon={BarChart3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-serif font-bold mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {mockNGOReports.map((report) => (
                <div key={report.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{report.ngoName}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{report.datePublished}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-serif font-bold mb-4">Key Findings</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Healthcare budget properly allocated</p>
                  <p className="text-xs text-muted-foreground mt-1">Verified on 2024-02-28</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-yellow-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium">Public Works requires closer monitoring</p>
                  <p className="text-xs text-muted-foreground mt-1">Report pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NGODashboard;
