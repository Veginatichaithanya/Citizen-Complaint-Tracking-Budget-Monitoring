import { Card } from "@/components/ui/card";
import { Eye, TrendingUp, MessageSquare, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Eye,
      title: "Transparency",
      description: "Full visibility into public budget allocation and spending",
    },
    {
      icon: TrendingUp,
      title: "Budget Tracking",
      description: "Real-time monitoring of municipal financial activities",
    },
    {
      icon: MessageSquare,
      title: "Citizen Feedback",
      description: "Direct channel for reporting concerns and irregularities",
    },
    {
      icon: Shield,
      title: "Authority Actions",
      description: "Swift response and accountability from governing bodies",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            About CCTBM
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            CCTBM is a revolutionary platform designed to combat corruption through
            transparent budget management. We empower citizens, authorities, and NGOs
            to work together for accountable governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
