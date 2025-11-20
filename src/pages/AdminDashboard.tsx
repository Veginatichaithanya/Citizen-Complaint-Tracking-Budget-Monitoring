import { Users, FileText, MessageSquare, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardCard from "@/components/DashboardCard";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCitizens: 0,
    totalBudgets: 0,
    activeComplaints: 0,
    totalAuthorities: 0,
  });
  const [recentBudgets, setRecentBudgets] = useState<any[]>([]);
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch citizens count
      const { count: citizensCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'citizen');

      // Fetch authorities count
      const { count: authoritiesCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'authority');

      // Fetch budgets count and recent budgets
      const { count: budgetsCount } = await supabase
        .from('budgets')
        .select('*', { count: 'exact', head: true });

      const { data: budgetsData } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch complaints count and recent complaints
      const { count: complaintsCount } = await supabase
        .from('complaints')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'resolved');

      const { data: complaintsData } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      setStats({
        totalCitizens: citizensCount || 0,
        totalBudgets: budgetsCount || 0,
        activeComplaints: complaintsCount || 0,
        totalAuthorities: authoritiesCount || 0,
      });

      setRecentBudgets(budgetsData || []);
      setRecentComplaints(complaintsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage budgets, users, and system oversight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Citizens"
            value={stats.totalCitizens}
            icon={Users}
            trend={{ value: 0, label: "registered users" }}
          />
          <DashboardCard
            title="Budgets Posted"
            value={stats.totalBudgets}
            icon={FileText}
            trend={{ value: 0, label: "total budgets" }}
          />
          <DashboardCard
            title="Active Complaints"
            value={stats.activeComplaints}
            icon={MessageSquare}
            trend={{ value: 0, label: "pending resolution" }}
          />
          <DashboardCard
            title="Authorities"
            value={stats.totalAuthorities}
            icon={Shield}
            trend={{ value: 0, label: "active officers" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-serif font-bold mb-4">Recent Budgets</h3>
            <div className="space-y-3">
              {loading ? (
                <p className="text-muted-foreground text-center py-4">Loading...</p>
              ) : recentBudgets.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No budgets posted yet</p>
              ) : (
                recentBudgets.map((budget) => (
                  <div key={budget.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{budget.title}</p>
                      <p className="text-sm text-muted-foreground">{budget.department}</p>
                    </div>
                    <span className="text-sm font-semibold">${Number(budget.amount).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-xl font-serif font-bold mb-4">Recent Complaints</h3>
            <div className="space-y-3">
              {loading ? (
                <p className="text-muted-foreground text-center py-4">Loading...</p>
              ) : recentComplaints.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No complaints yet</p>
              ) : (
                recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-muted-foreground">{complaint.department}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      {complaint.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
