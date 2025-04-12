import React, { type HTMLAttributes, type ReactNode } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

type props = {
  title: string;
  icon: ReactNode;
  onClick(): void;
  disable?: boolean;
  props?: HTMLAttributes<HTMLDivElement>;
  caption?: boolean;
};

function CaptionTopbar({
  icon,
  onClick,
  title,
  disable,
  props,
  caption,
}: props) {
  const { breakpoint } = useBreakpoint();

  return (
    <div
      onClick={onClick}
      {...props}
      className={cn(
        `flex flex-row select-none items-center gap-x-1 cursor-pointer ${disable ? "pointer-events-none opacity-50" : ""}`,
        props?.className,
      )}
    >
      {icon}
      {caption ? title : breakpoint !== "xs" ? title : null}
    </div>
  );
}

export default CaptionTopbar;
