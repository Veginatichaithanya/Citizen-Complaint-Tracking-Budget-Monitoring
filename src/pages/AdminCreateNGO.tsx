import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const ngoSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters').max(200),
  representativeName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(15),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

const AdminCreateNGO = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    representativeName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = ngoSchema.parse(formData);

      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: validatedData.representativeName,
            mobile: validatedData.mobile,
            address: validatedData.organizationName,
            role: 'ngo',
          },
        },
      });

      if (error) throw error;

      toast({
        title: "NGO Account Created",
        description: `Account for ${validatedData.organizationName} has been created successfully.`,
      });
      
      setFormData({ organizationName: "", representativeName: "", email: "", mobile: "", password: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to create NGO account.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Building className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Create NGO Account</h1>
            <p className="text-muted-foreground mt-1">Register a new NGO organization</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">NGO Information</CardTitle>
            <CardDescription>Fill in the details for the new NGO account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Transparency International"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="representativeName">Representative Name *</Label>
                <Input
                  id="representativeName"
                  placeholder="Jane Smith"
                  value={formData.representativeName}
                  onChange={(e) => setFormData({ ...formData, representativeName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@ngo.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Contact Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The NGO representative will use this password to log in for the first time
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create NGO Account'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCreateNGO;
