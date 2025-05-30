import React from "react";

import { cn } from "@/lib/utils";

export const Organization = ({ className }: { className?: string }) => {
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
          <path d="M15 14.875a.667.667 0 0 0 .667-.667v-.666a.667.667 0 0 0-.667-.667h-.4V8.062a2.6 2.6 0 0 0-2.6-2.6H8.6V4.397a.6.6 0 0 0-1.2 0v1.067H4a2.6 2.6 0 0 0-2.6 2.6v4.812H1a.667.667 0 0 0-.667.667v.666c0 .368.299.667.667.667h2a.667.667 0 0 0 .667-.667v-.666A.667.667 0 0 0 3 12.875h-.4V8.062a1.4 1.4 0 0 1 1.4-1.4h3.4v6.213H7a.667.667 0 0 0-.667.667v.666c0 .368.299.667.667.667h2a.667.667 0 0 0 .667-.667v-.666A.667.667 0 0 0 9 12.875h-.4V6.662H12a1.4 1.4 0 0 1 1.4 1.4v4.813H13a.667.667 0 0 0-.667.667v.666c0 .368.299.667.667.667h2ZM9.667 2.396A.667.667 0 0 1 9 3.063H7a.667.667 0 0 1-.667-.667v-.667c0-.368.299-.667.667-.667h2c.368 0 .667.299.667.667v.667Z" />
        </g>
      </g>
    </svg>
  );
};

export default Organization;
