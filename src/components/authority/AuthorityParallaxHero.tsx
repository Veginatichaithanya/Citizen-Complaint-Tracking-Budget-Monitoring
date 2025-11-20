import { useEffect, useState } from "react";

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const AuthorityParallaxHero = ({ title, subtitle, imageUrl }: ParallaxHeroProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-primary/70" />
      
      <div 
        className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default AuthorityParallaxHero;
