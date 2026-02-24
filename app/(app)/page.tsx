import CategoryTiles from "@/components/landing/CategoryTiles";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/landing/FeaturedCarouselSkeleton";
import { ProductSection } from "@/components/landing/ProductSection";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/sanity/queries/products";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color: string;
    material?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  }>;
}
/**
 * Why is the folder called (app) and why are page and layout placed there,
 * instead of at the top level of the app folder?
 *
 * In Next.js 13 and newer with the App Router, folders with parentheses (e.g., (app)) are "optional groups."
 * These folders are used to logically group routes, layouts, or UI patterns without affecting the URL structure.
 * 
 * By convention:
 *   - Files like `page.tsx` and `layout.tsx` define route boundaries and shared layouts.
 *   - Placing them inside an optional group (like (app)) lets you define "app-wide" layout and routing logic
 *     while keeping the route `/` at the site root and keeping project structure organized.
 *   - This avoids polluting the base `app/` directory with many related files and folders required for different UI groupings,
 *     experiments, or features.
 *
 * In summary:
 *   - (app) is just a folder for logical organization. It does not affect the generated route path.
 *   - Keeping `page.tsx`, `layout.tsx`, etc. in groups like (app) allows for cleaner structure,
 *     modularity, and scaling as the app grows.
 */
export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const sort = params.sort ?? "name";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const inStock = params.inStock ? true : false;

  // select query based on sort parameter
  const getQuery = () => {
    // if searching and sort is relevance, use relevance query
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  // Fetch product with filter (server-side)
  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  });

  // Fetch all categories for filter sidebar
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Fetch featured products for carousel
  const { data: feateredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });
  console.log(categories);
  console.log(feateredProducts);
  return (
    <div className="">
      {/* Featured Product carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel products={feateredProducts} />
      </Suspense>

      {/* Page paner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 ">
            Shop {categorySlug ? categorySlug : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium furniture for your home
          </p>
        </div>
      </div>

      {/* categories Titles */}
      <div className="mt-6">
        <CategoryTiles
          categories={categories}
          activeCategory={categorySlug || undefined}
        />
      </div>

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>
      {/* Footer */}
    </div>
  );
}
