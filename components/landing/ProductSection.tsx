"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import type {
  ALL_CATEGORIES_QUERYResult,
  FILTER_PRODUCTS_BY_NAME_QUERYResult,
} from "@/sanity.types";

interface ProductSectionProps {
  categories: ALL_CATEGORIES_QUERYResult;
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
  searchQuery: string;
}

export function ProductSection({
  categories,
  products,
  searchQuery,
}: ProductSectionProps) {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{products.length}</span>{" "}
          {products.length === 1 ? "product" : "products"} found
          {searchQuery && (
            <span>
              {" "}for &quot;<span className="font-semibold text-zinc-900 dark:text-zinc-100">{searchQuery}</span>&quot;
            </span>
          )}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 rounded-full border-zinc-200 bg-white px-5 py-2 text-sm font-semibold shadow-none transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label={filtersOpen ? "Hide filters" : "Show filters"}
        >
          {filtersOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Hide Filters</span>
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-4 w-4" />
              <span>Show Filters</span>
            </>
          )}
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.aside
              key="filters"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full overflow-hidden lg:w-72 xl:w-80 shrink-0"
            >
              <ProductFilters categories={categories} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
