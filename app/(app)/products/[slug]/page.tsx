import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/products";
import { ProductGallery } from "@/components/app/ProductGallery";
import { ProductInfo } from "@/components/app/ProductInfo";
import { RecentlyViewedTracker } from "@/components/app/RecentlyViewedTracker";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
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

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
