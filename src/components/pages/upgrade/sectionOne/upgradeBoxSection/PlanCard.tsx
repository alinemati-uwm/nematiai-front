import { useState } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import UpgradeModal from "@/components/user/panel/UpgradeModal";
import type { PlanItem } from "@/services/types";

export default function PlanCard({
  item,
  yearly,
}: {
  item: PlanItem;
  yearly: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={` w-full xl:h-full h-[400px]  bg-holder-lighter rounded-lg  shadow-card-hover flex flex-col  justify-between  border-2 p-[1px] ${item.highlight && "bg-gradient-to-b from-gradient-gradientStart to-primary "} `}
    >
      <div className="flex flex-col  w-full h-full justify-between p-4 bg-holder-lighter rounded-[9px] ">
        <div className="flex flex-col gap-[10px] ">
          <AppTypo variant="headingS">{item.title}</AppTypo>
          <AppTypo variant="headingS">
            ${item.price}/
            <AppTypo variant="small" className="font-thin">
              {item.is_monthly ? " Month" : " Year"}
            </AppTypo>
          </AppTypo>
          <AppTypo>{item.credit + "Credit"}</AppTypo>
          <ul className="list-disc list-inside px-3">
            {item.features.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <Button
            disabled={item.active}
            onClick={() => setOpen(true)}
            variant={item.highlight ? "default" : "outline"}
            className="w-full"
          >
            {item.active ? "Current" : "Upgrade"}
          </Button>
        </div>
      </div>
      <UpgradeModal
        showYearly={yearly}
        plan={item}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
