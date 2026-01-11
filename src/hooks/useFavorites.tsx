"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";

const FAVORITES_KEY = "product-explorer-favorites";

interface FavoritesContextValue {
  favorites: Set<number>;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  isLoaded: boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as number[];
        setFavorites(new Set(parsed));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.has(productId),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  const value: FavoritesContextValue = {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
    favoritesCount: favorites.size,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  
  return context;
}


