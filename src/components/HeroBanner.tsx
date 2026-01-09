import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-card/30">
      <div className="relative h-[320px] sm:h-[400px] lg:h-[480px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08),transparent_50%)]" />
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl space-y-6">
            {/* Calm headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Free-to-Air DTH Receivers
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-normal max-w-xl">
                Reliable entertainment solutions for your home and business
              </p>
            </div>

            {/* Single CTA */}
            <div className="flex gap-4 items-center pt-2">
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Browse Products
              </Link>
              <Link 
                to="/categories" 
                className="inline-flex items-center px-6 py-3 border-2 border-border text-foreground font-medium rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
              >
                View Categories
              </Link>
            </div>

            {/* Trust signal - minimal */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Trusted Since 1999
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Pan-India Delivery
              </span>
              <span className="flex items-center gap-2 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Quality Assured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
