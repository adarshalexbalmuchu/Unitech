import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    original_price: number;
    image_url: string;
    discount_percent: number;
    rating: number;
    reviews_count: number;
  };
}

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        product_id,
        product:products (
          id,
          name,
          price,
          original_price,
          image_url,
          discount_percent,
          rating,
          reviews_count
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching wishlist:", error);
    } else {
      setWishlistItems((data as unknown as WishlistItem[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast.error("Please sign in to add items to wishlist");
      return false;
    }

    const existingItem = wishlistItems.find((item) => item.product_id === productId);

    if (existingItem) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", existingItem.id);

      if (error) {
        toast.error("Failed to remove from wishlist");
        return false;
      }
      toast.success("Removed from wishlist");
    } else {
      const { error } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId });

      if (error) {
        toast.error("Failed to add to wishlist");
        return false;
      }
      toast.success("Added to wishlist!");
    }

    await fetchWishlist();
    return true;
  };

  return {
    wishlistItems,
    loading,
    isInWishlist,
    toggleWishlist,
    wishlistCount: wishlistItems.length,
    refetch: fetchWishlist,
  };
};
