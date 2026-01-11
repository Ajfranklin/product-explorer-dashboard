import Link from "next/link";
import { Header } from "@/components/Header";
import { Frown, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">            
            <div className="relative mb-8">
              <div className="text-[150px] sm:text-[200px] font-bold text-zinc-100 dark:text-zinc-900 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30">
                  <Frown className="w-12 h-12 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Page Not Found
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
