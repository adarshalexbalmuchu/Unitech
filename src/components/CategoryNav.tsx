import { 
  Speaker, 
  Radio, 
  Car, 
  Zap, 
  Settings, 
  Flame,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef } from "react";

const categories = [
  { name: "Tower Speakers", icon: Speaker, slug: "tower-speakers" },
  { name: "Home Theatre", icon: Speaker, slug: "home-theatre-systems" },
  { name: "DTH Receivers", icon: Radio, slug: "dth-receivers" },
  { name: "Car Audio", icon: Car, slug: "car-stereo-systems" },
  { name: "Power Strips", icon: Zap, slug: "power-strips" },
  { name: "Audio Parts", icon: Settings, slug: "speakers" },
  { name: "Amplifiers", icon: Speaker, slug: "audio-amplifiers" },
  { name: "Hot Selling", icon: Flame, slug: "hot-selling-products" },
];

const CategoryNav = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-card py-6 sm:py-8 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-muted hover:bg-muted/80 p-2 rounded-full text-foreground shadow-lg transition-all hidden sm:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-2 sm:px-10"
          >
            {categories.map((category, index) => (
              <a
                key={category.name}
                href="#"
                className="flex flex-col items-center gap-2 sm:gap-3 min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-xl hover:bg-muted transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                  <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs sm:text-sm text-foreground font-medium text-center whitespace-nowrap">
                  {category.name}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-muted hover:bg-muted/80 p-2 rounded-full text-foreground shadow-lg transition-all hidden sm:block"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
