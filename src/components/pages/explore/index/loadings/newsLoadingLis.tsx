import { Skeleton } from "@/components/ui/skeleton";

export function NewsLoadingList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <Skeleton className="flex flex-col bg-muted-light col-span-full h-[30vh] "></Skeleton>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
        <Skeleton
          key={item}
          className="flex flex-col bg-muted-light h-[40vh]"
        ></Skeleton>
      ))}
    </div>
  );
}
