import { type HTMLProps } from "react";

import { cn } from "@/lib/utils";

export default function Main({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <main
      style={{ height: "calc(100vh - var(--header-height))" }}
      className={cn("h-full w-full overflow-auto", className)}
      {...props}
    />
  );
}
