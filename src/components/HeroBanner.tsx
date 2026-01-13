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
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-background">
      <div className="relative h-[420px] sm:h-[520px] lg:h-[620px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
              index === currentSlide 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            }`}
          >
            {/* Background Image with overlay */}
            <div className="absolute inset-0">
              <img 
                src={banner.image} 
                alt="UNITECH Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Modern style */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 p-3 rounded-xl text-white transition-all hover:scale-110 shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/20 p-3 rounded-xl text-white transition-all hover:scale-110 shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Dots Indicator - Improved */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-500 shadow-lg ${
              index === currentSlide 
                ? "bg-gradient-to-r from-primary to-primary/80 w-12 shadow-primary/50" 
                : "bg-white/40 hover:bg-white/60 w-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
