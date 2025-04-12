import React from "react";

import { cn } from "@/lib/utils";

export const Catalog = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g>
        <path
          fill="#55555D"
          d="M5.042 13a2.625 2.625 0 0 0 2.625 2.625H11a.625.625 0 1 0 0-1.25H7.667c-.76 0-1.375-.616-1.375-1.375v-2.43c.4.246.87.388 1.375.388H11a.625.625 0 1 0 0-1.25H7.667c-.76 0-1.375-.615-1.375-1.375v-2.43c.4.247.87.389 1.375.389H11a.625.625 0 1 0 0-1.25H7.667c-.76 0-1.375-.616-1.375-1.375V1a.625.625 0 1 0-1.25 0v12Z"
          data-follow-fill="#55555D"
        />
      </g>
    </svg>
  );
};

export default Catalog;
