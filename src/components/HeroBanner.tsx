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
    }, 8000); // Slower auto-rotation: 8 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image - Zoomed 16:9 */}
            <div className="absolute inset-0">
              <img 
                src={banner.image} 
                alt="UNITECH Banner"
                className="w-full h-full object-cover"
              />
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
