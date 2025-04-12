import { type Dispatch, type SetStateAction } from "react";

import MonthlyYearlyBtns from "../../sectionOne/upgradeBoxSection/MonthlyYearlyBtns";

export default function TabChildren({
  activeTab,
  setActiveTab,
  tabItems,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  tabItems: { state: string }[];
}) {
  return (
    <div className="lg:w-[412px] h-10">
      <MonthlyYearlyBtns
        className=""
        activetab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabItems}
      />
    </div>
  );
}
