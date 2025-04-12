/* eslint-disable no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";

import { type Value } from "@udecode/slate";
import { Node } from "slate";

import AppLayout from "@/components/layout/AppLayout";
import useAppLayout from "@/components/layout/hook/useAppLayout";
import PageMindmap from "@/components/shared/PageMindmap";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEditorDrawer } from "@/hooks/useEditorDrawer";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";

import EditorSection from "./component/editor/editor-section";
import FormGenerateDocument from "./component/FormGenerateDocument";
import { defaultValueOfEditor } from "./hooks/generates-hook";
import {
  type selectedUUIdANdVersion,
  type typeinfoAfterGenerate,
  type typePropsCreateDocument,
  type typeUsePrompt,
} from "./types";

export const GenerateDocument = ({
  appName,
  searchParams,
  advanced = true,
  onCreatePrompt,
  btnTitle,
  placeHolderPrompt,
  translateLanguages = false,
  params,
}: typePropsCreateDocument) => {
  const { toggleOpen } = useAppLayout();
  const [editorValue, setEditorValue] = useState<Value>(defaultValueOfEditor);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [selectedUUID, setSelectedUUID] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const [infoAfterGenerate, setInfoAfterGenerate] =
    useState<typeinfoAfterGenerate>({
      prompt: "",
      documentName: "",
      audio: "",
      podcast: "",
      modelIcon: "",
    });
  const [onUsePrompt, setOnUsePrompt] = useState<typeUsePrompt>({
    value: "",
    key: 0,
  });

  useEffect(() => {
    if (selectedUUID && selectedUUID !== "") {
      toggleOpen(true);
    }
  }, [selectedUUID]);

  const { setQueryByRouter, queries } = useQueryParams();

  const afterGenerate = ({
    prompt,
    documentName,
    audio,
    podcast,
    modelIcon,
  }: typeinfoAfterGenerate) => {
    setInfoAfterGenerate({
      modelIcon:
        modelIcon === undefined ? infoAfterGenerate.modelIcon : modelIcon,
      prompt: prompt === undefined ? infoAfterGenerate.prompt : prompt,
      documentName:
        documentName === undefined
          ? infoAfterGenerate.documentName
          : documentName,
      audio: audio === undefined ? infoAfterGenerate.audio : audio,
      podcast: podcast === undefined ? infoAfterGenerate.podcast : podcast,
    });
  };

  const afterUpdate = ({
    version,
    uuid,
    audio,
    podcast,
  }: selectedUUIdANdVersion) => {
    if (queries.version !== version) {
      afterGenerate({
        audio,
        podcast,
      });

      setSelectedVersion(version);
      setQueryByRouter({ uuid: uuid, version: version });
    }
  };

  const setOnUsePromptFromEditor = (value: string) => {
    setOnUsePrompt({
      value,
      key: Date.now(),
    });
  };

  const {
    setIsFullscreenDrawer,
    isFullscreenDrawer,
    isOpen,
    onOpen,
    onClose,
    renderMenuComponent,
    defaultWidth,
    minWidth,
    maxWidth,
    mainDefaultWidth,
  } = useEditorDrawer<"mind-map">();

  return (
    <AppLayout>
      <AppLayout.side>
        <FormGenerateDocument
          onAftergenerate={afterGenerate}
          setIsGenerateing={setIsGenerating}
          selectedUUID={selectedUUID}
          setEditorValue={setEditorValue}
          setSelectedUUID={setSelectedUUID}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          params={params}
          appName={appName}
          searchParams={searchParams}
          advanced={advanced}
          onCreatePrompt={onCreatePrompt}
          btnTitle={btnTitle}
          placeHolderPrompt={placeHolderPrompt}
          translateLanguages={translateLanguages}
          onusePrompt={onUsePrompt}
        />
      </AppLayout.side>

      <AppLayout.body>
        <AppLayout.header
          history={{ type: appName }}
          profile
          workspace
          upgrade
        />
        <AppLayout.main style="content">
          <ResizablePanelGroup direction="horizontal" className="col">
            <ResizablePanel order={1} defaultSize={mainDefaultWidth}>
              <EditorSection
                afterUpdate={afterUpdate}
                selectedVersion={selectedVersion}
                infoAfterGenerate={infoAfterGenerate}
                selectedUUID={selectedUUID}
                initialValue={editorValue}
                readonly={isGenerating}
                appName={appName}
                setEditorValue={setEditorValue}
                setOnUsePrompt={setOnUsePromptFromEditor}
                setDrawerMenu={onOpen}
              />
            </ResizablePanel>
            <ResizableHandle className={isOpen ? "hidden" : ""} />
            <AppLayout.DrawerBLur />
            <ResizablePanel
              order={1}
              maxSize={maxWidth}
              minSize={minWidth}
              defaultSize={defaultWidth}
              className={cn(
                "transition-all duration-200 relative md-Drawchat",
                isOpen ? "" : "md-Drawchat-close",
              )}
            >
              {renderMenuComponent({
                "mind-map": (
                  <PageMindmap
                    documentName={infoAfterGenerate?.documentName || ""}
                    isOpen={isOpen}
                    onClose={onClose}
                    value={editorValue.reduce((acc, node) => {
                      return acc + Node.string(node) + " ";
                    }, "")}
                    isFullScreen={isFullscreenDrawer}
                    setIsFullScreen={setIsFullscreenDrawer}
                  />
                ),
              })}
            </ResizablePanel>
          </ResizablePanelGroup>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
};
