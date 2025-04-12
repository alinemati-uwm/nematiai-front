"use client";

import React, { useState } from "react";

import { cn, withRef } from "@udecode/cn";
import {
  useCodeBlockComboboxState,
  useCodeBlockElementState,
} from "@udecode/plate-code-block/react";
import { PlateElement } from "@udecode/plate-common/react";
import { AlertCircleIcon } from "lucide-react";

import RenderIf from "@/components/shared/RenderIf";

import { CodeBlockCombobox } from "./code-block-combobox";
import { CodeBlockDisplayOption } from "./code-block-display-options";

import "./code-block-element.css";

import MermaidPreview from "./mermaid-preview";

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });
    const comboState = useCodeBlockComboboxState();
    const [activePanZoom, setActivePanZoom] = useState(false);
    const [isValidMermaid, setIsValidMermaid] = useState(true);

    return (
      <>
        <PlateElement
          ref={ref}
          className={cn("relative py-1", state.className, className)}
          {...props}
          style={{
            ...props.style,
            marginLeft: "0",
          }}
        >
          <div className="p-2  bg-muted flex gap-2 flex-col ">
            <div className="flex flex-row justify-end" contentEditable={false}>
              <CodeBlockDisplayOption
                activePanZoom={activePanZoom}
                setActivePanZoom={setActivePanZoom}
              />
              {state.syntax && (
                <div className="z-10 select-none">
                  <CodeBlockCombobox />
                </div>
              )}
            </div>

            <RenderIf isTrue={element.typeOption !== "prev"}>
              <pre className="overflow-x-auto bg-card rounded-md p-4 font-mono text-sm leading-[normal] [tab-size:2] relative">
                <code>{children}</code>
                <RenderIf
                  isTrue={comboState.value === "mermaid" && !isValidMermaid}
                >
                  <AlertCircleIcon className="text-red-500 absolute top-2 right-2" />
                </RenderIf>
              </pre>
            </RenderIf>

            <RenderIf
              isTrue={
                comboState.value === "mermaid" && element.typeOption !== "code"
              }
            >
              <div className="overflow-x-auto  font-mono text-sm leading-[normal] [tab-size:2]">
                <MermaidPreview
                  element={element}
                  rough={!!element.rough}
                  activePanZoom={activePanZoom}
                  isValidMermaid={isValidMermaid}
                  setIsValidMermaid={setIsValidMermaid}
                />
              </div>
            </RenderIf>
          </div>
        </PlateElement>
      </>
    );
  },
);
