import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  brand: string;
  price: number;
  original_price: number;
  discount_percent: number;
  rating: number;
  reviews_count: number;
  stock: number;
  is_featured: boolean;
  is_trending: boolean;
}

interface UseProductsOptions {
  category?: string;
  brand?: string;
  search?: string;
  featured?: boolean;
  trending?: boolean;
  limit?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    let query = supabase.from("products").select("*");

    if (options.category) {
      query = query.eq("category", options.category);
    }

    if (options.brand) {
      query = query.eq("brand", options.brand);
    }

    if (options.search) {
      query = query.or(`name.ilike.%${options.search}%,brand.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options.featured) {
      query = query.eq("is_featured", true);
    }

    if (options.trending) {
      query = query.eq("is_trending", true);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: fetchError } = await query.order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      console.error("Error fetching products:", fetchError);
    } else {
      setProducts(data as Product[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [options.category, options.brand, options.search, options.featured, options.trending, options.limit]);

  return { products, loading, error, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setProduct(data as Product);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
