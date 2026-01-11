import { Suspense } from "react";
import { ProductExplorer } from "@/components/ProductExplorer";
import { ProductSkeletonGrid } from "@/components/ui/ProductSkeleton";
import { Header } from "@/components/Header";

function LoadingFallback() {
  return (
    <>
      <Header />
      <main className="flex-1" role="main">
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
              Explore our curated collection of quality products.
            </p>
          </div>
          <ProductSkeletonGrid count={8} />
        </div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductExplorer />
    </Suspense>
  );
}
