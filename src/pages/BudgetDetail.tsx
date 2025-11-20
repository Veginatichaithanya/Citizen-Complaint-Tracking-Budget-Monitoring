import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, Calendar, IndianRupee, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { formatIndianCurrency } from "@/lib/utils";

type Budget = Tables<"budgets">;

const BudgetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBudget();
  }, [id]);

  const fetchBudget = async () => {
    try {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="citizen">
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!budget) {
    return (
      <DashboardLayout role="citizen">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Budget not found</p>
          <Button onClick={() => navigate("/budgets")} className="mt-4">
            Back to Budgets
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="citizen">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/budgets")}
            className="shrink-0"
          >
            <ArrowLeft />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground break-words">
              {budget.title}
            </h1>
            <p className="text-muted-foreground mt-1">{budget.department}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Amount</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold truncate">₹{formatIndianCurrency(budget.amount)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold truncate">{budget.department}</div>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fiscal Year</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budget.fiscal_year}</div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{budget.description}</p>
          </CardContent>
        </Card>

        {/* Document Viewer */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="font-serif">Budget Document</CardTitle>
              <Button className="w-full sm:w-auto">
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground">Document preview would appear here</p>
              <p className="text-sm text-muted-foreground mt-2">
                Click download to view the full budget document
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BudgetDetail;
