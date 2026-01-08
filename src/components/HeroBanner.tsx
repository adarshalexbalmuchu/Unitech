import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Super Big Sale",
    subtitle: "Year-End Electronics Festival",
    description: "Bring home the latest gadgets with exciting deals",
    discount: "Up to 50% OFF",
    cta: "Shop Now",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    id: 2,
    title: "Smart Home",
    subtitle: "Transform Your Living Space",
    description: "Discover intelligent appliances for modern homes",
    discount: "Starting ₹9,999",
    cta: "Explore",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: 3,
    title: "Gaming Zone",
    subtitle: "Level Up Your Experience",
    description: "Premium gaming gear for true enthusiasts",
    discount: "Extra 10% OFF",
    cta: "Game On",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[280px] sm:h-[350px] lg:h-[420px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-xl space-y-2 sm:space-y-3 lg:space-y-4 animate-slide-up">
                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {banner.discount}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                  {banner.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-secondary font-semibold">
                  {banner.subtitle}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  {banner.description}
                </p>
                <button className="gradient-gold text-secondary-foreground font-semibold px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-full hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                  {banner.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 sm:p-3 rounded-full text-foreground hover:bg-card hover:text-primary transition-all"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm p-2 sm:p-3 rounded-full text-foreground hover:bg-card hover:text-primary transition-all"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-secondary w-6 sm:w-8" 
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
