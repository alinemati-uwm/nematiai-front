import React from "react";

import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";

function UpgradeHeader() {
  const {
    common: { upgrade },
  } = useGetDictionary();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();

  return (
    <Link href="/upgrade">
      <Button
        variant="gradiant"
        className="flex flex-row gap-x-1"
        onClick={() => {
          setIsOpen(false);
          setActiveMenu("upgrade");
        }}
      >
        <AppIcon icon="material-symbols:diamond-outline" width={14} />
        <span className="max-sm:hidden">{upgrade}</span>
      </Button>
    </Link>
  );
}

export default UpgradeHeader;
