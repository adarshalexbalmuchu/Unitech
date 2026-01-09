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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <section className="bg-background py-8 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/50 backdrop-blur-sm hover:bg-card border border-border/50 p-2 rounded-md text-foreground/70 hover:text-foreground transition-all hidden sm:block"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 sm:gap-10 overflow-x-auto scrollbar-hide px-2 sm:px-10"
          >
            {categories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => navigate(`/products/${category.slug}`)}
                className="flex flex-col items-center gap-2 min-w-[70px] hover:opacity-70 transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium text-center whitespace-nowrap transition-colors">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/50 backdrop-blur-sm hover:bg-card border border-border/50 p-2 rounded-md text-foreground/70 hover:text-foreground transition-all hidden sm:block"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
