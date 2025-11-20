import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActionUpdateFormProps {
  complaintId: string;
  onSubmit?: (data: ActionFormData) => void;
}

export interface ActionFormData {
  status: string;
  notes: string;
  files: File[];
}

const ActionUpdateForm = ({ complaintId, onSubmit }: ActionUpdateFormProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState("");
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
    
    if (!status) {
      toast({
        title: "Status Required",
        description: "Please select a status before submitting.",
        variant: "destructive",
      });
      return;
    }

    const formData: ActionFormData = {
      status,
      notes,
      files,
    };

    if (onSubmit) {
      onSubmit(formData);
    }

    toast({
      title: "Update Submitted",
      description: "Your action update has been recorded successfully.",
    });

    // Reset form
    setStatus("");
    setNotes("");
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-serif font-bold mb-4">Take Action</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Update Status *</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="work_started">Work Started</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Action Notes</Label>
        <Textarea
          id="notes"
          placeholder="Describe the action taken, findings, or next steps..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Proof / Documents</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
            <p className="text-sm text-muted-foreground">
              Click to upload images, PDFs, or documents
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon size={18} className="text-primary" />
                  ) : (
                    <FileText size={18} className="text-primary" />
                  )}
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
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

      <Button type="submit" className="w-full">
        Submit Update
      </Button>
    </form>
  );
};

export default ActionUpdateForm;
