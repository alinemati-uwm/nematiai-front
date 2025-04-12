import React, { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type props = {
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
};

function ImageEditorCard({ children, props }: props) {
  return (
    <div
      {...props}
      className={cn("bg-muted-dark rounded p-4", props?.className)}
    >
      {children}
    </div>
  );
}

export default ImageEditorCard;
