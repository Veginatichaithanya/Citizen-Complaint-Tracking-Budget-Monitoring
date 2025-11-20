import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Upload, FileText, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AuthorityUploadReport = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || files.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and upload at least one file.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Uploaded",
      description: "Your report has been submitted successfully.",
    });

    // Reset form
    setTitle("");
    setNotes("");
    setFiles([]);
  };

  return (
    <DashboardLayout role="authority">
      <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Upload Report</h1>
            <p className="text-muted-foreground mt-1">
              Submit action reports, proof documents, and field photos
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Report Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Road Repair Progress - Ward 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Description / Notes</Label>
            <Textarea
              id="notes"
              placeholder="Provide additional details about this report..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Files *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-3 text-muted-foreground" size={40} />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload images, PDFs, or documents
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, PDF, DOC, DOCX
                </p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{files.length} file(s) selected</p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon size={20} className="text-primary" />
                      ) : (
                        <FileText size={20} className="text-primary" />
                      )}
                      <div className="text-left">
                        <p className="text-sm font-medium truncate max-w-[250px]">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Report
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AuthorityUploadReport;
