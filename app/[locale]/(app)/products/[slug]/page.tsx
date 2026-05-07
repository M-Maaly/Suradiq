import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
} from "@/sanity/queries/products";
import { ProductGallery } from "@/components/app/ProductGallery";
import { ProductInfo } from "@/components/app/ProductInfo";
import { RecentlyViewedTracker } from "@/components/app/RecentlyViewedTracker";
import { ProductCardStandard } from "@/components/landing/ProductCardStandard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Metadata, ResolvingMetadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  const response = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });
  const product = response.data;

  if (!product) return {};

  return {
    title: product.name,
    description: product.description || `Experience the luxury of ${product.name} from Suradiq's premium furniture collection.`,
    openGraph: {
      images: product.images?.[0]?.asset?.url ? [product.images[0].asset.url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product: any = null;
  let relatedProducts: any[] = [];
  let recommendedProducts: any[] = [];

  try {
    // 1. Fetch current product first to get ID/Category for related
    const response = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    product = response.data;

    if (product) {
      // 2. Fetch related and recommended in parallel
      const [relatedRes, recommendedRes] = await Promise.all([
        sanityFetch({
          query: RELATED_PRODUCTS_QUERY,
          params: { 
            categorySlug: product.category?.slug ?? "",
            productId: product._id
          },
        }),
        sanityFetch({
          query: RECOMMENDED_PRODUCTS_QUERY,
          params: { 
            categorySlug: product.category?.slug ?? "",
            productId: product._id
          },
        }),
      ]);

      relatedProducts = relatedRes.data || [];
      recommendedProducts = recommendedRes.data || [];
    }
  } catch (error) {
    console.error("Sanity Fetch Error [Slug]:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <RecentlyViewedTracker productId={product._id} />
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-8">
          <Link href="/" className="hover:text-zinc-900 transition-colors dark:hover:text-zinc-200">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#collection" className="hover:text-zinc-900 transition-colors dark:hover:text-zinc-200">
            Collection
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/?category=${product.category.slug}`}
                className="hover:text-zinc-900 transition-colors dark:hover:text-zinc-200"
              >
                {product.category.title}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 pb-24">
          {/* Image Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-zinc-200 pt-16 dark:border-zinc-800">
            <Carousel opts={{ align: "start", loop: false }} className="group/carousel w-full">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-3">Complete the look</p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">Related Collections</h2>
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 border-zinc-200 dark:border-zinc-800" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 border-zinc-200 dark:border-zinc-800" />
                </div>
              </div>
              
              <CarouselContent className="-ml-4">
                {relatedProducts.map((p) => (
                  <CarouselItem key={p._id} className="pl-4 basis-[80%] sm:basis-[45%] lg:basis-[20%]">
                    <ProductCardStandard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
        )}

        {/* Recommended Products Section */}
        {recommendedProducts.length > 0 && (
          <section className="mt-24">
            <Carousel opts={{ align: "start", loop: false }} className="group/carousel w-full">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 mb-3">Curated for you</p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">Recommended for you</h2>
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 border-zinc-200 dark:border-zinc-800" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 border-zinc-200 dark:border-zinc-800" />
                </div>
              </div>
              
              <CarouselContent className="-ml-4">
                {recommendedProducts.map((p) => (
                  <CarouselItem key={p._id} className="pl-4 basis-[80%] sm:basis-[45%] lg:basis-[20%]">
                    <ProductCardStandard product={p} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
        )}
      </div>
    </div>
  );
}
