"use client";

import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  productTitle?: string;
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = "md",
  className = "",
  productTitle,
}: FavoriteButtonProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const label = productTitle
    ? isFavorite
      ? `Remove ${productTitle} from favorites`
      : `Add ${productTitle} to favorites`
    : isFavorite
    ? "Remove from favorites"
    : "Add to favorites";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }
      }}
      className={`
        ${sizes[size]}
        flex items-center justify-center rounded-full
        bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm
        border border-zinc-200 dark:border-zinc-700
        hover:scale-110 active:scale-95
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
        ${className}
      `}
      aria-label={label}
      aria-pressed={isFavorite}
      type="button"
    >
      <Heart
        className={`
          ${iconSizes[size]}
          transition-all duration-200
          ${
            isFavorite
              ? "fill-rose-500 text-rose-500 scale-110"
              : "fill-transparent text-zinc-400 hover:text-rose-400"
          }
        `}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
