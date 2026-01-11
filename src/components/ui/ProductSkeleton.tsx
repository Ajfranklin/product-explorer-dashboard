"use client";

export function ProductSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-pulse">      
      <div className="aspect-square bg-zinc-200 dark:bg-zinc-800" />      
      <div className="p-5 space-y-3">        
        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />        
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>        
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl"
        />
      ))}
    </div>
  );
}

