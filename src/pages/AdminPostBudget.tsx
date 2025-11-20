import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { FileText, Upload, IndianRupee } from "lucide-react";
import { formatCurrencyInput, parseIndianCurrency } from "@/lib/utils";

const AdminPostBudget = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    amount: "",
    description: "",
    fiscalYear: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to post budgets');
      }

      const { error } = await supabase.from('budgets').insert({
        title: formData.title,
        department: formData.department,
        amount: parseIndianCurrency(formData.amount),
        description: formData.description,
        fiscal_year: formData.fiscalYear,
        created_by: user.id,
      });

      if (error) throw error;

      toast({
        title: "Budget Posted",
        description: "Budget has been successfully published.",
      });
      
      setFormData({ title: "", department: "", amount: "", description: "", fiscalYear: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post budget.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <FileText className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Post New Budget</h1>
            <p className="text-muted-foreground mt-1">Publish budget allocations for public transparency</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Budget Information</CardTitle>
            <CardDescription>Fill in the details for the new budget document</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Budget Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Road Infrastructure Development FY 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public_works">Public Works</SelectItem>
                      <SelectItem value="health">Health Services</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscalYear">Fiscal Year *</Label>
                  <Input
                    id="fiscalYear"
                    placeholder="2024"
                    value={formData.fiscalYear}
                    onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount (₹) *</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="amount"
                    type="text"
                    placeholder="50,00,000"
                    value={formData.amount}
                    onChange={(e) => {
                      const formatted = formatCurrencyInput(e.target.value);
                      setFormData({ ...formData, amount: formatted });
                    }}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the budget allocation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Upload Budget Document *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto text-muted-foreground mb-2" size={32} />
                  <p className="text-sm text-muted-foreground">Click to upload budget PDF</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF format (max 50MB)</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Budget'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPostBudget;
