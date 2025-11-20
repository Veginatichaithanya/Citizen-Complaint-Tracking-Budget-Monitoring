import { Card } from "@/components/ui/card";
import {
  Database,
  Lock,
  Bell,
  FileBarChart,
  Search,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Database,
      title: "Centralized Database",
      description: "All budget data in one secure, accessible location",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Role-based access control for all user types",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Stay updated on budget changes and responses",
    },
    {
      icon: FileBarChart,
      title: "Comprehensive Reports",
      description: "Detailed analytics and audit trails",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Quick access to specific budget information",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Access from any device, anywhere",
    },
  ];

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Platform Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools for transparency and accountability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`transition-all duration-700 ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card group cursor-pointer h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
