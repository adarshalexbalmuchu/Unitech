import { 
  BadgePercent, 
  CreditCard, 
  Truck, 
  RefreshCcw, 
  Headphones, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "Best Prices",
    description: "Guaranteed lowest prices on all electronics",
  },
  {
    icon: CreditCard,
    title: "Easy EMI",
    description: "No-cost EMI & flexible payment options",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free scheduled delivery & installation",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Hassle-free 15-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert assistance anytime you need",
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Additional protection plans available",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Why Choose Kohinoor
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Your trusted destination for consumer electronics since 1967
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-4 sm:p-6 rounded-xl hover:bg-muted transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <button className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-medium px-6 py-2.5 rounded-full transition-colors">
            <Headphones className="w-4 h-4" />
            Connect to Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
