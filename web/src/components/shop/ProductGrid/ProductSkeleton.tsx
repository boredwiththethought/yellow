import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="group">
      <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
      </div>
    </div>
  );
};
