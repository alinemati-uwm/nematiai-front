import React, { type FC } from "react";

import type { TabItem } from "@/components/page-generate/types";
import AppIcon from "@/components/shared/AppIcon";
import AppSwiper from "@/components/shared/AppSwiper";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";

interface IProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  tabs: TabItem[];
  className?: string;
}

const GenerateFormTabs: FC<IProps> = ({
  onTabChange,
  activeTab,
  tabs,
  className,
}) => {
  return (
    <nav
      className={cn(
        "w-fit mx-auto max-w-full row p-1 bg-muted border-[0.5px] rounded-2xl ",
        className,
      )}
    >
      <AppSwiper
        SwiperSlideProps={{
          className: "w-auto max-w-max min-w-fit",
        }}
        config={{
          spaceBetween: 4,
        }}
      >
        {tabs.map(item => {
          const isActive = activeTab === item.tabKey;

          return (
            <div
              key={item.id}
              className={cn(
                "row justify-center w-full py-1 px-2 md:px-4 gap-1 cursor-pointer  rounded-xl transition-all duration-200",
                isActive && "bg-holder-lighter",
              )}
              onClick={() => onTabChange(item.tabKey)}
            >
              <RenderIf isTrue={!!item.icon}>
                <AppIcon
                  icon={item.icon!}
                  width={18}
                  className={isActive ? "text-label-darker" : ""}
                />
              </RenderIf>
              <AppTypo
                className={cn("text-nowrap", isActive && "text-label-darker")}
              >
                {item.title}
              </AppTypo>
            </div>
          );
        })}
      </AppSwiper>
    </nav>
  );
};

export default GenerateFormTabs;
