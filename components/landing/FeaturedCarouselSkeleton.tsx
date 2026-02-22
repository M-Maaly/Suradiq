import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarouselSkeleton() {
  return (
    <div className="relative w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Prev/Next arrow placeholders - match CarouselPrevious/CarouselNext position */}
      <Skeleton
        className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-800/80 sm:left-8"
        aria-hidden
      />
      <Skeleton
        className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-800/80 sm:right-8"
        aria-hidden
      />

      {/* Single slide skeleton - same structure as FeaturedSlide */}
      <div className="flex min-h-[400px] flex-col md:min-h-[450px] md:flex-row lg:min-h-[500px]">
        {/* Image Section - Left (60% on desktop), same as FeaturedCarousel */}
        <div className="relative h-64 w-full md:h-auto md:w-3/5">
          <Skeleton className="h-full w-full rounded-none bg-zinc-800" />
        </div>

        {/* Content Section - Right (40% on desktop) */}
        <div className="flex w-full flex-col justify-center px-6 py-8 md:w-2/5 md:px-10 lg:px-16">
          {/* Category badge */}
          <Skeleton className="mb-4 h-6 w-24 rounded-md bg-zinc-700" />

          {/* Title - text-2xl to lg:text-4xl equivalent height */}
          <Skeleton className="h-8 w-3/4 rounded-md bg-zinc-700 sm:h-9 lg:h-10" />

          {/* Description - line-clamp-3 ≈ 3 lines */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded-md bg-zinc-700" />
            <Skeleton className="h-4 w-[95%] rounded-md bg-zinc-700" />
            <Skeleton className="h-4 w-4/6 rounded-md bg-zinc-700" />
          </div>

          {/* Price */}
          <Skeleton className="mt-6 h-9 w-32 rounded-md bg-zinc-700 lg:h-10" />

          {/* Button - Shop Now with icon */}
          <Skeleton className="mt-8 h-12 w-36 rounded-md bg-zinc-700 sm:h-11" />
        </div>
      </div>

      {/* Dot indicators - match position from FeaturedCarousel */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
        <Skeleton className="h-2 w-6 rounded-full bg-zinc-700" />
        <Skeleton className="h-2 w-2 rounded-full bg-zinc-700" />
        <Skeleton className="h-2 w-2 rounded-full bg-zinc-700" />
      </div>
    </div>
  );
}
