import {FeaturedCarousel} from "@/components/features/FeaturedCarousel";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import { FEATURED_PRODUCTS_QUERY, FILTER_PRODUCTS_BY_NAME_QUERY, FILTER_PRODUCTS_BY_PRICE_ASC_QUERY, FILTER_PRODUCTS_BY_PRICE_DESC_QUERY, FILTER_PRODUCTS_BY_RELEVANCE_QUERY } from "@/sanity/queries/products";
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
    if(searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY
      case "relevance" : 
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY
    }
  }

// Fetch product with filter (server-side)
const {data: products} = await sanityFetch({
  query: getQuery(),
  params: {
    searchQuery,
    categorySlug,
    color,
    material,
    minPrice,
    maxPrice,
    inStock,
  }
})

  // Fetch all categories for filter sidebar
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Fetch featured products for carousel
  const {data: feateredProducts} = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY
  })
  console.log(categories);
  console.log(feateredProducts);
  return (
    <div className="">
      {/* Featured Product carousel */}
    <Suspense fallback={<div>Loading...</div>}>
      <FeaturedCarousel products={feateredProducts} />
    </Suspense>
      {/* Page paner */}

      {/* categories Titles */}

      {/* Products Section */}

      {/* Footer */}
    </div>
  );
}
