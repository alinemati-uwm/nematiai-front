"use client";

import React, { type ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import RenderIf from "@/components/shared/RenderIf";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

const variants = cva("", {
  variants: {
    variant: {
      bg: " bg-[--lighter] text-[--color] ",
      border: "fill-[--lighter]",
    },
    color: {
      default: [
        "[--color:theme(colors.label.dark)]",
        "[--lighter:theme(colors.holder.lighter)]",
      ],
      danger: [
        "[--color:theme(colors.danger.DEFAULT)]",
        "[--lighter:theme(colors.danger.lighter)]",
      ],
      success: [
        "[--color:theme(colors.success.DEFAULT)]",
        "[--lighter:theme(colors.success.lighter)]",
      ],
      warning: [
        "[--color:theme(colors.warning.DEFAULT)]",
        "[--lighter:theme(colors.warning.lighter)]",
      ],
      info: [
        "[--color:theme(colors.info.DEFAULT)]",
        "[--lighter:theme(colors.info.lighter)]",
      ],
    },
  },
});

type IProps = {
  title: string | ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  alignOffset?: number;
  sideOffset?: number;
  open?: boolean;
  setOpen?: (val: boolean) => void;
  contentClass?: string;
  responseTab?: boolean;
  arrow?: boolean;
  children: React.ReactNode;
  asChild?: boolean;
  tooltipTriggerClassName?: string;
} & Omit<VariantProps<typeof variants>, "variant">;

/**
 * tooltip for button
 * @param title tooltip title
 * @param side tooltip content side to button default is top
 * @param delayDuration delay duration to open in millisecond default is 100
 * @param align align of tooltip content to button
 * @param alignOffset
 * @param children
 * @param contentClass
 * @param responseTab
 * @param asChild
 * @param tooltipTriggerClassName
 * @param arrow
 * @param color
 * @param sideOffset
 * @constructor
 */

export const AppTooltip = ({
  title,
  side = "top",
  delayDuration = 200,
  align,
  alignOffset,
  children,
  contentClass,
  responseTab,
  asChild = true,
  tooltipTriggerClassName = "",
  arrow = true,
  color = "default",
  sideOffset,
}: IProps) => {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger className={tooltipTriggerClassName} asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={cn(
            "!z-100 max-md:hidden ",
            variants({ variant: "bg", color }),
            contentClass,
          )}
          {...(responseTab && {
            container: editorAndFooterButtonsWrapperRef.current,
          })}
        >
          <p className="text-small font-normal first-letter:capitalize">
            {title}
          </p>
          <RenderIf isTrue={arrow}>
            <TooltipArrow className={variants({ variant: "border", color })} />
          </RenderIf>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
