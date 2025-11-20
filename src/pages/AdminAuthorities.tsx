import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles"> & {
  assignedCount?: number;
  resolvedCount?: number;
};

const AdminAuthorities = () => {
  const navigate = useNavigate();
  const [authorities, setAuthorities] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorities();
  }, []);

  const fetchAuthorities = async () => {
    try {
      // Get all users with authority role
      const { data: authorityRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "authority")
        .eq("is_approved", true);

      if (rolesError) throw rolesError;

      const authorityIds = authorityRoles?.map((r) => r.user_id) || [];

      if (authorityIds.length === 0) {
        setAuthorities([]);
        setLoading(false);
        return;
      }

      // Fetch profiles for authorities
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", authorityIds);

      if (profilesError) throw profilesError;

      // Fetch complaint counts for each authority
      const authoritiesWithCounts = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { count: assignedCount } = await supabase
            .from("complaints")
            .select("*", { count: "exact", head: true })
            .eq("assigned_authority_id", profile.id);

          const { count: resolvedCount } = await supabase
            .from("complaints")
            .select("*", { count: "exact", head: true })
            .eq("assigned_authority_id", profile.id)
            .eq("status", "resolved");

          return {
            ...profile,
            assignedCount: assignedCount || 0,
            resolvedCount: resolvedCount || 0,
          };
        })
      );

      setAuthorities(authoritiesWithCounts);
    } catch (error) {
      console.error("Error fetching authorities:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "full_name",
      label: "Name",
      className: "font-medium",
    },
    {
      key: "email",
      label: "Email",
      className: "text-muted-foreground hidden md:table-cell",
    },
    {
      key: "mobile",
      label: "Phone",
      className: "text-muted-foreground hidden lg:table-cell",
    },
    {
      key: "assignedCount",
      label: "Assigned",
      render: (item: Profile) => (
        <span className="font-semibold">{item.assignedCount || 0}</span>
      ),
    },
    {
      key: "resolvedCount",
      label: "Resolved",
      render: (item: Profile) => (
        <span className="font-semibold text-green-600">{item.resolvedCount || 0}</span>
      ),
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Authority Officers</h1>
              <p className="text-muted-foreground mt-1">Manage authority officers and assignments</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Input placeholder="Search officers..." className="sm:w-64" />
            <Button onClick={() => navigate("/admin/create-authority")} className="w-full sm:w-auto whitespace-nowrap">
              <Plus size={16} className="mr-2" />
              Add Officer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Officers</p>
            <p className="text-2xl font-bold text-foreground mt-1">{authorities.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Active Assignments</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {authorities.reduce((sum, a) => sum + (a.assignedCount || 0), 0)}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg sm:col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground">Total Resolved</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {authorities.reduce((sum, a) => sum + (a.resolvedCount || 0), 0)}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable data={authorities} columns={columns} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminAuthorities;
