"use client";

import React, { useEffect, useState } from "react";

import { type Value } from "@udecode/slate";
import { Node } from "slate";

import AppLayout from "@/components/layout/AppLayout";
import {
  createValueEditor,
  defaultValueOfEditor,
} from "@/components/shared/grammar_translate_rewrite/hooks/generates-hook";
import PageMindmap from "@/components/shared/PageMindmap";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEditorDrawer } from "@/hooks/useEditorDrawer";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import type { SCRPropsType } from "@/services/types";

import HistoryBox from "./component/HistoryBox";
import { ModalHistoryDocument } from "./component/ModalHistoryDocument";
import PageEditor from "./component/PageEditor";
import { useLoadDetailsforDocument } from "./useLoadDetailsforDocument";
import { useManageInfoInDocuemnt } from "./useManageInfoInDocuemnt";

interface IProps extends SCRPropsType {
  callFromOtherPage?: boolean;
  initialValue?: string;
}

/**
 * The `DocumentPage` component is responsible for rendering the document page with an editor and history box.
 * It conditionally renders different layouts based on whether it is called from another page or not.
 *
 * @param {SCRPropsType & { callFromOtherPage?: boolean }} props - The properties passed to the component.
 * @param {boolean} [props.callFromOtherPage] - A flag indicating if the component is called from another page.
 *
 * @returns JSX.Element The rendered document page component.
 *
 * @component
 * @example
 * // Example usage:
 * <DocumentPage params={params} searchParams={searchParams} callFromOtherPage={true} />
 */
const DocumentPage = ({ callFromOtherPage, initialValue }: IProps) => {
  const [editorValue, setEditorValue] = useState<Value>(defaultValueOfEditor);
  const [showModalHistoryDocument, setShowModalHistoryDocument] =
    useState<boolean>(false);
  const { setQueryByRouter } = useQueryParams();

  useEffect(() => {
    if (
      initialValue &&
      JSON.stringify(editorValue) === JSON.stringify(defaultValueOfEditor)
    ) {
      setEditorValue(createValueEditor(initialValue));
    }
  }, [initialValue, editorValue]);

  const {
    aftergenerate,
    setInfoForLeavePage,
    beforeChangeDocument,
    afterUpdate,
    setFlagNewDocuemnt,
    selectedUUID,
    setSelectedUUID,
    selectedVersion,
    setSelectedVersion,
    infoAfterGenerate,
    keyEditor,
  } = useManageInfoInDocuemnt();

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
    renderMenuComponent,
  } = useEditorDrawer<"mind-map">();

  const { isPending: isPendingWhenLoadDetailsByQuery } =
    useLoadDetailsforDocument({
      selectedUUID,
      setSelectedUUID,
      selectedVersion,
      setSelectedVersion,
      setEditorValue,
      onAftergenerate: aftergenerate,
    });

  const addHandler = () => {
    setQueryByRouter({}, ["version", "uuid"]);
    setSelectedUUID("");
    setEditorValue(defaultValueOfEditor);
    aftergenerate({ documentName: "" });
    setFlagNewDocuemnt(true);
    return;
  };

  const historyBox = (
    <HistoryBox
      callFromOtherPage={callFromOtherPage}
      setEditorValue={setEditorValue}
      setSelectedUUID={setSelectedUUID}
      selectedUUID={selectedUUID}
      onAftergenerate={aftergenerate}
      beforeChangeDocument={beforeChangeDocument}
      setFlagNewDocuemnt={setFlagNewDocuemnt}
      isPendingWhenLoadDetailsByQuery={isPendingWhenLoadDetailsByQuery}
      addHandler={() => addHandler()}
    />
  );

  const pageeditor = (
    <PageEditor
      afterUpdate={afterUpdate}
      key={keyEditor}
      setInfoForLeavePage={setInfoForLeavePage}
      infoAfterGenerate={infoAfterGenerate}
      selectedUUID={selectedUUID}
      editorValue={editorValue}
      setEditorValue={setEditorValue}
      selectedVersion={selectedVersion}
      setDrawerMenu={onOpen}
      onClickHistoryInEditor={() => {
        setShowModalHistoryDocument(true);
      }}
    />
  );

  if (callFromOtherPage) {
    return (
      <>
        <ModalHistoryDocument
          selectedUUID={selectedUUID}
          beforeChangeDocument={beforeChangeDocument}
          show={showModalHistoryDocument}
          addHandler={() => addHandler()}
          setShow={setShowModalHistoryDocument}
        />
        <div
          id="elijon"
          className=" md:flex-row-reverse w-full h-full flex  gap-0 relative "
        >
          <div className="flex-1 h-full max-w-[100%] ">{pageeditor}</div>
        </div>
      </>
    );
  }

  return (
    <AppLayout>
      <AppLayout.side size="small">{historyBox}</AppLayout.side>
      <AppLayout.body>
        <AppLayout.header profile workspace upgrade />
        <AppLayout.main style="content">
          <ResizablePanelGroup direction="horizontal" className="col">
            <ResizablePanel order={1} defaultSize={mainDefaultWidth}>
              {pageeditor}
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

export default DocumentPage;
