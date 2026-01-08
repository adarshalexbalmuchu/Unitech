const PromoBanner = () => {
  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="gradient-gold rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-foreground mb-2">
                New Arrivals: Cutting-Edge Electronics
              </h2>
              <p className="text-secondary-foreground/80 text-sm sm:text-base lg:text-lg">
                Discover the latest gadgets and smart devices
              </p>
            </div>
            <button className="bg-secondary-foreground text-secondary font-semibold px-6 sm:px-8 py-3 rounded-full hover:bg-secondary-foreground/90 transition-all duration-300 whitespace-nowrap">
              Check Out the Latest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
