import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  FileText, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Shield,
  BarChart3,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  role?: "citizen" | "admin" | "authority" | "ngo";
}

const Sidebar = ({ role = "citizen" }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();

  const navigation = {
    citizen: [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Budgets", href: "/budgets", icon: FileText },
      { name: "Submit Complaint", href: "/complaint/new", icon: MessageSquare },
      { name: "Complaint Status", href: "/complaint/status", icon: BarChart3 },
    ],
    admin: [
      { name: "Dashboard", href: "/admin/dashboard", icon: Home },
      { name: "Post Budget", href: "/admin/post-budget", icon: FileText },
      { name: "Create Authority", href: "/admin/create-authority", icon: Shield },
      { name: "Create NGO", href: "/admin/create-ngo", icon: Users },
      { name: "View Citizens", href: "/admin/citizens", icon: Users },
      { name: "View Authorities", href: "/admin/authorities", icon: Shield },
      { name: "View Complaints", href: "/admin/complaints", icon: MessageSquare },
    ],
    authority: [
      { name: "Dashboard", href: "/authority/dashboard", icon: Home },
      { name: "Assigned Complaints", href: "/authority/complaints", icon: MessageSquare },
      { name: "Completed", href: "/authority/completed", icon: BarChart3 },
      { name: "Upload Reports", href: "/authority/upload-report", icon: FileText },
      { name: "Communication", href: "/authority/communication", icon: MessageSquare },
    ],
    ngo: [
      { name: "Dashboard", href: "/ngo/dashboard", icon: Home },
      { name: "Reports", href: "/ngo/reports", icon: FileText },
      { name: "Verification", href: "/ngo/verification", icon: Shield },
    ],
  };

  const links = navigation[role] || navigation.citizen;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!collapsed && (
              <h2 className="text-lg font-serif font-bold text-primary">CCTBM</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-muted hover:scale-105",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary"
                  )
                }
              >
                <link.icon size={20} />
                {!collapsed && <span className="font-medium">{link.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <NavLink
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-muted hover:scale-105",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:text-primary"
                )
              }
            >
              <Settings size={20} />
              {!collapsed && <span className="font-medium">Settings</span>}
            </NavLink>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                collapsed && "justify-center px-0"
              )}
              onClick={signOut}
            >
              <LogOut size={20} />
              {!collapsed && <span className="font-medium">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
