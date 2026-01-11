"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { FavoriteButton } from "./ui/FavoriteButton";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index?: number;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    electronics: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    jewelery: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "men's clothing": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "women's clothing": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <article className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
      <Link
        href={`/products/${product.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset rounded-2xl"
        aria-label={`${product.title}, ${product.category}, $${product.price.toFixed(2)}, rated ${product.rating.rate} out of 5`}
      >        
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
            size="sm"
            productTitle={product.title}
          />
        </div>
        
        {isFavorite && (
          <div className="absolute top-3 right-3 z-10 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none" aria-hidden="true">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" strokeWidth={2} />
            </div>
          </div>
        )}
        
        <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-800/50 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-5">          
          <span
            className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
              categoryColors[product.category] || "bg-zinc-100 text-zinc-700"
            }`}
          >
            {product.category}
          </span>
          
          <h3 className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 min-h-11 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.title}
          </h3>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              ${product.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400" aria-label={`Rating: ${product.rating.rate} out of 5, ${product.rating.count} reviews`}>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>{product.rating.rate}</span>
              <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">
                ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
