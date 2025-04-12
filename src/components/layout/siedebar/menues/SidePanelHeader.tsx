"use client";

import Image from "next/image";

import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";

import { ToggleSidePanelButton } from "../../header/ToggleSidePanelButton";

type Props = {
  setIsSidePanelOpen(isSidePanelOpen: boolean): void;
};

export default function SidePanelHeader({ setIsSidePanelOpen }: Props) {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  const {
    common: { brand_name },
  } = useGetDictionary();
  return (
    <div
      className={cn(
        "flex h-header items-center",
        !isSidePanelOpen
          ? "justify-center pe-0.5"
          : "!w-full overflow-hidden gap-6 p-4",
      )}
    >
      {isSidePanelOpen && (
        <div className="flex gap-3 justify-center items-center">
          <Image
            src="/images/common/logo.svg"
            alt="nerd logo"
            width={44}
            priority
            height={44}
          />
          <AppTypo
            variant="headingM"
            className="text-gradiant whitespace-nowrap"
          >
            {brand_name}
          </AppTypo>
        </div>
      )}
      <ToggleSidePanelButton />
    </div>
  );
}
