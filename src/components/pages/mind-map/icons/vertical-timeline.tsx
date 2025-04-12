import React from "react";

import { cn } from "@/lib/utils";

export const VerticalTimeline = ({ className }: { className?: string }) => {
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
          <path d="M10.783 13.02a.625.625 0 1 0 0-1.25H8.606a.625.625 0 1 0 0 1.25h2.177ZM11.408 7.94c0 .345-.28.625-.625.625H8.606a.625.625 0 0 1 0-1.25h2.177c.345 0 .625.28.625.625ZM10.783 4.11a.625.625 0 1 0 0-1.25H8.606a.625.625 0 1 0 0 1.25h2.177ZM6.55 1.125a.625.625 0 1 0-1.25 0v13.75a.625.625 0 1 0 1.25 0V1.125Z" />
        </g>
      </g>
    </svg>
  );
};

export default VerticalTimeline;
