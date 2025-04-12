import React, { type ReactNode } from "react";

type props = {
  children: ReactNode;
  active: boolean;
};

function TextToolsContainer({ active, children }: props) {
  return (
    <div
      className={`${active ? "bg-muted-lighter" : ""} p-0.5 md:p-1 rounded-sm`}
    >
      {children}
    </div>
  );
}

export default TextToolsContainer;
