import empowermentBg from "@/assets/empowerment-bg.jpg";

const ParallaxBanner = () => {
  return (
    <section
      className="relative h-[400px] flex items-center justify-center parallax-bg"
      style={{ backgroundImage: `url(${empowermentBg})` }}
    >
      <div className="absolute inset-0 bg-primary/60" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Empowering Citizens Through Transparency
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands working towards accountable governance
        </p>
      </div>
    </section>
  );
};

export default ParallaxBanner;
