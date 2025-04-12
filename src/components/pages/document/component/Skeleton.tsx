"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function Skeletons({ col = 1 }: { col?: number }) {
  return (
    <div className={`grid grid-cols-${col} gap-y-3`}>
      {Array.from({ length: 5 }).map((_, key) => (
        <div
          key={key}
          className="flex  flex-row p-2 gap-x-3 bg-white rounded-md"
        >
          <Skeleton className="w-5 h-5"></Skeleton>
          <div className="flex flex-col gap-y-2 justify-center w-full">
            <Skeleton className="w-full h-2"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeletons;
