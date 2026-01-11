import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/useTheme";
import { FavoritesProvider } from "@/hooks/useFavorites";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Explorer | Discover Amazing Products",
  description:
    "Browse and explore a curated collection of products. Search, filter by category, and save your favorites.",
  keywords: ["products", "shopping", "e-commerce", "catalog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme-preference');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (theme !== 'light' && systemDark);
                if (isDark) document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FavoritesProvider>            
            <a
              href="#main-content"
              className="skip-to-content focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Skip to main content
            </a>
            <div className="min-h-screen flex flex-col bg-grid-pattern" id="main-content">
              {children}
              <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800" role="contentinfo">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  <p>
                    Built with Next.js, TypeScript & Tailwind CSS
                  </p>
                </div>
              </footer>
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
