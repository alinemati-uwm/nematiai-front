import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Component for a skeleton loader for a form.
 *
 * @component
 * @returns The FormSkeleton component.
 */
export default function FormSkeleton() {
  return (
    <>
      <div className="col gap-label-space">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-32 w-full" />
      </div>

      <div className="col gap-label-space">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-element w-full" />
      </div>

      <div className="row w-full gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <div className="col w-full gap-label-space">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </>
  );
}
