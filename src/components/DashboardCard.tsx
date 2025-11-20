import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  value?: string | number;
  children?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    label: string;
  };
  actionLabel?: string;
  actionLink?: string;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  value,
  children,
  className,
  trend,
  actionLabel,
  actionLink,
}: DashboardCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in cursor-pointer group",
        className
      )}
      onClick={() => actionLink && navigate(actionLink)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
              <Icon className="text-primary" size={24} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {value !== undefined && (
          <div className="text-3xl font-bold text-foreground">{value}</div>
        )}
        {trend && (
          <p className="text-sm text-muted-foreground mt-1">
            <span
              className={cn(
                "font-medium",
                trend.value > 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>{" "}
            {trend.label}
          </p>
        )}
        {children}
        {actionLabel && actionLink && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 group-hover:bg-primary/10 gap-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(actionLink);
            }}
          >
            {actionLabel}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
