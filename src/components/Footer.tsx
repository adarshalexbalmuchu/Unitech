import { Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {/* Logo & Contact */}
          <div className="col-span-2">
            <div className="mb-4">
              <img src="/unitech-india-logo.png" alt="Unitech" className="h-10 sm:h-12 w-auto mb-4" />
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-foreground">
              <Phone className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Got questions? Call us!</p>
                <p className="font-semibold text-sm">022 6163 6464</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Find it Fast */}
          <div>
            <h3 className="font-semibold text-secondary mb-3 text-sm sm:text-base">Find it Fast</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Air Conditioner</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Laptops & Printer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home Appliances</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home Entertainment</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary mb-4">&nbsp;</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Smart Phone</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Microwaves</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Air Coolers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Televisions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Washing Machines</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">My Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">My Account</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Wish List</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Compare Products</a></li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h3 className="font-semibold text-secondary mb-4">About</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blogs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Our Promise</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2024 Unitech Electronics Pvt. Ltd. - All rights Reserved
          </p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain opacity-70" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/100px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-6 object-contain opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
