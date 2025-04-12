"use client";

import React from "react";

import { cn } from "@udecode/cn";
import {
  useCursorOverlay,
  type CursorData,
  type CursorOverlayState,
} from "@udecode/plate-selection/react";

import { useUiStore } from "@/stores/zustand/ui-store";

export function Cursor({
  id,
  caretPosition,
  data,
  selection,
  selectionRects,
}: CursorOverlayState<CursorData>) {
  const { style, selectionStyle = style } = data ?? ({} as CursorData);
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();

  return (
    <>
      {selectionRects.map((position, i) => {
        return (
          <div
            key={i}
            className={cn(
              "pointer-events-none absolute z-10",
              id === "selection" && "bg-primary/25",
              id === "selection" && isSidePanelOpen && "bg-primary",
            )}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        );
      })}
      {caretPosition && (
        <div
          className={cn(
            "pointer-events-none absolute z-10 w-0.5",
            id === "drag" && "w-px bg-primary",
          )}
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export function CursorOverlay() {
  const { cursors } = useCursorOverlay();

  return (
    <>
      {cursors.map(cursor => (
        <Cursor key={cursor.id} {...cursor} />
      ))}
    </>
  );
}
