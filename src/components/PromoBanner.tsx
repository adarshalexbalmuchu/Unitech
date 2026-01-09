const PromoBanner = () => {
  return (
    <section className="py-10 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card/50 border border-border/40 rounded-lg p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--primary)),transparent_70%)]" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                New Arrivals in Audio Equipment
              </h2>
              <p className="text-muted-foreground text-sm">
                Discover the latest additions to our catalogue
              </p>
            </div>
            <a 
              href="/products?sort=newest"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-6 py-2.5 rounded-lg transition-all whitespace-nowrap text-sm"
            >
              View New Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
