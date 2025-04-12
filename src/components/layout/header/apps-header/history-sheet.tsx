"use client";

import React from "react";

import { useParams, usePathname } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppHistory from "@/components/shared/HistoryRefactor/components/box/AppHistoryBox";
import { Button } from "@/components/ui/button";
import useHighlightStore from "@/stores/zustand/highlight-store";
import { useHistoryStore } from "@/stores/zustand/history-store";

import { type typeHeaderOfFirstLevel } from "../../types";

export function HistorySheet(props: typeHeaderOfFirstLevel["history"]) {
  const pathname = usePathname();
  const { lang } = useParams();
  const setHighlightIsOpen = useHighlightStore.use.setHighlightIsOpen();
  const isHighlightOpen = useHighlightStore.use.isHighlightOpen();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();

  if (pathname === `/${lang}/template`) return null;

  const toggleDrawer = () => {
    isHighlightOpen && setHighlightIsOpen(false);
    setHistoryIsOpen(!isHistoryOpen);
  };

  return props?.type ? (
    <div>
      <Button
        variant="outline"
        spacing="none"
        onClick={toggleDrawer}
        id="history-icon"
      >
        <AppIcon icon="tabler:history" width={14} />
      </Button>
      <AppHistory {...props} />
    </div>
  ) : null;
}
