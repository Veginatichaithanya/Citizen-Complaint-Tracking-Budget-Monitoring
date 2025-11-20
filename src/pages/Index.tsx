import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import UserRolesSection from "@/components/UserRolesSection";
import WorkflowSection from "@/components/WorkflowSection";
import ParallaxBanner from "@/components/ParallaxBanner";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <UserRolesSection />
      <WorkflowSection />
      <ParallaxBanner />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
