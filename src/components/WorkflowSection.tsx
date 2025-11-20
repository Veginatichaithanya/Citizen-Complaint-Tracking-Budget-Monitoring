import { Card } from "@/components/ui/card";
import {
  UserPlus,
  FileText,
  AlertCircle,
  CheckCircle,
  MessageCircle,
  BarChart,
  ArrowRight,
} from "lucide-react";

const WorkflowSection = () => {
  const steps = [
    { icon: UserPlus, title: "Registration", description: "Users register on the platform" },
    { icon: FileText, title: "Budget Posting", description: "Authorities post budgets" },
    { icon: AlertCircle, title: "Complaint Submission", description: "Citizens report issues" },
    { icon: CheckCircle, title: "Authority Action", description: "Officials respond and act" },
    { icon: MessageCircle, title: "Feedback", description: "Continuous communication" },
    { icon: BarChart, title: "NGO Reports", description: "Independent monitoring" },
  ];

  return (
    <section id="workflow" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent workflow from registration to resolution
          </p>
        </div>

        <div className="relative">
          {/* Desktop Horizontal Flow */}
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center">
                  <Card className="p-6 w-48 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card group cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </Card>
                  {index < steps.length - 1 && (
                    <ArrowRight className="mx-4 text-primary flex-shrink-0" size={32} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet Vertical Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-card">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 flex-shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-card-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="text-primary rotate-90" size={28} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
