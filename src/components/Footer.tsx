import { Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/30">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-10">
          {/* Logo & Contact */}
          <div className="col-span-2">
            <div className="mb-5">
              <img src={`${import.meta.env.BASE_URL}new-logo.png`} alt="Unitech" className="h-10 w-auto mb-4 opacity-90" />
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-foreground">
              <Phone className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <p className="text-xs text-muted-foreground">Got questions?</p>
                <p className="font-medium text-sm">unitechindia@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-border/50 rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Facebook className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-8 h-8 border border-border/50 rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-8 h-8 border border-border/50 rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-8 h-8 border border-border/50 rounded-md flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Youtube className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Find it Fast */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Find it Fast</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tower Speakers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home Theatre</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">DTH Receivers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Car Stereo</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Power Strips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm opacity-0">&nbsp;</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Hot Selling</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Amplifiers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Speakers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Portable Audio</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Audio Parts</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Warranty Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About UNITECH</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Become a Dealer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2024 Unitech Electronics Pvt. Ltd. - All rights Reserved
          </p>
          <div className="flex items-center gap-3 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/100px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
