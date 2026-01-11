"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, Heart, Search, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  initialSearch?: string;
}

/**
 * Application header with logo, search, navigation, and theme toggle
 */
export function Header({ initialSearch = "" }: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(initialSearch);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const { favoritesCount, isLoaded } = useFavorites();
  const { resolvedTheme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isFavouritesPage = pathname === "/favourites";
  
  useEffect(() => {
    setLocalSearch(initialSearch);
  }, [initialSearch]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    if (isSearchDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSearchDropdownOpen]);
  
  const handleSearch = useCallback(() => {
    const trimmedSearch = localSearch.trim();
    if (trimmedSearch) {
      router.push(`/?search=${encodeURIComponent(trimmedSearch)}`);
    } else {
      router.push("/");
    }
    setIsSearchDropdownOpen(false);
  }, [localSearch, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    router.push("/");
    setIsSearchDropdownOpen(false);
  };

  const toggleSearchDropdown = () => {
    setIsSearchDropdownOpen(!isSearchDropdownOpen);
  };

  return (
    <header 
      className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">          
          <Link 
            href="/" 
            className="flex items-center gap-3 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-xl"
            aria-label="Product Explorer - Go to home page"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <Package className="w-6 h-6 text-white" strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Product Explorer
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-0.5">
                Discover amazing products
              </p>
            </div>
          </Link>
          
          <div className="hidden sm:block relative flex-1 max-w-md" role="search">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" strokeWidth={2} aria-hidden="true" />
            </div>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              aria-label="Search products"
              className={`
                w-full pl-10 py-2
                ${localSearch ? "pr-20" : "pr-4"}
                bg-zinc-100 dark:bg-zinc-900
                border border-transparent
                rounded-xl
                text-sm text-zinc-900 dark:text-zinc-100
                placeholder-zinc-400 dark:placeholder-zinc-500
                focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-800
                transition-all duration-200
              `}
            />
            {localSearch && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  onClick={handleSearch}
                  className="p-1 text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          
          <nav className="flex items-center gap-2" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                pathname === "/"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Shop All
            </Link>
            
            <button
              onClick={toggleSearchDropdown}
              className={`sm:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isSearchDropdownOpen
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
              aria-label="Open search"
              aria-expanded={isSearchDropdownOpen}
            >
              <Search className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
            </button>
            
            <button
              onClick={toggleTheme}
              className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
            
            <Link
              href="/favourites"
              className={`
                relative flex items-center justify-center w-10 h-10 rounded-xl
                transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                ${
                  isFavouritesPage
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:text-rose-500"
                }
              `}
              aria-label={`Favourites${isLoaded && favoritesCount > 0 ? ` (${favoritesCount} items)` : ""}`}
              title="View Favourites"
              aria-current={isFavouritesPage ? "page" : undefined}
            >
              <Heart
                className={`w-5 h-5 transition-all ${isFavouritesPage ? "fill-white" : ""}`}
                strokeWidth={2}
                aria-hidden="true"
              />
              {isLoaded && favoritesCount > 0 && (
                <span
                  className={`
                    absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1
                    flex items-center justify-center
                    text-xs font-bold rounded-full
                    ${
                      isFavouritesPage
                        ? "bg-white text-rose-500"
                        : "bg-rose-500 text-white"
                    }
                  `}
                  aria-hidden="true"
                >
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
      
      {isSearchDropdownOpen && (
        <div
          ref={searchDropdownRef}
          className="sm:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-lg z-40"
        >
          <div className="px-4 py-3">
            <div className="relative" role="search">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-400" strokeWidth={2} aria-hidden="true" />
              </div>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                aria-label="Search products"
                autoFocus
                className={`
                  w-full pl-10 py-2
                  ${localSearch ? "pr-20" : "pr-4"}
                  bg-zinc-100 dark:bg-zinc-900
                  border border-transparent
                  rounded-xl
                  text-sm text-zinc-900 dark:text-zinc-100
                  placeholder-zinc-400 dark:placeholder-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-800
                  transition-all duration-200
                `}
              />
              {localSearch && (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleSearch}
                    className="p-1 text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                    aria-label="Submit search"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
