import { type Dispatch, type SetStateAction } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MonthlyYearlyBtns({
  setActiveTab,
  activetab,
  tabs,
  className,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activetab: string;
  tabs: { state: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-auto h-9 bg-holder border rounded-2xl flex p-1",
        className,
      )}
    >
      {tabs.map(item => (
        <Button
          key={item.state}
          variant="ghost"
          onClick={() => setActiveTab(item.state.toLowerCase())}
          className={`w-1/2 h-full ${activetab === item.state.toLowerCase() && " bg-opacity-1 !bg-holder-lighter "} duration-500 bg-transparent cursor-pointer   rounded-2xl flex justify-center items-center`}
        >
          <AppTypo onClick={() => setActiveTab(item.state.toLowerCase())}>
            {item.state}
          </AppTypo>
        </Button>
      ))}
    </div>
  );
}
