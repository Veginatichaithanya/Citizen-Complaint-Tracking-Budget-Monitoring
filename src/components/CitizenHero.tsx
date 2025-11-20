import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CitizenHero = () => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div
      ref={heroRef}
      className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-2xl mb-8"
      style={{
        backgroundImage: 'url(/src/assets/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: `center ${parallaxOffset}px`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Citizen Dashboard
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Your space to track budgets, file complaints, and take action for transparency
        </p>
        {user && (
          <p className="mt-4 text-white/80">
            Welcome back, Citizen!
          </p>
        )}
      </div>
    </div>
  );
};

export default CitizenHero;
