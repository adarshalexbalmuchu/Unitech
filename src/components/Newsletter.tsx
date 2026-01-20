import { Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === "23505") { // Unique constraint violation
          toast.error("This email is already subscribed!");
        } else {
          toast.error("Failed to subscribe. Please try again.");
        }
      } else {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-primary/5 border-y border-gray-200 py-10 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                Subscribe for Updates
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Product launches and industry news
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              aria-label="Email address"
              className="flex-1 md:w-80 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base disabled:opacity-50 min-h-[48px]"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Subscribe to newsletter"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all whitespace-nowrap text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md min-h-[48px]"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
