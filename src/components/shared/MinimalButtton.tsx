import { forwardRef } from "react";

import { cva } from "class-variance-authority";

import { AppTooltip } from "@/components/shared/AppTooltip";

import { paletteColors, type typeColorVariant } from "../ui/variants";
import AppIcon from "./AppIcon";

/**
 * Minimal button with icon and title for tooltip
 * @param className - additional class name
 * @param title - tooltip title
 * @param Icon - icon component
 * @param iconClassname - additional class name for icon
 * @param otherProps - other button props
 * @constructor
 */

const iconVariants = cva(
  "flex flex-row  disabled:cursor-not-allowed rounded-full items-center justify-center caret-transparent",
  {
    variants: {
      variant: {
        default: `text-[--icon] hover:bg-[--lighter] active:bg-[--light]    
					disabled:text-label-disable
					selected:bg-[--lighter] selected:border selected:border-[--light] selected:text-[--color]`,
        fill: `bg-[--color] text-[--lighter] hover:bg-[--dark] active:bg-[--darker]  
				disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-dark
				 selected:bg-[--lighter] selected:text-[--color]`,
        ghost: "text-[--icon] disabled:text-label-disable",
        custom: "",
      },
      color: {
        ...paletteColors,
        light: [
          "[--color:#fff]",
          "[--dark:#3d3d3d]",
          "[--darker:rgb(42, 39, 52)]",
          "[--lighter:#717276]",
          "[--light:#5a5959]",
          "[--icon:#fff]",
        ],
      },
      size: {
        default: "h-8 w-8  ",
        sm: "h-8 w-8 ",
        lg: "h-9 w-9 ",
        xl: "h-11 w-11",
        xs: "h-7 w-7",
      },
    },
    compoundVariants: [
      {
        size: "default",
        variant: "ghost",
        class: "!h-auto !w-auto !px-0 ",
      },
      {
        size: "sm",
        variant: "ghost",
        class: "!h-auto !w-auto !min-w-auto !px-0",
      },
      {
        size: "lg",
        variant: "ghost",
        class: "px-6",
      },
      {
        size: "xl",
        variant: "ghost",
        class: "px-8",
      },
    ],
    defaultVariants: {
      size: "default",
      color: "default",
    },
  },
);

export type IconProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  asChild?: boolean;
  selected?: boolean;
  size?: "default" | "xl" | "lg" | "sm" | "xs";
  color?: typeColorVariant | "light";
  variant?: "default" | "fill" | "ghost";
  icon: string;
  tooltipColor?: typeColorVariant;
  disabled?: boolean;
  element?: "div" | "button";
  iconClassName?: string;
};

const MinimalButton = forwardRef<HTMLButtonElement, IconProps>(
  (
    {
      className,
      title,
      icon,
      color = "default",
      size = "default",
      variant = "default",
      selected,
      tooltipColor = "default",
      iconClassName,
      element = "button",
      ...props
    },
    ref,
  ) => {
    const sizeIconList = {
      default: 20,
      xs: 16,
      sm: 20,
      lg: 20,
      xl: 32,
    };

    const Comp = element;

    const Button = (
      <Comp
        className={iconVariants({ color, size, variant: variant, className })}
        //@ts-ignore
        ref={ref}
        disabled={props.disabled}
        data-selected={selected ? "true" : undefined}
        {...props}
      >
        <AppIcon
          fontSize={sizeIconList[size]}
          icon={icon}
          className={iconClassName}
        />
      </Comp>
    );

    return title ? (
      <AppTooltip color={tooltipColor} title={title}>
        {Button}
      </AppTooltip>
    ) : (
      Button
    );
  },
);

MinimalButton.displayName = "MinimalButton";

export { MinimalButton };
