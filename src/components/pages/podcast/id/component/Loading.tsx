import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function LoadingPodcast() {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex flex-col md:flex-row gap-x-5 w-[800px] max-w-[95%] relative">
        <Skeleton className="md:w-1/3 h-36"></Skeleton>
        <div className="flex flex-col md:w-2/3 gap-y-2">
          <Skeleton className="h-6"></Skeleton>
          <Skeleton className="h-6"></Skeleton>
          <Skeleton className="h-6 w-[80%]"></Skeleton>
        </div>
      </div>
    </div>
  );
}

export default LoadingPodcast;
