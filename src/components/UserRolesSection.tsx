import { Card } from "@/components/ui/card";
import { Users, Building2, Heart, UserCog } from "lucide-react";

const UserRolesSection = () => {
  const roles = [
    {
      icon: Users,
      title: "Citizen",
      description:
        "Access budget information, submit complaints, and track municipal spending transparency.",
    },
    {
      icon: Building2,
      title: "Municipal Authority",
      description:
        "Post budgets, respond to complaints, and maintain transparent financial records.",
    },
    {
      icon: Heart,
      title: "NGO",
      description:
        "Monitor activities, generate reports, and advocate for accountability and reform.",
    },
    {
      icon: UserCog,
      title: "Administrator",
      description:
        "Manage platform operations, verify users, and ensure system integrity.",
    },
  ];

  return (
    <section id="roles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            User Roles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Different stakeholders working together for transparent governance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  {role.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
