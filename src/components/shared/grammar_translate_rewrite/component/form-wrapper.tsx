"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import type { ChildrenProps } from "@/services/types";

/**
 * FormWrapper  component
 * @param className - class name
 * @param children
 * @constructor
 */
function FormWrapper({
  className,
  children,
}: ChildrenProps<{ className?: string }>) {
  const isFullScreenEditor = useEditorStore.use.isFullScreen();
  return (
    <div
      className={cn(
        "gap-form flex flex-col bg-holder-lighter w-full",
        isFullScreenEditor && " hidden ",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default FormWrapper;
