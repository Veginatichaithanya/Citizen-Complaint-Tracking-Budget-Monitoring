import { Button } from "@/components/ui/button";
import { ArrowRight, FileSearch } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center parallax-bg"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
          Corruption Control Through
          <br />
          <span className="text-primary">Budget Maintenance</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A Transparent Platform for Public Budget Monitoring
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group" onClick={() => window.location.href = '/dashboard'}>
            Login / Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="group" onClick={() => window.location.href = '/complaint/new'}>
            <FileSearch className="mr-2 h-5 w-5" />
            Report an Issue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
