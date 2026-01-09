import { 
  Award,
  Shield, 
  Truck, 
  Headphones, 
  Building, 
  Wrench 
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Trusted Since 1999",
  },
  {
    icon: Shield,
    title: "Quality Controlled",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
  },
  {
    icon: Building,
    title: "R&D Capability",
  },
  {
    icon: Headphones,
    title: "Expert Support",
  },
  {
    icon: Wrench,
    title: "Manufacturing Excellence",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-background border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Why Choose Unitech
          </h2>
          <p className="text-sm text-muted-foreground">
            Quality audio solutions since 1999
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-2 hover:opacity-70 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground text-center whitespace-nowrap">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="mailto:unitechindia@gmail.com"
            className="inline-flex items-center gap-2 border-2 border-border text-foreground/70 hover:border-primary hover:text-primary font-medium px-5 py-2 rounded-lg transition-all text-sm"
          >
            <Headphones className="w-4 h-4" strokeWidth={1.5} />
            Connect to Expert
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
