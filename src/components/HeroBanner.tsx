import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import bd1 from "/bd1.png";
import bd2 from "/bd2.png";
import bd3 from "/bd3.png";

const banners = [
  {
    id: 1,
    image: bd1,
    title: "Premium Audio Equipment",
    subtitle: "Tower Speakers & Home Theatre Systems",
    cta: "Browse Audio",
    link: "/products/tower-speakers"
  },
  {
    id: 2,
    image: bd2,
    title: "Free-to-Air DTH Receivers",
    subtitle: "Reliable entertainment solutions for your home",
    cta: "View DTH Products",
    link: "/products/dth-receivers"
  },
  {
    id: 3,
    image: bd3,
    title: "Professional Audio Solutions",
    subtitle: "Amplifiers, Car Audio & More",
    cta: "Explore All",
    link: "/products"
  }
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
    <section className="relative overflow-hidden bg-background">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[500px]">
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
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
              <div className="max-w-2xl space-y-5 animate-fade-in">
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                    {banner.title}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-normal max-w-xl">
                    {banner.subtitle}
                  </p>
                </div>

                <div className="flex gap-4 items-center pt-2">
                  <Link 
                    to={banner.link} 
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    {banner.cta}
                  </Link>
                  <Link 
                    to="/categories" 
                    className="inline-flex items-center px-6 py-3 border-2 border-border text-foreground font-medium rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
                  >
                    View Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm hover:bg-card border border-border/50 p-2 rounded-md text-foreground/70 hover:text-foreground transition-all"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm hover:bg-card border border-border/50 p-2 rounded-md text-foreground/70 hover:text-foreground transition-all"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary w-8" 
                : "bg-muted-foreground/50 hover:bg-muted-foreground w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
