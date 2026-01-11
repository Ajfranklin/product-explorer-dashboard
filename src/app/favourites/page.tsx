"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { useFavorites } from "@/hooks/useFavorites";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Product, SortOption } from "@/types/product";
import { fetchProducts } from "@/lib/api";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { SortDropdown } from "@/components/SortDropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductSkeletonGrid } from "@/components/ui/ProductSkeleton";
import { Heart, Star, Trash2, Loader2 } from "lucide-react";

export default function FavouritesPage() {
  const { favorites, toggleFavorite, favoritesCount, isLoaded, clearFavorites } =
    useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  
  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);
  
  const favoriteProducts = useMemo(() => {
    let filtered = products.filter((product) => favorites.has(product.id));
    
    if (sortBy === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    
    return filtered;
  }, [products, favorites, sortBy]);
  
  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll({
    items: favoriteProducts,
    pageSize: 6,
  });

  const categoryColors: Record<string, string> = {
    electronics:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    jewelery:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "men's clothing":
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "women's clothing":
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <>
      <Header />
      <main className="flex-1" role="main" aria-label="Favourites page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30" aria-hidden="true">
                <Heart className="w-6 h-6 text-white fill-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  My Favourites
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
                  {favoritesCount} {favoritesCount === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">              
              {favoritesCount > 0 && (
                <SortDropdown value={sortBy} onChange={setSortBy} />
              )}
              
              {favoritesCount > 0 && (
                <button
                  onClick={clearFavorites}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Clear all favourites"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          {(isLoading || !isLoaded) && <ProductSkeletonGrid count={4} />}
          
          {!isLoading && isLoaded && favoriteProducts.length === 0 && (
            <EmptyState
              title="Your favourites are empty"
              message="Start exploring products and add your favorites here to keep track of items you love."
              icon="heart"
              action={{
                label: "Browse Products",
                onClick: () => (window.location.href = "/"),
              }}
            />
          )}
          
          {!isLoading && isLoaded && favoriteProducts.length > 0 && (
            <>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                role="list"
                aria-label="Favourite products"
              >
                {visibleItems.map((product) => (
                  <article
                    key={product.id}
                    role="listitem"
                    className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10"
                  >
                    <div className="flex flex-col sm:flex-row">                      
                      <Link
                        href={`/products/${product.id}`}
                        className="relative w-full sm:w-48 h-48 bg-zinc-50 dark:bg-zinc-800/50 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset"
                        aria-label={`View ${product.title}`}
                      >
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 192px"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      
                      <div className="flex-1 p-5 flex flex-col">                        
                        <span
                          className={`inline-block self-start px-2.5 py-1 text-xs font-medium rounded-full ${
                            categoryColors[product.category] ||
                            "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {product.category}
                        </span>
                        
                        <Link 
                          href={`/products/${product.id}`}
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                        >
                          <h3 className="mt-2 text-base font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        
                        <div 
                          className="flex items-center gap-1 mt-2 text-sm text-zinc-500 dark:text-zinc-400"
                          aria-label={`Rating: ${product.rating.rate} out of 5, ${product.rating.count} reviews`}
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                          <span>{product.rating.rate}</span>
                          <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">
                            ({product.rating.count} reviews)
                          </span>
                        </div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            ${product.price.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/products/${product.id}`}
                              className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            >
                              View Details
                            </Link>
                            <FavoriteButton
                              isFavorite={true}
                              onToggle={() => toggleFavorite(product.id)}
                              size="sm"
                              productTitle={product.title}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {hasMore && (
                <div
                  ref={loaderRef}
                  className="flex items-center justify-center py-8"
                  aria-label="Loading more favourites"
                >
                  <Loader2 
                    className="w-8 h-8 text-rose-500 animate-spin" 
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading more favourites...</span>
                </div>
              )}
            </>
          )}
          
          {!isLoading && isLoaded && (
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
              >
                ← Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

