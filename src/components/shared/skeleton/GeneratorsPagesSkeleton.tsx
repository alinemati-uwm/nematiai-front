"use client";

import FormSkeleton from "@/components/shared/skeleton/FormSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatbotStore } from "@/stores/zustand/chat";

/**
 * Component for the skeleton of the GeneratorsPages.
 *
 * @component
 * @returns JSX.Element The rendered skeleton component.
 */
export default function GeneratorsPagesSkeleton() {
  const { drawerInfo } = useChatbotStore(state => ({
    drawerInfo: state.drawerInfo,
  }));
  return (
    <>
      {drawerInfo.show ? (
        <div className="form-padding flex h-full w-full gap-3">
          <Skeleton className="h-full w-full min-w-32 rounded" />
        </div>
      ) : (
        <div className="form-padding flex flex-row h-full w-full gap-3">
          <div className="col gap-form h-fit flex-grow w-1/4">
            <FormSkeleton />
          </div>
          <div className="w-3/4 h-full">
            <Skeleton className="h-full w-full min-w-32 rounded" />
          </div>
        </div>
      )}
    </>
  );
}
