import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function ExploreMainLoading() {
  return (
    <>
      <Skeleton className="w-[200px] h-7 m-auto" />
      <Skeleton className="w-[95%] max-w-[500px] h-3 m-auto" />
      <Skeleton className="w-[100%] max-w-[400px] h-14 m-auto" />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
      <Skeleton className="w-full h-[250px] m-auto" />
    </>
  );
}

export default ExploreMainLoading;
