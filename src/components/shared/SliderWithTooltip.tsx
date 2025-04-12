"use client";

import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SliderWithTooltip = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    container?: HTMLDivElement | null;
    open?: boolean;
  }
>(({ open = true, className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex  w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden  rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <SliderPrimitive.Thumb className="block h-5 active:cursor-grabbing cursor-grab w-5 rounded-full border-2 border-primary bg-holder-lighter ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 relative start-0.5 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  </SliderPrimitive.Root>
));
SliderWithTooltip.displayName = SliderPrimitive.Root.displayName;

export { SliderWithTooltip };
