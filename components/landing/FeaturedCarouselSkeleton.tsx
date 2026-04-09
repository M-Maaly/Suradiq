import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarouselSkeleton() {
  return (
    <div className="relative mx-auto mt-4 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[70vh] w-full flex-col overflow-hidden rounded-[2.5rem] bg-[#EDEAE4] dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
        {/* Background text placeholder */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-0">
          <Skeleton className="h-24 w-[60vw] rounded-xl bg-zinc-300/30 dark:bg-zinc-700/30" />
        </div>

        <div className="relative z-10 flex h-full flex-col lg:flex-row flex-1 items-center justify-between px-8 py-12 lg:px-16 lg:py-20">
          {/* Left content */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 justify-end mt-40 lg:mt-0 h-full">
            <Skeleton className="h-4 w-full max-w-xs rounded-md bg-zinc-300/50 dark:bg-zinc-700/50" />
            <Skeleton className="h-4 w-[80%] max-w-xs rounded-md bg-zinc-300/50 dark:bg-zinc-700/50" />
            <Skeleton className="h-12 w-36 rounded-full bg-zinc-300/50 dark:bg-zinc-700/50 mt-4" />
          </div>

          {/* Center image placeholder */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
            <Skeleton className="h-[400px] w-[400px] lg:h-[600px] lg:w-[600px] rounded-full bg-zinc-300/30 dark:bg-zinc-700/30" />
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/3 flex flex-col items-end gap-4 justify-end h-full">
            <div className="flex gap-2">
              <Skeleton className="h-16 w-16 rounded-xl bg-zinc-300/50 dark:bg-zinc-700/50" />
              <Skeleton className="h-16 w-16 rounded-xl bg-zinc-300/50 dark:bg-zinc-700/50" />
              <Skeleton className="h-16 w-16 rounded-xl bg-zinc-300/50 dark:bg-zinc-700/50" />
            </div>
            <Skeleton className="h-8 w-32 rounded-md bg-zinc-300/50 dark:bg-zinc-700/50" />
            <Skeleton className="h-4 w-40 rounded-md bg-zinc-300/50 dark:bg-zinc-700/50" />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          <Skeleton className="h-2 w-8 rounded-full bg-zinc-300/50 dark:bg-zinc-700/50" />
          <Skeleton className="h-2 w-2 rounded-full bg-zinc-300/50 dark:bg-zinc-700/50" />
          <Skeleton className="h-2 w-2 rounded-full bg-zinc-300/50 dark:bg-zinc-700/50" />
        </div>
      </div>
    </div>
  );
}
