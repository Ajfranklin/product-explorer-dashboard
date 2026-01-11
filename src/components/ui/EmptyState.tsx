"use client";

import { Search, Heart, Package } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: "search" | "heart" | "package";
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  message,
  icon = "package",
  action,
}: EmptyStateProps) {
  const icons = {
    search: <Search className="w-12 h-12" strokeWidth={1.5} />,
    heart: <Heart className="w-12 h-12" strokeWidth={1.5} />,
    package: <Package className="w-12 h-12" strokeWidth={1.5} />,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
        {icons[icon]}
      </div>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>

      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-xl transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
