import { Skeleton } from "@/components/ui/skeleton";

export function CategoryLoading() {
  return (
    <div className="  w-full flex gap-3  ">
      {[1, 2, 3, 4, 5, 6].map(item => (
        <Skeleton
          key={item}
          className="flex flex-row   cursor-pointer items-center gap-x-1 py-1 px-3 rounded hover:bg-primary-lighter h-7 w-[69px] "
        />
      ))}
    </div>
  );
}
