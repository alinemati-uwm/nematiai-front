import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    size: {
      sm: "!h-3.5 !w-3.5 ",
      md: "!h-4 !w-4",
      lg: "!h-5 !w-5 ",
    },
  },
  defaultVariants: {},
});

export type typeColorVariant =
  | "default"
  | "danger"
  | "success"
  | "warning"
  | "info";

export const paletteColors = {
  default: [
    "[--color:theme(colors.primary.DEFAULT)]",
    "[--dark:theme(colors.primary.dark)]",
    "[--darker:theme(colors.primary.darker)]",
    "[--lighter:theme(colors.primary.lighter)]",
    "[--light:theme(colors.primary.light)]",
    "[--icon:theme(colors.label.icon)]",
  ],
  danger: [
    "[--color:theme(colors.danger.DEFAULT)]",
    "[--dark:theme(colors.danger.dark)]",
    "[--darker:theme(colors.danger.darker)]",
    "[--lighter:theme(colors.danger.lighter)]",
    "[--light:theme(colors.danger.light)]",
    "[--icon:theme(colors.danger.DEFAULT)]",
  ],
  success: [
    "[--color:theme(colors.success.DEFAULT)]",
    "[--dark:theme(colors.success.dark)]",
    "[--darker:theme(colors.success.darker)]",
    "[--lighter:theme(colors.success.lighter)]",
    "[--light:theme(colors.success.light)]",
    "[--icon:theme(colors.success.DEFAULT)]",
  ],
  warning: [
    "[--color:theme(colors.warning.DEFAULT)]",
    "[--dark:theme(colors.warning.dark)]",
    "[--darker:theme(colors.warning.darker)]",
    "[--lighter:theme(colors.warning.lighter)]",
    "[--light:theme(colors.warning.light)]",
    "[--icon:theme(colors.warning.DEFAULT)]",
  ],
  info: [
    "[--color:theme(colors.info.DEFAULT)]",
    "[--dark:theme(colors.info.dark)]",
    "[--darker:theme(colors.info.darker)]",
    "[--lighter:theme(colors.info.lighter)]",
    "[--light:theme(colors.info.light)]",
    "[--icon:theme(colors.info.DEFAULT)]",
  ],
};

export const inputVariant = cva(
  // "   aria-expanded:border-primary [&>span]:line-clamp-1",

  "flex flex-row h-input w-full px-2 disabled:cursor-not-allowed whitespace-nowrap gap-1 rounded items-center justify-between ring-offset-background focus:outline-none focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        input: `bg-[--light] border border-[--dark] text-label hover:bg-[--dark] hover:border-[--darker]
				     focus:bg-[--light] focus:border-[--darker] focus:text-[--text]
					 disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-darker`,
        "whitout-border": `bg-[--light] text-[--darker] hover:bg-[--dark] hover:border-[--darker]
				     focus:bg-[--light] focus:border-[--darker] focus:text-[--text]
					 disabled:bg-holder-dark disabled:text-label-disable disabled:border-holder-darker`,
        "just-border": `border border-[--dark] hover:border-[--darker]
				     focus:border-[--darker] focus:text-[--text]
					 disabled:border-holder-darker`,
      },
      size: {
        default: "text-small",
      },
      color: {
        input: [
          "[--color:theme(colors.primary.DEFAULT)]",
          "[--dark:theme(colors.holder.dark)]",
          "[--darker:theme(colors.holder.darker)]",
          "[--lighter:theme(colors.holder.lighter)]", //*
          "[--light:theme(colors.holder.light)]",
          "[--text:theme(colors.label.dark)]",
        ],
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const promptVariant = cva(
  // "   aria-expanded:border-primary [&>span]:line-clamp-1",

  "rounded p-2",
  {
    variants: {
      variant: {
        prompt:
          " outline-none ring-0 bg-[--light] border text-[--darker] hover:bg-[--dark] hover:border-[--darker]  focus-within:bg-[--light] focus-within:text-[--text]  focus-within:border-[--darker]",
        "prompt-focus": "bg-[--light] border border-[--darker] text-[--text]",
      },
      color: {
        input: [
          "[--color:theme(colors.primary.DEFAULT)]",
          "[--dark:theme(colors.holder.dark)]",
          "[--darker:theme(colors.holder.darker)]",
          "[--lighter:theme(colors.holder.lighter)]", //*
          "[--light:theme(colors.holder.light)]",
          "[--text:theme(colors.label.dark)]",
        ],
      },
    },
  },
);
