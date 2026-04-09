import CategoryTiles from "@/components/landing/CategoryTiles";
import { ProductSection } from "@/components/landing/ProductSection";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/sanity/queries/products";

interface ShopPageProps {
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

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const sort = params.sort ?? "name";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const inStock = params.inStock ? true : false;

  const getQuery = () => {
    if (searchQuery && sort === "relevance") return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    switch (sort) {
      case "price_asc": return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc": return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance": return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default: return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: { searchQuery, categorySlug, color, material, minPrice, maxPrice, inStock },
  });

  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  return (
    <div className="pb-24 pt-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
              All Products
            </h1>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Browse our complete collection of bespoke, meticulously crafted furniture. Apply filters to find exactly what you need.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CategoryTiles
          categories={categories}
          activeCategory={categorySlug || undefined}
        />
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
