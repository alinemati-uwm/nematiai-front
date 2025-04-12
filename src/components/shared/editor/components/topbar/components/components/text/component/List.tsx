import React, { useContext, type ReactNode } from "react";

import ImageEditorContext from "@/components/shared/editor/context";

type props = {
  children: ReactNode;
};

function TextToolsList({ children }: props) {
  const {
    states: {
      defaults: { darkTheme },
    },
  } = useContext(ImageEditorContext);

  return (
    <div
      className={`flex flex-row items-center px-1 ${darkTheme ? "border-gray-500" : ""} border p-2 rounded-sm justify-between`}
    >
      {children}
    </div>
  );
}

export default TextToolsList;
