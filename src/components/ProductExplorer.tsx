"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useFavorites } from "@/hooks/useFavorites";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Header } from "./Header";
import { CategoryFilter } from "./CategoryFilter";
import { SortDropdown } from "./SortDropdown";
import { ProductGrid } from "./ProductGrid";
import { ProductSkeletonGrid, CategoryFilterSkeleton } from "./ui/ProductSkeleton";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";

export function ProductExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  
  const { favorites, toggleFavorite, isLoaded } = useFavorites();
  const {
    filteredProducts,
    categories,
    isLoading,
    error,
    filters,
    setCategory,
    setSort,
  } = useProducts({ favoriteIds: favorites, initialSearch: searchQuery });
  
  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll({
    items: filteredProducts,
    pageSize: 8,
  });
  
  const handleRetry = () => {
    window.location.reload();
  };
  
  const clearFilters = () => {
    setCategory("all");
    setSort("default");    
    router.push("/");
  };

  return (
    <>      
      <Header initialSearch={searchQuery} />

      <main className="flex-1" role="main" aria-label="Product catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">          
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Amazing
              </span>{" "}
              Products
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Explore our curated collection of quality products. Search, filter, and
              save your favorites for later.
            </p>
          </div>

          <div className="space-y-8">            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {isLoading ? (
                  <CategoryFilterSkeleton />
                ) : (
                  <CategoryFilter
                    categories={categories}
                    selected={filters.category}
                    onChange={setCategory}
                  />
                )}
                <SortDropdown value={filters.sort} onChange={setSort} />
              </div>
            </div>
            
            {!isLoading && !error && (
              <div className="flex items-center justify-between" aria-live="polite">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Showing {visibleItems.length} of {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  {filters.category !== "all" && ` in ${filters.category}`}
                  {filters.search && ` matching "${filters.search}"`}
                </p>
              </div>
            )}
            
            {(isLoading || !isLoaded) && <ProductSkeletonGrid count={8} />}
            
            {error && !isLoading && (
              <ErrorState message={error} onRetry={handleRetry} />
            )}
            
            {!isLoading && !error && filteredProducts.length === 0 && (
              <EmptyState
                title="No products found"
                message="Try adjusting your search or filter to find what you're looking for."
                icon="search"
                action={{
                  label: "Clear Filters",
                  onClick: clearFilters,
                }}
              />
            )}
            
            {!isLoading && !error && filteredProducts.length > 0 && isLoaded && (
              <>
                <ProductGrid
                  products={visibleItems}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
                
                {hasMore && (
                  <div
                    ref={loaderRef}
                    className="flex items-center justify-center py-8"
                    aria-label="Loading more products"
                  >
                    <Loader2 
                      className="w-8 h-8 text-amber-500 animate-spin" 
                      aria-hidden="true"
                    />
                    <span className="sr-only">Loading more products...</span>
                  </div>
                )}
                
                {!hasMore && filteredProducts.length > 8 && (
                  <div className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                    You&apos;ve reached the end of the list
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
