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
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Top Brands
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href="#"
              className="bg-white rounded-xl p-4 sm:p-6 flex items-center justify-center h-20 sm:h-24 hover:shadow-lg transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-8 sm:max-h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
              />
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-muted hover:bg-muted/80 text-foreground font-medium px-6 py-2.5 rounded-full transition-colors inline-flex items-center gap-2">
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
