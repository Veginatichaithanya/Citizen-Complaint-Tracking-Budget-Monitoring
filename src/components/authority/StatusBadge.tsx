import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/[_\s]/g, "-");
    
    switch (normalizedStatus) {
      case "pending":
        return "bg-[hsl(var(--status-pending))]/10 text-[hsl(var(--status-pending))] border-[hsl(var(--status-pending))]/20";
      case "under-investigation":
      case "investigating":
        return "bg-[hsl(var(--status-investigating))]/10 text-[hsl(var(--status-investigating))] border-[hsl(var(--status-investigating))]/20";
      case "in-progress":
      case "work-started":
        return "bg-[hsl(var(--status-progress))]/10 text-[hsl(var(--status-progress))] border-[hsl(var(--status-progress))]/20";
      case "completed":
      case "resolved":
        return "bg-[hsl(var(--status-completed))]/10 text-[hsl(var(--status-completed))] border-[hsl(var(--status-completed))]/20";
      case "rejected":
        return "bg-[hsl(var(--status-rejected))]/10 text-[hsl(var(--status-rejected))] border-[hsl(var(--status-rejected))]/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/[_-]/g, " ").toUpperCase();
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium transition-colors",
        getStatusStyles(status),
        className
      )}
    >
      {formatStatus(status)}
    </Badge>
  );
};

export default StatusBadge;
