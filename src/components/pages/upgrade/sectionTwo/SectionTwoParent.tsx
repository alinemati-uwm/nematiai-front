"use client";

import { useState } from "react";

import AppTypo from "@/components/ui/AppTypo";

import BoxChildren from "./children/BoxChildren";
import TabChildren from "./children/TabChildren";

export default function SectionTwoParent() {
  const [activeTab, setActiveTab] = useState("tab");
  const tabItems = [
    { state: "me" },
    { state: "you" },
    { state: "tab" },
    { state: "map" },
    { state: "they" },
    { state: "we" },
  ];
  return (
    <div className="h-full w-full  bg-gradient-to-t from-transparent via-success-lighter to-transparent ">
      <div className="p-8  h-full w-full flex flex-col items-center gap-8 ">
        <AppTypo variant="headingS">Office ipsum you must be muted.</AppTypo>
        <div className="w-full  xl:h-[326px] flex flex-col gap-9 items-center ">
          <TabChildren
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabItems={tabItems}
          />
          <BoxChildren />
        </div>
      </div>
    </div>
  );
}
