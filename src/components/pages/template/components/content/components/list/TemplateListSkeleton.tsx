import React, { useContext } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import TemplateContentContext from "../../context";

function TemplateListSkeleton() {
  const {
    methods: { callbackMethod },
  } = useContext(TemplateContentContext);

  return (
    <div
      className={`grid it grid-cols-1 items-center ${!callbackMethod ? "sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "lg:grid-cols-2 xl:grid-cols-3"} gap-5`}
    >
      {Array.from({ length: 5 }).map((_, key) => (
        <div
          key={key}
          className="col max-h-52 gap-2 rounded border bg-holder-lighter p-3"
        >
          <div className="row flex-row w-full gap-5">
            <Skeleton className="h-10 w-10 rounded" />
            <div className="flex-grow space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-8 w-20 " />
        </div>
      ))}
    </div>
  );
}

export default TemplateListSkeleton;
