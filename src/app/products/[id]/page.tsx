import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { Header } from "@/components/Header";
import { ProductDetails } from "./ProductDetails";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return {
      title: "Product Not Found | Product Explorer",
    };
  }

  try {
    const product = await fetchProductById(productId);
    return {
      title: `${product.title} | Product Explorer`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return {
      title: "Product Not Found | Product Explorer",
    };
  }
}


export default async function ProductPage({ params }: ProductPageProps) {
  try {    
    const { id } = await params;
    const productId = parseInt(id, 10);
    const product = await fetchProductById(productId);  
  
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<ProductDetailsSkeleton />}>
              <ProductDetails product={product} />
            </Suspense>
          </div>
        </main>
      </>
    );
  } catch (err) {
    console.log(err)
    notFound()
  }
}
