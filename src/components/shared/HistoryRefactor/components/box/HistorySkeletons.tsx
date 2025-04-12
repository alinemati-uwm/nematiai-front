import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function HistorySkeletons() {
  return (
    <div className="flex flex-col gap-y-3">
      {Array.from({ length: 3 }).map((_, key) => (
        <div
          key={key}
          className="flex flex-row p-2 gap-x-3 bg-holder-lighter rounded-md"
        >
          <Skeleton className="w-20 h-20"></Skeleton>
          <div className="flex flex-col gap-y-2 w-[50%]">
            <Skeleton className="w-full h-2"></Skeleton>
            <Skeleton className="w-full h-2"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistorySkeletons;
