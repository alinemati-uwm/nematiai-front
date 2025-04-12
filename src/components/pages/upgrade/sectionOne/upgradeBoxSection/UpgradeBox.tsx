import useGetAllPlans from "@/refactor_lib/hooks/queries/useGetAllPlans";
import { type PlanItem } from "@/services/types";

import SkeletonLoading from "../skeletonLoadingBox.tsx/SkeletonLoadingBox";
import PlanCard from "./PlanCard";

export default function UpgradeBox({ activePlan }: { activePlan: string }) {
  const { data: ListPlans, isLoading } = useGetAllPlans(
    activePlan === "monthly",
  );

  return (
    <div className="w-full   bg-holder  h-auto xl:h-[518px]  rounded p-4 flex flex-col lg:flex-row gap-6   ">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        ListPlans?.data.plans.map(item => (
          <PlanCard
            key={item.id}
            item={item as PlanItem}
            yearly={activePlan === "monthly"}
          />
        ))
      )}
    </div>
  );
}
