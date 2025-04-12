import React, { type ComponentPropsWithoutRef, type JSX } from "react";

import type { PopoverContentProps } from "@radix-ui/react-popover";
import { useMediaQuery } from "usehooks-ts";
import { type Drawer as DrawerPrimitive } from "vaul";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type ChildrenProps, type StateSetterType } from "@/services/types";

interface IProps {
  trigger: JSX.Element;
  open?: boolean;
  setOpen?: StateSetterType<boolean>;
  popoverContentProps?: PopoverContentProps;
  drawerContentProps?: ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>;
}

/**
 * for render popover or drawer based on screen size
 * @param trigger - trigger element for popover or drawer
 * @param children - content of popover or drawer
 * @param open - for control open state of popover or drawer
 * @param setOpen - for control open state of popover or drawer
 * @param popoverContentProps
 * @param drawerContentProps
 * @constructor
 */
export function ResponsivePopover({
  trigger,
  children,
  open,
  setOpen,
  popoverContentProps,
  drawerContentProps,
}: ChildrenProps<IProps>) {
  const isMobileSize = useMediaQuery("(max-width:768px)");

  if (isMobileSize) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent {...drawerContentProps}>{children}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent {...popoverContentProps}>{children}</PopoverContent>
    </Popover>
  );
}
