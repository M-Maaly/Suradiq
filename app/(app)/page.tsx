import CategoryTiles from "@/components/landing/CategoryTiles";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/landing/FeaturedCarouselSkeleton";
import { PersonalizedHome } from "@/components/landing/PersonalizedHome";
import { MarqueeBanner } from "@/components/landing/MarqueeBanner";
import { SeasonalSale } from "@/components/landing/SeasonalSale";
import { BestSellers } from "@/components/landing/BestSellers";
import { TrustedPartners } from "@/components/landing/TrustedPartners";
import { Testimonials } from "@/components/landing/Testimonials";
import { Craftsmanship } from "@/components/landing/Craftsmanship";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
} from "@/sanity/queries/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {

  let products: any[] = [];
  let categories: any[] = [];
  let featuredProducts: any[] = [];

  try {
    // Parallel fetch all data
    const [productsRes, categoriesRes, featuredRes] = await Promise.all([
      sanityFetch({
        query: FILTER_PRODUCTS_BY_NAME_QUERY,
        params: {
          searchQuery: "",
          categorySlug: "",
          color: "",
          material: "",
          minPrice: 0,
          maxPrice: 0,
          inStock: false,
        },
      }),
      sanityFetch({
        query: ALL_CATEGORIES_QUERY,
      }),
      sanityFetch({
        query: FEATURED_PRODUCTS_QUERY,
      }),
    ]);

    products = productsRes.data || [];
    categories = categoriesRes.data || [];
    featuredProducts = featuredRes.data || [];
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
  }

  const featuredSaleProduct = products.find((p: any) => p.name?.toLowerCase().includes("executive ergonomic office chair")) || products[0];

  return (
    <div className="pb-0">
      {/* 1. Featured Top Carousel */}
      <FeaturedCarousel products={featuredProducts} />

      {/* 2. Marquee Promotion */}
      <MarqueeBanner />
      
      <div id="collection" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <h2 className="text-4xl font-black tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-100 uppercase">
          Shop by Category
        </h2>
      </div>

      {/* 3. Category Grids */}
      <div className="mt-8">
        <CategoryTiles
          categories={categories}
        />
      </div>

      {/* 4. Seasonal Flash Sale / Discount Wrapper */}
      <SeasonalSale product={featuredSaleProduct as any} />

      {/* 5. Best Sellers Grid */}
      <BestSellers products={products} />

      {/* 6. Trusted Partners & Collaborations */}
      <TrustedPartners />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. Our Craftsmanship */}
      <Craftsmanship />

      {/* 9. Personalized/Recent Suggestions */}
      <div className="mx-auto mt-8 mb-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <PersonalizedHome products={products} />
      </div>

      {/* CTA to view full shop */}
      <div className="flex justify-center mb-24">
        <Link 
          href="/shop"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          View Full Collection
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}
