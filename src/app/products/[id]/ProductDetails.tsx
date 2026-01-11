"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Star, Heart, ArrowLeft } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const categoryColors: Record<string, string> = {
    electronics: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    jewelery: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "men's clothing": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "women's clothing": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const isFav = isLoaded && isFavorite(product.id);

  return (
    <article className="animate-fade-in" aria-label={`Product details for ${product.title}`}>      
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              Shop All
            </Link>
          </li>
          <li className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">/</li>
          <li className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">        
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-square bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden p-8">              
              <div className="absolute top-4 right-4 z-10">
                {isLoaded && (
                  <FavoriteButton
                    isFavorite={isFavorite(product.id)}
                    onToggle={() => toggleFavorite(product.id)}
                    size="lg"
                    productTitle={product.title}
                  />
                )}
              </div>

              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4"
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">          
          <span
            className={`inline-block px-3 py-1.5 text-sm font-medium rounded-full ${
              categoryColors[product.category] || "bg-zinc-100 text-zinc-700"
            }`}
          >
            {product.category}
          </span>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-3" role="img" aria-label={`Rating: ${product.rating.rate} out of 5 stars, based on ${product.rating.count} reviews`}>
            <div className="flex items-center gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating.rate)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Free shipping
              </span>
            </div>
          </div>
          
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              Description
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => isLoaded && toggleFavorite(product.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  isLoaded && toggleFavorite(product.id);
                }
              }}
              className={`
                inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl border-2 transition-all
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
                ${
                  isFav
                    ? "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400"
                    : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-rose-300 hover:text-rose-600 dark:hover:border-rose-700 dark:hover:text-rose-400"
                }
              `}
              aria-pressed={isFav}
              aria-label={isFav ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
            >
              <Heart
                className={`w-5 h-5 ${isFav ? "fill-current" : ""}`}
                strokeWidth={2}
                aria-hidden="true"
              />
              {isFav ? "Favorited" : "Add to Favorites"}
            </button>
          </div>
          
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              Back to all products
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
