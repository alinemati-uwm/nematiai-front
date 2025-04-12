import React, { type ReactNode } from "react";

import { type IconProps } from "@iconify/react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import AppIcon from "./shared/AppIcon";

interface MakeSvgProps {
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  props: Omit<IconProps, "icon">;
  spin?: string;
}

const makeSvg = ({
  svg,
  props,
  spin = "",
}: MakeSvgProps): React.ReactElement<React.SVGProps<SVGSVGElement>> => {
  // const size = props.size || 18;
  // const color = props.color || "currentColor";

  return React.cloneElement(svg, {
    // width: size,
    // height: size,
    // fill: color,
    ...props,
    className: cn(" customIcon ", props.className + spin),
  });
};

const loading = (props: Omit<IconProps, "icon">) => {
  return makeSvg({
    svg: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
      </svg>
    ),
    spin: "h-10 w-10 animate-spin stroke-slate-500",
    props,
  });
};
type typeTemplate = { className?: string; fontSize: number };

export const Template: Record<string, (props: typeTemplate) => ReactNode> = {
  Bussiness: (props: typeTemplate) => <AppIcon {...props} icon="la:user-tie" />,
  Ecommerce: (props: typeTemplate) => <AppIcon {...props} icon="uit:bag" />,
  "Product Advertising": (props: typeTemplate) => (
    <AppIcon {...props} icon="hugeicons:advertisement" />
  ),
  "Conversion Optimization": (props: typeTemplate) => (
    <AppIcon {...props} icon="icon-park-outline:file-conversion" />
  ),
  Advertising: (props: typeTemplate) => (
    <AppIcon {...props} icon="hugeicons:advertisement" />
  ),
  Marketing: (props: typeTemplate) => (
    <AppIcon {...props} icon="nimbus:marketing" />
  ),
  "Social Media": (props: typeTemplate) => (
    <AppIcon {...props} icon="hugeicons:instagram" />
  ),
  "Health and Wellness": (props: typeTemplate) => (
    <AppIcon {...props} icon="material-symbols:monitor-outline-sharp" />
  ),
  Personal: (props: typeTemplate) => <AppIcon {...props} icon="charm:person" />,
  IT: (props: typeTemplate) => <AppIcon {...props} icon="lets-icons:ito" />,
  Education: (props: typeTemplate) => (
    <AppIcon {...props} icon="tdesign:education" />
  ),
  Fun: (props: typeTemplate) => (
    <AppIcon {...props} icon="gravity-ui:face-fun" />
  ),
  Events: (props: typeTemplate) => (
    <AppIcon {...props} icon="mdi:event-multiple-check" />
  ),
  "Fitness and Sports": (props: typeTemplate) => (
    <AppIcon {...props} icon="fluent:sport-24-regular" />
  ),
  "Personal Development": (props: typeTemplate) => (
    <AppIcon {...props} icon="carbon:development" />
  ),
  "Customer Service": (props: typeTemplate) => (
    <AppIcon {...props} icon="mdi:customer-service" />
  ),
  Finance: (props: typeTemplate) => (
    <AppIcon {...props} icon="material-symbols:finance-mode-rounded" />
  ),
  Chatbot: (props: typeTemplate) => (
    <AppIcon {...props} icon="tabler:message-chatbot" />
  ),
  "Analytics Analysis": (props: typeTemplate) => (
    <AppIcon {...props} icon="material-symbols:analytics-outline" />
  ),
  "Video Marketing": (props: typeTemplate) => (
    <AppIcon {...props} icon="lets-icons:video" />
  ),
  Entrepreneurship: (props: typeTemplate) => (
    <AppIcon {...props} icon="mdi:worker-outline" />
  ),
  Agriculture: (props: typeTemplate) => (
    <AppIcon {...props} icon="healthicons:agriculture-worker" />
  ),
  "Career Development": (props: typeTemplate) => (
    <AppIcon {...props} icon="ph:network" />
  ),
  "Blockchain Technology": (props: typeTemplate) => (
    <AppIcon {...props} icon="icon-park-outline:blockchain" />
  ),
  Facebook: (props: typeTemplate) => (
    <AppIcon {...props} icon="lucide:facebook" />
  ),
  Pricing: (props: typeTemplate) => (
    <AppIcon {...props} icon="solar:tag-price-broken" />
  ),
  "Product Marketing": (props: typeTemplate) => (
    <AppIcon {...props} icon="carbon:carbon-for-ibm-product" />
  ),
  Art: (props: typeTemplate) => (
    <AppIcon {...props} icon="ic:outline-color-lens" />
  ),
  Photography: (props: typeTemplate) => (
    <AppIcon {...props} icon="carbon:image" />
  ),
  "Customer Feedback": (props: typeTemplate) => (
    <AppIcon {...props} icon="fluent:person-feedback-16-regular" />
  ),
  Graphics: (props: typeTemplate) => (
    <AppIcon {...props} icon="ph:pen-nib-light" />
  ),
  Design: (props: typeTemplate) => (
    <AppIcon {...props} icon="fluent-mdl2:design" />
  ),
};
export const Icons = {
  loading,
  check: Check,
};

export const iconVariants = cva("", {
  variants: {
    variant: {
      toolbar: "!h-4 !w-4",
      menuItem: "me-2 !h-4 !w-4 ",
    },
    size: {
      sm: "!h-3.5 !w-3.5 ",
      md: "!h-4 !w-4",
      lg: "!h-5 !w-5 ",
    },
  },
  defaultVariants: {},
});
