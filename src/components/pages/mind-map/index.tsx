"use client";

import React, { useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import MindMapEditor from "@/components/pages/mind-map/mind-map-editor";
import MindMapGenerate from "@/components/pages/mind-map/mind-map-generate";
import Preview from "@/components/pages/mind-map/mind-map-preview";
import type { MindMapTab } from "@/components/pages/mind-map/types";
import { SetSearchParamProvider, Show } from "@/components/shared";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEditorDrawer } from "@/hooks/useEditorDrawer";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

const initValue = `
# Main Topic

## Branch 1
- Sub-branch 1.1
  - Leaf 1.1.1
  - Leaf 1.1.2
    - Nested Leaf 1.1.2.1
    - Nested Leaf 1.1.2.2
  - Leaf 1.1.3
- Sub-branch 1.2
  - Leaf 1.2.1
  - Leaf 1.2.2
    - Nested Leaf 1.2.2.1
    - Nested Leaf 1.2.2.2
- Sub-branch 1.3
  - Leaf 1.3.1
  - Leaf 1.3.2

## Branch 2
- Sub-branch 2.1
  - Leaf 2.1.1
  - Leaf 2.1.2
    - Nested Leaf 2.1.2.1
    - Nested Leaf 2.1.2.2
- Sub-branch 2.2
  - Leaf 2.2.1
  - Leaf 2.2.2
- Sub-branch 2.3
  - Leaf 2.3.1
  - Leaf 2.3.2
    - Nested Leaf 2.3.2.1
    - Nested Leaf 2.3.2.2

## Branch 3
- Sub-branch 3.1
  - Leaf 3.1.1
  - Leaf 3.1.2
    - Nested Leaf 3.1.2.1
    - Nested Leaf 3.1.2.2
- Sub-branch 3.2
  - Leaf 3.2.1
  - Leaf 3.2.2
- Sub-branch 3.3
  - Leaf 3.3.1
  - Leaf 3.3.2
    - Nested Leaf 3.3.2.1
    - Nested Leaf 3.3.2.2

## Branch 4
- Sub-branch 4.1
  - Leaf 4.1.1
  - Leaf 4.1.2
    - Nested Leaf 4.1.2.1
    - Nested Leaf 4.1.2.2
- Sub-branch 4.2
  - Leaf 4.2.1
  - Leaf 4.2.2
- Sub-branch 4.3
  - Leaf 4.3.1
  - Leaf 4.3.2
    - Nested Leaf 4.3.2.1
    - Nested Leaf 4.3.2.2

## Branch 5
- Sub-branch 5.1
  - Leaf 5.1.1
  - Leaf 5.1.2
    - Nested Leaf 5.1.2.1
    - Nested Leaf 5.1.2.2
- Sub-branch 5.2
  - Leaf 5.2.1
  - Leaf 5.2.2
- Sub-branch 5.3
  - Leaf 5.3.1
  - Leaf 5.3.2
    - Nested Leaf 5.3.2.1
    - Nested Leaf 5.3.2.2
`;

const MindMapPage = () => {
  const [value, setValue] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [resized, setResized] = useState(0);
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();

  const onSubmit = (text: string, activeTab: MindMapTab, file?: File) => {
    setValue(initValue);
    setShowPreview(true);
  };

  const documentName = "My mind map";

  const {
    setIsFullscreenDrawer,
    isFullscreenDrawer,
    onOpen,
    isOpen,
    defaultWidth,
    minWidth,
    maxWidth,
    mainDefaultWidth,
    onClose,
  } = useEditorDrawer<"code">("code", "sm");

  return (
    <AppLayout>
      <AppLayout.body>
        <AppLayout.header
          history={{ type: "mind-map" }}
          // title={dictionary.mind_map_label}
          profile
          workspace
          upgrade
          roadmap
        />
        <AppLayout.main style={showPreview ? "content" : "full"}>
          <SetSearchParamProvider appName="app" appSearchParamValue="mind-map">
            <ResizablePanelGroup direction="horizontal" className="col">
              <ResizablePanel order={1} defaultSize={mainDefaultWidth}>
                <Show>
                  <Show.When isTrue={showPreview}>
                    <Preview
                      value={value}
                      documentName={documentName}
                      onClose={() => {
                        setShowPreview(false);
                        onClose();
                      }}
                      openEditor={() => onOpen()}
                      fitDependencies={[isFullscreenDrawer, isOpen, resized]}
                      setValue={setValue}
                    />
                  </Show.When>
                  <Show.Else>
                    <MindMapGenerate onSubmit={onSubmit} />
                  </Show.Else>
                </Show>
              </ResizablePanel>
              <ResizableHandle
                className={
                  isOpen && !isFullscreenDrawer
                    ? "mx-3 bg-holder-dark"
                    : "hidden"
                }
              />
              <ResizablePanel
                onResize={() => setResized(resized + 1)}
                order={1}
                maxSize={maxWidth}
                minSize={minWidth}
                defaultSize={defaultWidth}
                className={cn(
                  "transition-all duration-200 relative",
                  isOpen ? "" : "md-Drawchat-close",
                )}
              >
                <MindMapEditor
                  title={documentName}
                  value={value}
                  onChange={setValue}
                  onClose={onClose}
                  isFullScreen={isFullscreenDrawer}
                  setIsFullScreen={setIsFullscreenDrawer}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
};

export default MindMapPage;
