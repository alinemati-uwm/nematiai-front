import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function ExploreArticleLoading() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full h-[150px]" />
      <div className="flex flex-row gap-3">
        <div className="w-4/5 flex flex-col gap-y-4">
          <Skeleton className="w-[200px] h-[20px]" />
          <div className="flex flex-row justify-between">
            <Skeleton className="w-[100px] h-[10px]" />
            <Skeleton className="w-[100px] h-[10px]" />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-y-3">
          <Skeleton className="w-full h-[16px]" />
          <Skeleton className="w-full h-[16px]" />
          <Skeleton className="w-full h-[16px]" />
          <Skeleton className="w-full h-[16px]" />
        </div>
      </div>
    </div>
  );
}

export default ExploreArticleLoading;
