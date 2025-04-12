"use client";

import { useState } from "react";

import MonthlyYearlyBtns from "./MonthlyYearlyBtns";
import UpgradeBox from "./UpgradeBox";

export default function UpgradeBoxSection() {
  const [activePlan, setActivePlan] = useState<string>("monthly");
  const tabs = [{ state: "Monthly" }, { state: "Yearly" }];
  return (
    <div className="flex flex-col items-center  w-full gap-2 ">
      <MonthlyYearlyBtns
        activetab={activePlan}
        tabs={tabs}
        setActiveTab={setActivePlan}
        key="sfsf7758"
      />
      <UpgradeBox activePlan={activePlan} />
    </div>
  );
}
