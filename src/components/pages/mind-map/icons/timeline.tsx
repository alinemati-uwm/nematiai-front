import React from "react";

import { cn } from "@/lib/utils";

export const Timeline = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g>
        <g fill="#55555D" data-follow-fill="#55555D">
          <path d="M4.11 5.863a.625.625 0 1 0-1.25 0V8.04a.625.625 0 1 0 1.25 0V5.863ZM1.125 10.096a.625.625 0 1 0 0 1.25h13.75a.625.625 0 1 0 0-1.25H1.125ZM7.94 5.238c.345 0 .625.28.625.625V8.04a.625.625 0 0 1-1.25 0V5.863c0-.345.28-.625.625-.625ZM13.02 5.863a.625.625 0 1 0-1.25 0V8.04a.625.625 0 0 0 1.25 0V5.863Z" />
        </g>
      </g>
    </svg>
  );
};

export default Timeline;
