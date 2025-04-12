import React from "react";

import { cn } from "@/lib/utils";

export const EdgeShape3 = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 33 32"
    >
      <g>
        <g fill="#000" data-follow-fill="#000">
          <path d="M31.25 5a1.25 1.25 0 1 0-1.5-2L14.083 14.75h-2.25a1.25 1.25 0 1 0 0 2.5h2.25L29.75 29a1.25 1.25 0 1 0 1.5-2l-13-9.75H30.5a1.25 1.25 0 0 0 0-2.5H18.25l13-9.75ZM3.833 14c-.736 0-1.333.597-1.333 1.333v1.334c0 .736.597 1.333 1.333 1.333h4c.737 0 1.334-.597 1.334-1.333v-1.334c0-.736-.597-1.333-1.334-1.333h-4Z" />
        </g>
      </g>
    </svg>
  );
};

export default EdgeShape3;
