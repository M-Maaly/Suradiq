
import Link from "next/link";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export default function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  return (
    <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
        <Link
          href="/"
          className={`inline-flex shrink-0 items-center rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
            !activeCategory
              ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
              : "border border-zinc-200 bg-white/80 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
          }`}
        >
          All Products
        </Link>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              className={`inline-flex shrink-0 items-center rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
                  : "border border-zinc-200 bg-white/80 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
              }`}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
