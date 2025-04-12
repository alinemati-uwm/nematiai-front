import React, { type ReactNode } from "react";

import * as Popover from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

type popver = {
  trigger: ReactNode;
  children: ReactNode;
  props?: {
    root?: Popover.PopoverProps;
    trigger?: Popover.PopoverTriggerProps;
    portal?: Popover.PopoverPortalProps;
    content?: Popover.PopoverContentProps;
  };
};

function AppPopover({ children, props, trigger }: popver) {
  return (
    <Popover.Root {...props?.root}>
      <Popover.Trigger {...props?.trigger}>{trigger}</Popover.Trigger>
      <Popover.Portal {...props?.portal}>
        <Popover.Content
          {...props?.content}
          className={cn(
            "outline-none bg-muted border rounded",
            props?.content?.className,
          )}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default AppPopover;
