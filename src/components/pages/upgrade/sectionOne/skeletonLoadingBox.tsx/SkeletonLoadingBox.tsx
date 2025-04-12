import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return [1, 2, 3, 4].map((item, index) => (
    <Skeleton
      key={index}
      className="w-full xl:h-full h-[400px]   rounded-lg  shadow-card-hover flex flex-col  justify-between p-4 border-2 mr-2"
    />
  ));
}
