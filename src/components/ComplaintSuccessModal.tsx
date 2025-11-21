import { useEffect, useState } from "react";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ComplaintSuccessModalProps {
  isOpen: boolean;
  complaintId?: string;
}

const ComplaintSuccessModal = ({ isOpen, complaintId }: ComplaintSuccessModalProps) => {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content card with parallax */}
      <div
        className={`relative bg-background rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 transform transition-all duration-700 ${
          showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) scale(${showContent ? 1 : 0.95})`,
        }}
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />

        {/* Sparkle effect */}
        <div className="absolute -top-4 -right-4 text-primary animate-pulse">
          <Sparkles size={32} />
        </div>
        <div className="absolute -bottom-4 -left-4 text-accent animate-pulse delay-100">
          <Sparkles size={24} />
        </div>

        <div className="relative space-y-6">
          {/* Animated checkmark circle */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer ring animation */}
              <div className="absolute inset-0 animate-ping opacity-75">
                <div className="w-24 h-24 rounded-full bg-primary/20" />
              </div>
              
              {/* Main circle with checkmark */}
              <div
                className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg transform transition-all duration-1000 ${
                  showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"
                }`}
              >
                <CheckCircle
                  size={48}
                  className={`text-primary-foreground transform transition-all duration-700 delay-300 ${
                    showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Success message */}
          <div
            className={`text-center space-y-3 transform transition-all duration-700 delay-200 ${
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Complaint Submitted Successfully!
            </h2>
            <p className="text-muted-foreground text-lg">
              Thank you for reporting this issue. Your complaint has been received and will be reviewed by our team.
            </p>
          </div>

          {/* Complaint ID */}
          {complaintId && (
            <div
              className={`bg-muted/50 rounded-lg p-4 border border-border/50 transform transition-all duration-700 delay-400 ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-muted-foreground text-center">
                Your Complaint ID
              </p>
              <p className="text-center font-mono text-lg font-semibold text-foreground mt-1">
                {complaintId}
              </p>
            </div>
          )}

          {/* Information cards */}
          <div
            className={`grid grid-cols-2 gap-3 transform transition-all duration-700 delay-500 ${
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
              <p className="text-xs text-muted-foreground">Expected Response</p>
              <p className="text-sm font-semibold text-foreground mt-1">24-48 hours</p>
            </div>
            <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold text-foreground mt-1">Under Review</p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className={`flex gap-3 transform transition-all duration-700 delay-600 ${
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              onClick={() => navigate("/dashboard/complaint-status")}
              className="flex-1 group relative overflow-hidden"
              size="lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Track Status
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="lg"
              className="flex-1 hover:bg-accent/10"
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Additional info */}
          <p
            className={`text-center text-xs text-muted-foreground transform transition-all duration-700 delay-700 ${
              showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            You will receive email notifications about your complaint status updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSuccessModal;
