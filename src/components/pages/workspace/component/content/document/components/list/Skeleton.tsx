import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function DcumentListSkeleton() {
  return Array.from({ length: 7 }).map((_, key) => (
    <Skeleton key={key} className="h-[100px] rounded"></Skeleton>
  ));
}

export default DcumentListSkeleton;
