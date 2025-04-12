import React from "react";

import { cn } from "@/lib/utils";

export const Logical = ({ className }: { className?: string }) => {
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
          d="M7.042 4.667a3.292 3.292 0 0 1 3.291-3.292H14a.625.625 0 1 1 0 1.25h-3.667a2.042 2.042 0 0 0-2.041 2.042v.666c0 .726-.19 1.376-.627 2.042H14a.625.625 0 1 1 0 1.25H7.665c.437.666.627 1.316.627 2.042v.666c0 1.128.914 2.042 2.041 2.042H14a.625.625 0 1 1 0 1.25h-3.667a3.292 3.292 0 0 1-3.291-3.292v-.666c0-.63-.198-1.218-.973-2.042H2a.625.625 0 1 1 0-1.25h4.07c.774-.824.972-1.413.972-2.042v-.666Z"
          data-follow-fill="#55555D"
        />
      </g>
    </svg>
  );
};

export default Logical;
