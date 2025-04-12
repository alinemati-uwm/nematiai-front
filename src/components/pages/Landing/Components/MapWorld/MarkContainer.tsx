import React, { useState } from "react";

import * as HoverCard from "@radix-ui/react-hover-card";
import { Marker } from "react-simple-maps";

import AppIcon from "@/components/shared/AppIcon";

import { type commentItem } from "../comments/model";

function MarkContainer({ item }: { item: commentItem }) {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <HoverCard.Root open={isMobile}>
      <HoverCard.Trigger
        asChild
        onMouseOver={() => setIsMobile(true)}
        onMouseLeave={() => setIsMobile(false)}
      >
        <Marker coordinates={[item.lng, item.lat]}>
          <image
            href="/images/landing/map_mark.png"
            className="w-10 h-10 lg:w-5 lg:h-5 transform -translate-x-2.5 -translate-y-2.5"
          />
        </Marker>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="HoverCardContent bg-white w-[260px] z-10 rounded-sm flex flex-row gap-x-2 p-3"
          sideOffset={5}
        >
          <AppIcon
            icon="ix:user-profile-filled"
            width={50}
            height={50}
            color="#777"
          />
          <div className="flex flex-col gap-y-1">
            <text className="text-base">{item.name}</text>
            <text className="text-small text-gray-500">{item.location}</text>
            <text className="text-small">{item.message}</text>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export default MarkContainer;
