import React, { useContext, type HTMLAttributes, type ReactNode } from "react";

import ImageEditorContext from "../../../context";

interface props {
  children: ReactNode;
  props?: HTMLAttributes<HTMLDivElement>;
}

function MobileToolsContainer({ children, props }: props) {
  const {
    states: {
      defaults: { darkTheme },
    },
  } = useContext(ImageEditorContext);

  return (
    <div
      {...props}
      className="bg-muted-dark h-8 cursor-pointer flex items-center px-2 rounded"
    >
      {children}
    </div>
  );
}

export default MobileToolsContainer;
