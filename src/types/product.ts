export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export type SortOption = "default" | "price-asc" | "price-desc";

export interface ProductFilters {
  search: string;
  category: ProductCategory | "all";
  showFavorites: boolean;
  sort: SortOption;
}


