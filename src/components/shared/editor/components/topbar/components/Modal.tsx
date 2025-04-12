import React, { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface props {
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
}

function ImageEditorTopbarModal({ children, props }: props) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-y-3 bg-muted-dark border-muted-lighter p-5 px-3 rounded-md absolute right-1/2 translate-x-1/2 top-10 z-10 border",
        props?.className,
      )}
    >
      {children}
    </div>
  );
}

export default ImageEditorTopbarModal;
