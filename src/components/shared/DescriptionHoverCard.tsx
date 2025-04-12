"use client";

import { useState } from "react";

import AppTypo from "@/components/ui/AppTypo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import AppIcon from "./AppIcon";

/**
 * used in settings popover
 * a hover card with info button that also open with click for mobile devices
 * @param description description of target option
 * @param state state of hover card
 * @param iconSize size of icon
 * @constructor
 */
export function DescriptionHoverCard({
  description,
  state,
  iconSize = ".9rem",
}: {
  description: string;
  iconSize?: string;
  state?: string;
}) {
  // open state for hover card to open with click for mobile devices
  const [open, setOpen] = useState(false);

  return (
    <HoverCard
      openDelay={200}
      closeDelay={100}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCardTrigger className="h-fit p-0" onClick={() => setOpen(!open)}>
        {state === "info" ? (
          <AppIcon
            icon="lucide:info"
            className="w-4 relative top-0.5  active:text-primary-dark lg:hover:text-primary-dark"
          />
        ) : (
          <AppIcon
            icon="ph:question"
            width={iconSize}
            className="text-blue-400"
          />
        )}
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        sideOffset={12}
        className="col cart-arrow relative max-w-72 gap-2 p-2 text-start"
      >
        <AppTypo variant="small">{description}</AppTypo>
      </HoverCardContent>
    </HoverCard>
  );
}
