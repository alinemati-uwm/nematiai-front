import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

function ModelSelectorFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col border shadow-lg w-full p-4 bg-muted-light rounded",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ModelSelectorFrame;
