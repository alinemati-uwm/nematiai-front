import React, { useState, type ReactNode } from "react";

import * as Popover from "@radix-ui/react-popover";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

type props = {
  icon: string;
  onClick(): void;
  popover?: ReactNode;
};

function ExploreToolsCard({ icon, onClick, popover }: props) {
  // Local state to manage toggle behavior for the popover
  const [toggle, setToggle] = useState(false);

  // Custom hook to check if the screen width is less than 'xl' breakpoint
  const { isLessThan } = useBreakpoint();

  return (
    // Root container for the Popover component
    <Popover.Root onOpenChange={e => setToggle(e)}>
      {/* Popover trigger: The button that triggers the popover and the onClick action */}
      <Popover.Trigger>
        <div
          className={`w-10 h-10 lg:w-9 xl:w-10 lg:h-9 xl:h-10 rounded relative group flex justify-center items-center bg-muted cursor-pointer ${toggle ? "" : "hover:bg-muted-dark"} transition`}
          onClick={e => {
            // Prevents the event propagation if there is no popover and an onClick is provided
            if (!popover && onClick) {
              e.stopPropagation();
              onClick();
            }
          }}
        >
          {/* The icon for the tool */}
          <AppIcon icon={icon} width={16} />
        </div>
      </Popover.Trigger>

      {/* Popover content: It is conditionally positioned based on screen size */}
      <Popover.Portal>
        <Popover.Content
          className={`h-10 ${!isLessThan("xl") ? "-translate-x-2 rounded-r pl-1 pr-3" : "translate-y-1 rounded px-2"} bg-muted flex flex-row items-center`}
          side={isLessThan("xl") ? "bottom" : "right"} // Popover placement based on screen size
        >
          {popover} {/* The popover content passed as a prop */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ExploreToolsCard;
