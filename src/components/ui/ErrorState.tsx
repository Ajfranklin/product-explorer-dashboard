"use client";

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">      
      <div className="w-20 h-20 mb-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>

      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium rounded-xl transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
