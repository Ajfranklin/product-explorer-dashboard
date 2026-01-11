import { Product, ProductCategory } from "@/types/product";

const API_BASE_URL = "https://fakestoreapi.com";

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new APIError(
        `Failed to fetch products: ${response.statusText}`,
        response.status
      );
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network error: Unable to fetch products");
  }
}

export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);   

    if (!response.ok) {
      if (response.status === 404) {
        throw new APIError("Product not found", 404);
      }
      throw new APIError(
        `Failed to fetch product: ${response.statusText}`,
        response.status
      );
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network error: Unable to fetch product");
  }
}

export async function fetchCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new APIError(
        `Failed to fetch categories: ${response.statusText}`,
        response.status
      );
    }

    const data: ProductCategory[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network error: Unable to fetch categories");
  }
}


