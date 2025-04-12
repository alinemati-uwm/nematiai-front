import React, { type ReactNode, type RefObject } from "react";

function ExplorerContainer({
  children,
  ref,
}: {
  children: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={ref}
      className="w-[95%] relative max-w-[850px] pb-18 m-auto scrollbar"
    >
      {children}
    </div>
  );
}

export default ExplorerContainer;
