"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions<T> {
  items: T[];
  pageSize?: number;
}

interface UseInfiniteScrollReturn<T> {
  visibleItems: T[];
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  loaderRef: (node: HTMLDivElement | null) => void;
}

export function useInfiniteScroll<T>({
  items,
  pageSize = 8,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [displayCount, setDisplayCount] = useState(pageSize);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDisplayCount(pageSize);
  }, [items, pageSize]);

  const visibleItems = items.slice(0, displayCount);
  const hasMore = displayCount < items.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + pageSize, items.length));
    }
  }, [hasMore, pageSize, items.length]);

  const reset = useCallback(() => {
    setDisplayCount(pageSize);
  }, [pageSize]);
  
  const loaderRef = useCallback(
    (node: HTMLDivElement | null) => {
      loaderNodeRef.current = node;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node || !hasMore) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0.1,
        }
      );

      observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );
  
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    visibleItems,
    hasMore,
    loadMore,
    reset,
    loaderRef,
  };
}

