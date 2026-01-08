import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-primary py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground text-base sm:text-lg">
                Subscribe for New Offers
              </h3>
              <p className="text-primary-foreground/70 text-xs sm:text-sm">
                We'll never share your email with any third party
              </p>
            </div>
          </div>

          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 md:w-72 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full py-2.5 sm:py-3 px-4 sm:px-5 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
