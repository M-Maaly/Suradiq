import CategoryTiles from "@/components/landing/CategoryTiles";
import { ProductSection } from "@/components/landing/ProductSection";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import { PRODUCTS_BY_CATEGORY_QUERY } from "@/sanity/queries/products";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });
  
  const currentCategory = categories.find(c => c.slug === slug);
  const title = currentCategory?.title || slug;

  return {
    title: `${title} Collection`,
    description: `Explore our curated selection of ${title.toLowerCase()}. Premium, handcrafted minimalist furniture for your home.`,
  };
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const categorySlug = resolvedParams.slug;
  const searchQuery = resolvedSearchParams.q ?? "";

  // Fetch products inside this category
  const { data: products } = await sanityFetch({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: { categorySlug },
  });

  // Fetch categories for the category tiles component
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Try to find the title of the current category from the loaded categories
  const currentCategoryObj = categories.find(c => c.slug === categorySlug);
  const categoryTitle = currentCategoryObj?.title || categorySlug;

  return (
    <div className="pb-24 pt-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl dark:text-zinc-100">
              {categoryTitle}
            </h1>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Our bespoke collection of {categoryTitle.toLowerCase()}.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CategoryTiles
          categories={categories}
          activeCategory={categorySlug}
        />
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products as any} // we cast this because PRODUCTS_BY_CATEGORY_QUERY returns slightly differently than the general filter
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
