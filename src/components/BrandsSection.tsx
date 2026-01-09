const brands = [
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/200px-LG_symbol.svg.png" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/200px-Sony_logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/100px-Apple_logo_black.svg.png" },
  { name: "Bosch", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/200px-Bosch-logo.svg.png" },
  { name: "Whirlpool", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Whirlpool_Logo_2017.svg/200px-Whirlpool_Logo_2017.svg.png" },
  { name: "OnePlus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/OnePlus_logo_2022.svg/200px-OnePlus_logo_2022.svg.png" },
  { name: "Philips", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Philips_logo_new.svg/200px-Philips_logo_new.svg.png" },
];

const BrandsSection = () => {
  return (
    <section className="py-10 sm:py-12 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Trusted Brands
          </h2>
          <p className="text-xs text-muted-foreground">Partner brands we work with</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href="#"
              className="bg-card/30 border border-border/30 rounded-lg p-5 flex items-center justify-center h-20 hover:border-border transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-8 w-auto object-contain opacity-40 grayscale"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
