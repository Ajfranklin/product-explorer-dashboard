"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  favorites: Set<number>;
  onToggleFavorite: (productId: number) => void;
}

export function ProductGrid({
  products,
  favorites,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      aria-label="Product list"
    >
      {products.map((product, index) => (
        <div key={product.id} role="listitem">
          <ProductCard
            product={product}
            isFavorite={favorites.has(product.id)}
            onToggleFavorite={() => onToggleFavorite(product.id)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}


