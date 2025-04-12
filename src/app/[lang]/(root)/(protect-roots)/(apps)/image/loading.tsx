import FormSkeleton from "@/components/shared/skeleton/FormSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImageLoading() {
  return (
    <div className="form-padding flex flex-col sm:flex-row w-full gap-3">
      <div className="col gap-form flex-grow sm:w-1/5">
        <FormSkeleton />
      </div>
      <div className="sm:w-4/5 h-full flex flex-col gap-y-4">
        <div>
          <Skeleton className="h-[100px] sm:h-[200px]" />
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          <Skeleton className="h-3 w-[120px]" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          <Skeleton className="h-3 w-[120px]" />
          <div className="flex flex-row justify-between gap-2">
            <Skeleton className="h-[24px] w-[140px]" />
            <Skeleton className="h-[24px] w-[200px]" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    </div>
  );
}
