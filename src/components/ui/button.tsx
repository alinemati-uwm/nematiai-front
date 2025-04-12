import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { AppTooltip } from "@/components/shared";
import Loading from "@/components/shared/Loading";
import RenderIf from "@/components/shared/RenderIf";

import { paletteColors } from "./variants";

const buttonVariants = cva(
  "flex flex-row  disabled:cursor-not-allowed whitespace-nowrap gap-1 rounded items-center justify-center",
  {
    variants: {
      variant: {
        default: `bg-[--color] text-[--lighter] hover:bg-[--dark] active:bg-[--darker]  
					 disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-dark
					 selected:bg-[--lighter] selected:text-[--color]`,
        outline: `text-label-light border border-seperator hover:bg-[--lighter] hover:border-[--darker] hover:text-[--darker] active:bg-[--light] 
				    disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-dark
				    selected:border-[--color] selected:border selected:text-[--color] selected:bg-[--lighter]`,
        secondary: `bg-muted-light text-muted-darker hover:bg-muted-dark active:bg-muted-darker active:text-muted-lighter   
					disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-dark
					selected:bg-muted-light selected:border-primary selected:border selected:text-primary`,
        text: `text-[--color]  hover:bg-[--lighter] active:bg-[--light]   
					disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-dark
					selected:bg-muted-light selected:text-[--color]`,
        link: `underline text-[--color] hover:text-[--dark] active:text-[--darker]   
					disabled:text-label-disable
					selected:bg-muted-light selected:text-[--color]`,
        ghost: "",
        gradiant:
          "bg-gradient-to-r from-primary to-[#0C66E4] text-white hover:to-primary transition-all duration-500",
        input: `bg-[--light] border border-[--dark] text-[--darker] hover:bg-[--dark] hover:border-[--darker]
					 disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-darker`,
      },
      color: {
        ...paletteColors,
        input: [
          "[--color:theme(colors.primary.DEFAULT)]",
          "[--dark:theme(colors.holder.dark)]",
          "[--darker:theme(colors.holder.darker)]",
          "[--lighter:theme(colors.holder.lighter)]", //*
          "[--light:theme(colors.holder.light)]",
          "[--icon:theme(colors.label.icon)]",
        ],
      },
      size: {
        default: "h-8 text-small ",
        sm: "h-7  text-small px-2",
        lg: "h-9  px-6",
        xl: "h-11  text-large px-8",
      },
      spacing: {
        default: " ",
        "md:none": "  ",
        none: "  ",
        input: "!px-2",
      },
    },
    compoundVariants: [
      {
        size: "default",
        spacing: "default",
        class: "px-4",
      },
      {
        size: "sm",
        spacing: "default",
        class: "px-2",
      },
      {
        size: "lg",
        spacing: "default",
        class: "px-6",
      },
      {
        size: "xl",
        spacing: "default",
        class: "px-8",
      },
      //"md:none"
      {
        size: "default",
        spacing: "md:none",
        class: " min-w-8 px-0 md:px-4",
      },
      {
        size: "sm",
        spacing: "md:none",
        class: "min-w-7 px-0 md:px-2",
      },
      {
        size: "lg",
        spacing: "md:none",
        class: "min-w-9 md:px-6 px-0",
      },
      {
        size: "xl",
        spacing: "md:none",
        class: "min-w-11 md:px-8 px-0",
      },
      //"none"
      {
        size: "default",
        spacing: "none",
        class: "min-w-8 px-0",
      },
      {
        size: "sm",
        spacing: "none",
        class: "min-w-7 px-0",
      },
      {
        size: "lg",
        spacing: "none",
        class: "min-w-9 px-0",
      },
      {
        size: "xl",
        spacing: "none",
        class: "min-w-11 px-0",
      },
    ],
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
  element?: "div" | "button";
} & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      element = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : element;

    const main = (
      <Comp
        className={buttonVariants({ spacing, color, variant, size, className })}
        //@ts-ignore
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
    return title ? <AppTooltip title={title}>{main}</AppTooltip> : main;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
