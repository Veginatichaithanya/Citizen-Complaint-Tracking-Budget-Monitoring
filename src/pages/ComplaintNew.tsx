import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ComplaintNew = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    priority: "",
    anonymous: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a complaint",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      let documentUrl = null;

      // Upload file if selected
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('complaint-documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('complaint-documents')
          .getPublicUrl(uploadData.path);

        documentUrl = publicUrl;
      }

      // Insert complaint into database
      const { error: insertError } = await supabase
        .from('complaints')
        .insert({
          citizen_id: user.id,
          title: formData.title,
          department: formData.department,
          description: formData.description,
          priority: formData.priority,
          image_url: documentUrl,
          status: 'pending',
        });

      if (insertError) throw insertError;

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted for review.",
      });

      // Reset form
      setFormData({
        title: "",
        department: "",
        description: "",
        priority: "",
        anonymous: false,
      });
      setFile(null);

      // Navigate to complaint status page
      navigate('/dashboard/complaint-status');
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="citizen">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageSquare className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Submit a Complaint
            </h1>
            <p className="text-muted-foreground mt-1">
              Report budget misuse or irregularities
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Complaint Details</CardTitle>
            <CardDescription>
              Please provide detailed information about the issue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief summary of the issue"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">Related Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData({ ...formData, department: value })
                  }
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
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the issue, including dates, amounts, and any relevant information..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={6}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="files">Supporting Documents (Optional)</Label>
                <input
                  type="file"
                  id="files"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="files"
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer block"
                >
                  <Upload className="mx-auto text-muted-foreground mb-2" size={32} />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, images, or documents (max 10MB)
                  </p>
                </label>
                
                {file && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Upload size={16} />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {/* Anonymous */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) =>
                    setFormData({ ...formData, anonymous: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border"
                />
                <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                  Submit anonymously (your identity will be protected)
                </Label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Complaint"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  disabled={submitting}
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintNew;
