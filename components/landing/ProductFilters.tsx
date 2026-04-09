"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { COLORS, MATERIALS, SORT_OPTIONS } from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentMaterial = searchParams.get("material") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";
  const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
  const urlMaxPrice = Number(searchParams.get("maxPrice")) || 5000;
  const currentInStock = searchParams.get("inStock") === "true";

  const [priceRange, setPriceRange] = useState<[number, number]>([
    urlMinPrice,
    urlMaxPrice,
  ]);

  useEffect(() => {
    setPriceRange([urlMinPrice, urlMaxPrice]);
  }, [urlMinPrice, urlMaxPrice]);

  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isColorActive = !!currentColor;
  const isMaterialActive = !!currentMaterial;
  const isPriceActive = urlMinPrice > 0 || urlMaxPrice < 5000;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    isColorActive ||
    isMaterialActive ||
    isPriceActive ||
    isInStockActive;

  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isColorActive,
    isMaterialActive,
    isPriceActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      updateParams({ minPrice: null, maxPrice: null });
    } else {
      updateParams({ [key]: null });
    }
  };

  return (
    <div className="space-y-7 rounded-2xl border border-zinc-200/80 bg-[#FAF9F7] p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      {/* Filter header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900 dark:text-zinc-100">
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
              {activeFilterCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Search
        </label>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={currentSearch}
            className="flex-1 rounded-xl border-zinc-200 bg-white text-sm focus:border-zinc-400 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800"
          />
          <Button type="submit" size="sm" className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
            Go
          </Button>
        </form>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Category
          </label>
          {isCategoryActive && (
            <button type="button" onClick={() => clearSingleFilter("category")} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParams({ category: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Color
          </label>
          {isColorActive && (
            <button type="button" onClick={() => clearSingleFilter("color")} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <Select
          value={currentColor || "all"}
          onValueChange={(value) =>
            updateParams({ color: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <SelectValue placeholder="All Colors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Colors</SelectItem>
            {COLORS.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                {color.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Material */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Material
          </label>
          {isMaterialActive && (
            <button type="button" onClick={() => clearSingleFilter("material")} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <Select
          value={currentMaterial || "all"}
          onValueChange={(value) =>
            updateParams({ material: value === "all" ? null : value })
          }
        >
          <SelectTrigger className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <SelectValue placeholder="All Materials" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Materials</SelectItem>
            {MATERIALS.map((material) => (
              <SelectItem key={material.value} value={material.value}>
                {material.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Price Range
          </label>
          {isPriceActive && (
            <button type="button" onClick={() => clearSingleFilter("price")} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <span>£{priceRange[0]}</span>
          <span>£{priceRange[1]}</span>
        </div>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={([min, max]) =>
            updateParams({
              minPrice: min > 0 ? min : null,
              maxPrice: max < 5000 ? max : null,
            })
          }
        />
      </div>

      {/* In Stock Only */}
      <label className="flex cursor-pointer items-center gap-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="peer sr-only"
          />
          <div className="h-5 w-9 rounded-full bg-zinc-200 transition-colors peer-checked:bg-zinc-900 dark:bg-zinc-700 dark:peer-checked:bg-zinc-100" />
          <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          In Stock Only
        </span>
      </label>

      {/* Sort */}
      <div className="space-y-2">
        <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Sort By
        </label>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger className="rounded-xl border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
