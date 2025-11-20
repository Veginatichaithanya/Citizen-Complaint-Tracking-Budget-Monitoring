import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { formatIndianCurrency } from "@/lib/utils";

type Budget = Tables<"budgets">;

const Budgets = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Budget Title",
      render: (item: Budget) => (
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="text-primary" size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{item.title}</p>
            <p className="text-sm text-muted-foreground truncate">{item.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (item: Budget) => (
        <span className="font-semibold text-foreground whitespace-nowrap">
          ₹{formatIndianCurrency(item.amount)}
        </span>
      ),
    },
    {
      key: "fiscal_year",
      label: "FY",
      className: "text-muted-foreground hidden md:table-cell",
    },
    {
      key: "created_at",
      label: "Date",
      className: "text-muted-foreground hidden lg:table-cell",
      render: (item: Budget) => new Date(item.created_at).toLocaleDateString('en-IN'),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: Budget) => (
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Download size={16} className="mr-1 md:mr-2" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout role="citizen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Budget Documents
            </h1>
            <p className="text-muted-foreground mt-2">
              View and download all published municipal budgets
            </p>
          </div>
          <Input
            placeholder="Search budgets..."
            className="md:w-64"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Budgets</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {budgets.length}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-xl md:text-2xl font-bold text-foreground mt-1 truncate">
              ₹{formatIndianCurrency(budgets.reduce((sum, b) => sum + b.amount, 0))}
            </p>
          </div>
          <div className="p-4 bg-card border border-border rounded-lg sm:col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground">This Year</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {budgets.filter((b) => b.fiscal_year === new Date().getFullYear().toString()).length}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              data={budgets}
              columns={columns}
              onRowClick={(item) => navigate(`/budgets/${item.id}`)}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Budgets;
