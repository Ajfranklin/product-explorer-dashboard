"use client";

export function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse">      
      <div className="mb-8 h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">        
        <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        
        <div className="space-y-6">          
          <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          
          <div className="space-y-2">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-zinc-200 dark:bg-zinc-800 rounded"
                />
              ))}
            </div>
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="h-12 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            <div className="h-14 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}


