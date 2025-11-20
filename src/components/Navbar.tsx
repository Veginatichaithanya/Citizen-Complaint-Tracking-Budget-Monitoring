import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "w-[95%] md:w-[90%]" : "w-[95%] md:w-[85%]"
      }`}
    >
      <div
        className={`bg-card/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg transition-all duration-300 ${
          isScrolled ? "shadow-xl" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-primary">CCTBM</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("roles")}
              className="text-foreground hover:text-primary transition-colors"
            >
              User Roles
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User size={16} />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" onClick={() => window.location.href = '/auth'}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("roles")}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              User Roles
            </button>
            <button
              onClick={() => scrollToSection("workflow")}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors text-left"
            >
              Features
            </button>
            {user ? (
              <>
                <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = '/dashboard'}>
                  <User size={16} className="mr-2" />
                  Dashboard
                </Button>
                <Button variant="destructive" size="sm" className="w-full" onClick={signOut}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" className="w-full" onClick={() => window.location.href = '/auth'}>
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
