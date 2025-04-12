import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function ImageLoadingTabs() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, key) => (
        <div key={key} className={key === 0 ? "col-span-2 h-28" : "h-8"}>
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}

export default ImageLoadingTabs;
