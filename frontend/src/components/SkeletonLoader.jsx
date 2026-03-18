import React from 'react';

const SkeletonCard = ({ variant = 'full', isTall = false }) => {
  const isCompact = variant === 'compact';

  return (
    <div className={`flex flex-col h-full overflow-hidden relative border border-white/5 bg-white/5 ${isCompact ? 'rounded-sm' : 'rounded-sm'}`}>
      {/* Image skeleton */}
      <div className={`relative overflow-hidden bg-white/5 ${isCompact ? 'aspect-square md:aspect-[1.5/1]' : isTall ? 'aspect-[1/1] md:aspect-[4/3]' : 'aspect-square md:aspect-[2/1]'} flex-shrink-0`}>
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* Content skeleton */}
      <div className={`${isCompact ? 'p-4' : isTall ? 'p-8' : 'p-8'} flex flex-col flex-grow border-t border-white/5`}>
        {/* Date skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-16 bg-white/10 rounded-full" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-white/10 rounded-sm" />
          <div className="h-4 w-3/4 bg-white/10 rounded-sm" />
        </div>

        {/* Summary skeleton */}
        <div className={`space-y-2 mb-8 ${isCompact ? 'hidden md:block' : ''}`}>
          <div className="h-2 w-full bg-white/5 rounded-full" />
          <div className="h-2 w-5/6 bg-white/5 rounded-full" />
        </div>

        {/* Footer skeleton */}
        <div className={`mt-auto flex pt-6 items-center justify-between border-t border-white/5`}>
          <div className="h-2 w-24 bg-white/5 rounded-full" />
          <div className="w-8 h-8 bg-white/5 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

const SkeletonHero = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-sm overflow-hidden mb-12 bg-white/5 border border-white/10">
      <div className="absolute inset-0 skeleton-shimmer opacity-20" />

      {/* Content skeleton */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-24 bg-white/20 rounded-sm" />
          <div className="h-3 w-20 bg-white/10 rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="h-12 md:h-16 w-full max-w-3xl bg-white/10 rounded-sm" />
          <div className="h-12 md:h-16 w-2/3 max-w-2xl bg-white/10 rounded-sm" />
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-3 w-full max-w-2xl bg-white/5 rounded-full" />
          <div className="h-3 w-3/4 max-w-xl bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export { SkeletonCard, SkeletonHero };
