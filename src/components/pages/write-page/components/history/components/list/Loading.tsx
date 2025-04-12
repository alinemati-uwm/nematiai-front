import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function WritePageLoading() {
  return Array.from({ length: 7 }).map((_, key) => (
    <Skeleton key={key} className="h-[120px]"></Skeleton>
  ));
}

export default WritePageLoading;
