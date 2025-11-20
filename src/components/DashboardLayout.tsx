import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: "citizen" | "admin" | "authority" | "ngo";
  className?: string;
}

const DashboardLayout = ({ children, role, className }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <main className={cn("md:ml-64 transition-all duration-300", className)}>
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
