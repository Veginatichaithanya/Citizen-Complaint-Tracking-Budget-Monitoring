import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles"> & {
  complaintsCount?: number;
};

const AdminCitizens = () => {
  const [citizens, setCitizens] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch complaint counts for each citizen
      const profilesWithCounts = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { count } = await supabase
            .from("complaints")
            .select("*", { count: "exact", head: true })
            .eq("citizen_id", profile.id);

          return { ...profile, complaintsCount: count || 0 };
        })
      );

      setCitizens(profilesWithCounts);
    } catch (error) {
      console.error("Error fetching citizens:", error);
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
      key: "complaintsCount",
      label: "Complaints",
      render: (item: Profile) => (
        <span className="font-semibold">{item.complaintsCount || 0}</span>
      ),
    },
    {
      key: "created_at",
      label: "Joined",
      className: "text-muted-foreground hidden sm:table-cell",
      render: (item: Profile) => new Date(item.created_at).toLocaleDateString('en-IN'),
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Citizens</h1>
              <p className="text-muted-foreground mt-1">Manage registered citizens</p>
            </div>
          </div>
          <Input placeholder="Search citizens..." className="md:w-64" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Citizens</p>
            <p className="text-2xl font-bold text-foreground mt-1">{citizens.length}</p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {citizens.filter((c) => new Date(c.created_at).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg sm:col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground">Total Complaints</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {citizens.reduce((sum, c) => sum + (c.complaintsCount || 0), 0)}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable data={citizens} columns={columns} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminCitizens;
