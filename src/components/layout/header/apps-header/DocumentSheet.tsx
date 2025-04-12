"use client";

import React from "react";

import { useDrawerInfo } from "@/components/pages/chat/hooks/useDrawerInfo";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";

export function DocumentSheet() {
  const { drawerInfo, close: closeDraw, show: showDraw } = useDrawerInfo();

  return (
    <>
      <Button
        variant="outline"
        spacing="none"
        selected={drawerInfo.active === "document"}
        onClick={() => {
          if (drawerInfo.active !== "document") {
            showDraw({
              active: "document",
            });
          } else {
            closeDraw();
          }
        }}
      >
        <AppIcon icon="material-symbols:sticky-note-2-outline" width={16} />
      </Button>
    </>
  );
}
