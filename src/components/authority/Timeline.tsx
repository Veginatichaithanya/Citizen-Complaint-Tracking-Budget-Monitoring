import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  author: string;
  type: "authority" | "admin" | "citizen";
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "authority":
        return "bg-primary";
      case "admin":
        return "bg-accent";
      case "citizen":
        return "bg-secondary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex flex-col items-center">
            <div className={cn("w-3 h-3 rounded-full", getTypeColor(item.type))} />
            {index < items.length - 1 && (
              <div className="w-0.5 flex-1 bg-border mt-2" />
            )}
          </div>
          
          <div className="flex-1 pb-8">
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.author}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
              </div>
              <p className="text-sm text-foreground/80 mb-2">{item.description}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
