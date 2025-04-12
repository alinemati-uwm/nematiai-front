"use client";

import React from "react";

import { cn, withRef } from "@udecode/cn";
import {
  useComposedRef,
  useEditorId,
  useEditorRef,
  useEventEditorSelectors,
} from "@udecode/plate-common/react";
import {
  flip,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
  type FloatingToolbarState,
} from "@udecode/plate-floating";

import { keyOfPluginAskAi } from "../editor/editor-custom/AiAskModal/AiAskPlugin";
import { keyOfPluginAiOption } from "../editor/editor-custom/AiOptions/AiOptionPlugin";
import { Toolbar } from "./toolbar";

export type typeReturnGetInfo = {
  selectionText: string;
};

export type FloatingToolbarProps = (
  getInfo: () => typeReturnGetInfo,
) => React.ReactNode;

export const FloatingToolbar = withRef<
  typeof Toolbar,
  {
    state?: FloatingToolbarState;
    renderChildren: FloatingToolbarProps;
  }
>(({ children, state, renderChildren, ...props }, componentRef) => {
  const editor = useEditorRef();
  const editorId = useEditorId();
  const focusedEditorId = useEventEditorSelectors.focus();
  const isFloatingLinkOpen = !!editor.useOption({ key: "a" }, "mode");
  const isAIChatOpen = editor.useOption({ key: "aiChat" }, "open");
  //comment: add by Nerd
  const isAiAskModalPlugin = editor.useOption(
    { key: keyOfPluginAskAi },
    "showModal",
  );
  const isAiOptionMenuPlugin = editor.useOption(
    { key: keyOfPluginAiOption },
    "showModal",
  );
  const isAiOptionModalPlugin = editor.useOption(
    { key: keyOfPluginAiOption },
    "showMenu",
  );

  const floatingToolbarState = useFloatingToolbarState({
    editorId,
    focusedEditorId,
    hideToolbar:
      isFloatingLinkOpen ||
      isAIChatOpen ||
      isAiAskModalPlugin ||
      isAiOptionMenuPlugin ||
      isAiOptionModalPlugin,
    floatingOptions: {
      middleware: [
        offset(12),
        flip({
          fallbackPlacements: [
            "top-start",
            "top-end",
            "bottom-start",
            "bottom-end",
          ],
          padding: 12,
        }),
      ],
      placement: "top",
      ...state?.floatingOptions,
    },
  });

  const {
    clickOutsideRef,
    hidden,
    props: rootProps,
    ref: floatingRef,
  } = useFloatingToolbar(floatingToolbarState);

  const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef);

  if (hidden) return null;

  return (
    <div ref={clickOutsideRef}>
      <Toolbar
        ref={ref}
        className={cn(
          "absolute z-50 overflow-x-auto whitespace-nowrap rounded-md border bg-popover p-1 opacity-100 shadow-md scrollbar-hide print:hidden",
          "max-w-[80vw]",
        )}
        {...rootProps}
        {...props}
      >
        {renderChildren(() => {
          return {
            selectionText: floatingToolbarState.selectionText,
          };
        })}
      </Toolbar>
    </div>
  );
});
