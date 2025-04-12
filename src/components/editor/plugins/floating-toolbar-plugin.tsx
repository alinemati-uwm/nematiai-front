"use client";

import { createPlatePlugin } from "@udecode/plate-common/react";

import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";

export const FloatingToolbarPlugin = createPlatePlugin({
  key: "floating-toolbar",
  render: {
    afterEditable: () => (
      <FloatingToolbar
        renderChildren={getInfo => <FloatingToolbarButtons getInfo={getInfo} />}
      ></FloatingToolbar>
    ),
  },
});
