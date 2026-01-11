"use client";

import { ProductCategory } from "@/types/product";
import { LayoutGrid, Monitor, Gem, Mars, Venus } from "lucide-react";
import { JSX, useRef, useCallback } from "react";

interface CategoryFilterProps {
  categories: ProductCategory[];
  selected: ProductCategory | "all";
  onChange: (category: ProductCategory | "all") => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryLabels: Record<string, string> = {
    all: "All",
    electronics: "Electronics",
    jewelery: "Jewelry",
    "men's clothing": "Men's",
    "women's clothing": "Women's",
  };

  const categoryIcons: Record<string, JSX.Element> = {
    all: <LayoutGrid className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
    electronics: <Monitor className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
    jewelery: <Gem className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
    "men's clothing": <Mars className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
    "women's clothing": <Venus className="w-4 h-4" strokeWidth={2} aria-hidden="true" />,
  };

  const allCategories: (ProductCategory | "all")[] = ["all", ...categories];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      if (!buttons) return;

      let newIndex = currentIndex;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          newIndex = (currentIndex + 1) % allCategories.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          newIndex = (currentIndex - 1 + allCategories.length) % allCategories.length;
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = allCategories.length - 1;
          break;
        default:
          return;
      }

      buttons[newIndex]?.focus();
      onChange(allCategories[newIndex]);
    },
    [allCategories, onChange]
  );

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap gap-2" 
      role="radiogroup" 
      aria-label="Filter by category"
    >
      {allCategories.map((category, index) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          role="radio"
          aria-checked={selected === category}
          tabIndex={selected === category ? 0 : -1}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
            ${
              selected === category
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }
          `}
        >
          {categoryIcons[category]}
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}
