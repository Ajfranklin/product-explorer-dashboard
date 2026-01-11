"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById, APIError } from "@/lib/api";
import { Header } from "@/components/Header";
import { ProductDetails } from "./ProductDetails";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Product } from "@/types/product";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const productId = parseInt(id, 10);
      if (isNaN(productId)) {
        setError("Invalid product ID");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProductById(productId);        
        setProduct(data);
      } catch (err) {        
        if (err instanceof APIError) {          
            setError("Product not found");          
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleRetry = async () => {
    setError(null);
    setIsLoading(true);
    const productId = parseInt(id, 10);
    if (!isNaN(productId)) {
      try {
        let product = await fetchProductById(productId)
        setProduct(product)
        setError(null);        
      } catch (err) {        
        if (err instanceof APIError) {          
            setError("Product not found");          
        } else {
          setError("An unexpected error occurred");
        }        
      } finally {
        setIsLoading(false);
      }        
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <ProductDetailsSkeleton />
          ) : error ? (            
            <ErrorState
              title={error === "Product not found" ? "Product Not Found" : ""}
              message={error === "Product not found" ? "The product you're looking for doesn't exist." : error}
              onRetry={handleRetry}
            />
          ) : product ? (
            <ProductDetails product={product} />
          ) : null}
        </div>
      </main>
    </>
  );
}
