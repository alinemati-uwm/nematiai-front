import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function ExploreSearchLoading() {
  return (
    <>
      <div className="w-full lg:w-2/3 flex flex-col gap-y-2">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
      <div className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:w-1/3 lg:flex lg:flex-col gap-4">
        <Skeleton className="h-[150px]" />
        <Skeleton className="h-[150px]" />
      </div>
    </>
  );
}

export default ExploreSearchLoading;
