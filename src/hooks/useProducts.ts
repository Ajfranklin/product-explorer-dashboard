"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, ProductFilters, ProductCategory, SortOption } from "@/types/product";
import { fetchProducts, APIError } from "@/lib/api";

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  categories: ProductCategory[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  setSearch: (search: string) => void;
  setCategory: (category: ProductCategory | "all") => void;
  setSort: (sort: SortOption) => void;
}

interface UseProductsOptions {
  favoriteIds?: Set<number>;
  initialSearch?: string;
}

export function useProducts(
  options: UseProductsOptions = {}
): UseProductsReturn {
  const { favoriteIds = new Set(), initialSearch = "" } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    search: initialSearch,
    category: "all",
    showFavorites: false,
    sort: "default",
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: initialSearch }));
  }, [initialSearch]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        if (err instanceof APIError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories as ProductCategory[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      if (filters.showFavorites && !favoriteIds.has(product.id)) {
        return false;
      }

      return true;
    });

    if (filters.sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters, favoriteIds]);

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const setCategory = (category: ProductCategory | "all") => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setSort = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  return {
    products,
    filteredProducts,
    categories,
    isLoading,
    error,
    filters,
    setSearch,
    setCategory,
    setSort,
  };
}


