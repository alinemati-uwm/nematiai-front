import React from "react";

import { cn } from "@/lib/utils";

export const FishBone = ({ className }: { className?: string }) => {
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
          d="M6.927 4.671c.29.187.374.573.188.864L5.718 7.708h2.714l1.832-2.85a.625.625 0 1 1 1.051.677L9.918 7.708h4.749a.625.625 0 1 1 0 1.25h-2.895l1.403 2.182a.625.625 0 1 1-1.052.676l-1.837-2.858H7.465l1.402 2.182a.625.625 0 0 1-1.051.676L5.979 8.958H1.333a.625.625 0 1 1 0-1.25h2.899l1.831-2.85a.625.625 0 0 1 .864-.187Z"
          data-follow-fill="#55555D"
        />
      </g>
    </svg>
  );
};

export default FishBone;
