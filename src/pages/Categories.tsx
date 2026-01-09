import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Speaker, 
  Radio, 
  Car, 
  Zap, 
  Settings, 
  Flame,
  Wrench,
  Cable,
  ShoppingBag,
  Tv,
  Music,
  Volume2,
  Headphones,
  Mic,
  Box,
  Plug
} from "lucide-react";

const categories = [
  { 
    name: "Tower Speakers", 
    icon: Speaker, 
    slug: "tower-speakers",
    description: "LED Display, Remote Control, High Bass, Multiple Models",
    count: 13
  },
  { 
    name: "Home Theatre Systems", 
    icon: Volume2, 
    slug: "home-theatre-systems",
    description: "4.1 & 5.1 Systems, USB/FM, Wireless Connectivity",
    count: 14
  },
  { 
    name: "Audio Amplifiers", 
    icon: Music, 
    slug: "audio-amplifiers",
    description: "4440 DIC Series, Transistor Amps, Professional Grade",
    count: 12
  },
  { 
    name: "DTH Receivers", 
    icon: Radio, 
    slug: "dth-receivers",
    description: "Free-to-Air, Fiber Gold+, Premium Series",
    count: 10
  },
  { 
    name: "Car Stereo Systems", 
    icon: Car, 
    slug: "car-stereo-systems",
    description: "Class D Car Tape, IPL Series, USB Support",
    count: 6
  },
  { 
    name: "Transformers", 
    icon: Plug, 
    slug: "transformers",
    description: "12-0-12 Series, 1A/2A/3A Power Transformers",
    count: 3
  },
  { 
    name: "LED/DTH Stands", 
    icon: Tv, 
    slug: "led-dth-stands",
    description: "Metal Stands, Premium Build, Universal Mounting",
    count: 7
  },
  { 
    name: "Toshiba UOC Kits", 
    icon: Box, 
    slug: "toshiba-uoc-kits",
    description: "Complete Solutions, Professional Grade",
    count: 3
  },
  { 
    name: "Speakers", 
    icon: Headphones, 
    slug: "speakers",
    description: "Woofers, Tweeters, Car Speakers, Bass Tubes",
    count: 15
  },
  { 
    name: "Portable Speakers", 
    icon: Volume2, 
    slug: "portable-speakers",
    description: "Trolley Speakers, Sound Bars, Bluetooth",
    count: 3
  },
  { 
    name: "Satellite Speakers", 
    icon: Speaker, 
    slug: "satellite-speakers",
    description: "Home Theatre Components, Premium Quality",
    count: 4
  },
  { 
    name: "Audio Boards", 
    icon: Settings, 
    slug: "audio-boards",
    description: "IC 2030 Series, Professional Audio Boards",
    count: 3
  },
  { 
    name: "Soldering Iron", 
    icon: Wrench, 
    slug: "soldering-iron",
    description: "25W/15W Models, Professional Grade",
    count: 3
  },
  { 
    name: "Cords/Cable", 
    icon: Cable, 
    slug: "cords-cable",
    description: "Power Cables, Audio Cables, RCA, XLR, RG-6",
    count: 18
  },
  { 
    name: "Appliances", 
    icon: Plug, 
    slug: "appliances",
    description: "Induction, Horns, Fans, Multi-purpose",
    count: 3
  },
  { 
    name: "Power Strips", 
    icon: Zap, 
    slug: "power-strips",
    description: "Crown, Royal, USB Charging, Surge Protection",
    count: 6
  },
  { 
    name: "Hot Selling Products", 
    icon: Flame, 
    slug: "hot-selling-products",
    description: "SMPS, DTH Cards, Adapters, USB/SD Modules",
    count: 11
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Product Categories
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our complete range of UNITECH audio equipment, DTH receivers, and accessories. 
            All products available at competitive prices.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              key={category.slug}
              onClick={() => navigate(`/products/${category.slug}`)}
              className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-border hover:border-primary"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-bold text-foreground mb-2 text-left group-hover:text-primary transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 text-left line-clamp-2">
                  {category.description}
                </p>

                {/* Product Count */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {category.count} {category.count === 1 ? 'Product' : 'Products'}
                  </span>
                  <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Browse →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">134</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">17</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality Assured</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help Choosing Products?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact our expert team for product recommendations and pricing information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:unitechindia@gmail.com"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <button
              onClick={() => navigate("/products")}
              className="bg-card border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
