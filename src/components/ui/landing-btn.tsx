import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import Loading from "@/components/shared/Loading";
import RenderIf from "@/components/shared/RenderIf";

import { landingPaletteColors } from "./landing_variants";

const landingButtonVariants = cva(
  "flex flex-row  disabled:cursor-not-allowed gap-1 lg:hover:bg-[--primaryDark] duration-300 active:bg-[--primaryDark] rounded items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[--primary] text-[--light]",
        secondary:
          "bg-[--light] text-[--primary]  lg:hover:text-[--light] active:text-[--light]",
        rounded: "bg-[--primary]  rounded-full",
        outline:
          "text-[--light] border border-[--light] lg:hover:bg-[--light] lg:hover:text-black",
      },
      color: landingPaletteColors,
      size: {
        default: "h-8 text-small ",
        sm: "h-7  text-small px-2",
        lg: "h-10 text-base px-6",
        xl: "h-11  text-large px-8",
        roundedXl: "h-6 w-6 text-large p-8",
      },
      spacing: {
        default: " ",
        "md:none": "  ",
        none: "  ",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      size: "default",
      color: "default",
    },
  },
);

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  asChild?: boolean;
  isPending?: boolean;
  selected?: boolean;
  size?: "default" | "xl" | "lg" | "sm" | "roundedXl";
  color?: "default";
  spacing?: "default" | "md:none" | "none";
  variant?: "default" | "secondary" | "rounded" | "outline";
};

const Landing_btn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isPending,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      title,
      selected,
      color = "default",
      spacing = "default",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={landingButtonVariants({
          spacing,
          color,
          variant,
          size,
          className,
        })}
        ref={ref}
        disabled={props.disabled || isPending}
        data-selected={selected ? "true" : undefined}
        {...props}
      >
        <RenderIf isTrue={!!isPending}>
          <Loading
            rootClass="-ms-1 me-1"
            svgClass="w-6 h-6 !stroke-primary-lighter"
          />
        </RenderIf>
        {children}
      </Comp>
    );
  },
);
Landing_btn.displayName = "Button";

export { Landing_btn, landingButtonVariants };
