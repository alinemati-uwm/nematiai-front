"use client";

import { useContext, useEffect, useState } from "react";

import { type Value } from "@udecode/slate";
import Image from "next/image";

import HighlightSheet from "@/components/layout/header/apps-header/highlight/highlight-sheet";
import { useDrawerInfo } from "@/components/pages/chat/hooks/useDrawerInfo";
import AppIcon from "@/components/shared/AppIcon";
import { DocumentEditorContext } from "@/components/shared/grammar_translate_rewrite/component/editor/context";
import { MinimalButton } from "@/components/shared/MinimalButtton";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { extractTextWithSpacing } from "@/lib/utils";
import { useEditorContext } from "@/stores/contexts/useEditorContext";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

import InputDocumentName from "../../../InputDocumentName";
import type { DrawerMenu, typeinfoAfterGenerate } from "../../types";
import { downloadDropdownItems } from "./constants";
import { useHandleCopyAndDownloadAction } from "./useHandleCopyAndDownloadAction";

function InputAndSelectSpace({
  selectedUUID = "",
  infoAfterGenerate,
  appName,
}: {
  selectedUUID: string;
  infoAfterGenerate: typeinfoAfterGenerate;
  appName: AppsType;
}) {
  return (
    <div className="flex flex-1 gap-3  max-w-[220px]">
      <InputDocumentName
        justEdit={true}
        value={infoAfterGenerate.documentName}
        appName={appName}
        uuid={selectedUUID}
      />
    </div>
  );
}

function DownloadAndSaveButtons({
  onClickHistoryInEditor,
  setDrawerMenu,
}: {
  onClickHistoryInEditor?: () => void;
  setDrawerMenu?: (val: DrawerMenu) => void;
}) {
  const {
    components: { editor_section },
  } = useGetDictionary();

  const { textareaEditorDivRef } = useEditorContext();

  const [handleCopy] = useCopyTextInClipBoard();

  const { handleDownloadPdf, handleDownloadDocx, copyToClipboard } =
    useHandleCopyAndDownloadAction(textareaEditorDivRef);

  const isFullScreen = useEditorStore.use.isFullScreen();
  const toggleFullScreen = useEditorStore.use.toggleFullScreen();
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const historyUpdateIsPending = useHistoryStore.use.historyUpdateIsPending();
  const historyUpdateIsSuccess = useHistoryStore.use.historyUpdateIsSuccess();
  useEffect(() => {
    historyUpdateIsPending && setShowIcon(true);
    if (!historyUpdateIsPending) {
      setTimeout(() => {
        setShowIcon(false);
      }, 3000);
    }
  }, [historyUpdateIsPending]);

  const { drawerInfo, close: closeDraw } = useDrawerInfo();

  const historyUpdateIsError = useHistoryStore.use.historyUpdateIsError();

  const { valueEditor } = useContext(DocumentEditorContext);
  const { text } = useContext(DocumentEditorContext);
  const aCtionOFCopyOrDownload = {
    editor_header_copy_text_without_style: () => {
      if (valueEditor && Array.isArray(valueEditor) && valueEditor[0]) {
        handleCopy(
          extractTextWithSpacing(valueEditor[0] as unknown as Value, true),
        );
      }
    },
    editor_header_copy_text_with_style: () => {
      copyToClipboard();
    },
    editor_header_copy_html: () => {
      if (textareaEditorDivRef.current) {
        const editorDiv = textareaEditorDivRef.current;
        const content = editorDiv.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const buttons = doc.querySelectorAll("button[data-state=\"closed\"]");
        buttons.forEach(button => {
          if (button.parentNode) {
            button.parentNode.removeChild(button);
          }
        });

        handleCopy(doc.documentElement.innerHTML);
      }
    },
    editor_header_down_pdf: () => {
      handleDownloadPdf();
    },
    editor_header_down_word: () => {
      handleDownloadDocx();
    },
  };

  const dropdownItems = downloadDropdownItems.map(item => (
    <DropdownMenuItem
      key={item.title}
      onClick={() => {
        aCtionOFCopyOrDownload[item.title]();
      }}
      className="flex gap-2"
    >
      <AppIcon icon={item.Icon} />
      {editor_section[item.title]}
    </DropdownMenuItem>
  ));

  return (
    <div className="flex gap-2 items-center">
      <div>
        {historyUpdateIsPending && (
          <AppIcon
            icon="ant-design:loading-outlined"
            width={14}
            className="animate-spin text-label-light"
          />
        )}
        {historyUpdateIsSuccess && showIcon && (
          <AppIcon
            icon="ic:baseline-check"
            width={14}
            className="text-label-light"
          />
        )}
        {historyUpdateIsError && showIcon && (
          <AppIcon
            icon="iconoir:xmark"
            width={14}
            className="text-label-light"
          />
        )}
        {text && text.length > 0 && <HighlightSheet />}
      </div>

      <RenderIf isTrue={!!setDrawerMenu}>
        <Button
          onClick={() => setDrawerMenu?.("mind-map")}
          size="sm"
          variant="outline"
        >
          <AppIcon icon="material-symbols:graph-3" />
          {editor_section.mind_map}
        </Button>
        {/*<MinimalButton*/}
        {/*    onClick={() => setDrawerMenu?.("mind-map")}*/}
        {/*    size="xs"*/}
        {/*    icon="material-symbols:graph-3"*/}
        {/*></MinimalButton>*/}
      </RenderIf>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MinimalButton
            element="div"
            icon="mdi:download-circle-outline"
            size="xs"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full" align="end" alignOffset={-40}>
          <DropdownMenuGroup>{dropdownItems}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {drawerInfo.show && (
        <MinimalButton
          onClick={() => {
            onClickHistoryInEditor && onClickHistoryInEditor();
          }}
          size="xs"
          icon="material-symbols:history"
        />
      )}

      <MinimalButton
        size="xs"
        icon={
          isFullScreen
            ? "material-symbols:close-fullscreen-rounded"
            : "material-symbols:open-in-full-rounded"
        }
        className="max-md:hidden"
        onClick={toggleFullScreen}
      />

      {drawerInfo.show && (
        <MinimalButton
          size="xs"
          icon="material-symbols:close-rounded"
          onClick={() => {
            closeDraw();
          }}
        />
      )}
    </div>
  );
}

export default function EditorSectionHeader({
  selectedUUID,
  infoAfterGenerate,
  setOnUsePrompt,
  onClickHistoryInEditor,
  appName = "ai_writer",
  setDrawerMenu,
}: {
  selectedUUID: string;
  infoAfterGenerate: typeinfoAfterGenerate;
  setOnUsePrompt: (val: string) => void;
  onClickHistoryInEditor?: () => void;
  appName: AppsType;
  setDrawerMenu?: (val: DrawerMenu) => void;
}) {
  const { common } = useGetDictionary();

  return (
    <div>
      <div className="flex justify-between gap-2 px-4 pb-1 pt-2 flex-row ">
        <InputAndSelectSpace
          infoAfterGenerate={infoAfterGenerate}
          selectedUUID={selectedUUID}
          appName={appName}
        />
        <DownloadAndSaveButtons
          onClickHistoryInEditor={onClickHistoryInEditor}
          setDrawerMenu={setDrawerMenu}
        />
      </div>
      <div className='"flex flex-row text-small text-[#747474] justify-between px-4'>
        {infoAfterGenerate.prompt && (
          <div
            className={`${infoAfterGenerate.prompt !== "" ? " flex flex-row border-b items-center pb-2 mb-1" : ""} `}
          >
            <div className="relative h-5 w-5  overflow-hidden rounded-full ">
              <Image src={infoAfterGenerate.modelIcon || ""} alt="dsds" fill />
            </div>
            <div className="flex justify-center p-1 max-w-[100%] md:max-w-[360px] items-center ">
              <label className="truncate text-label-foreground">
                {infoAfterGenerate.prompt}
              </label>
            </div>

            <div
              onClick={() => {
                if (infoAfterGenerate.prompt)
                  setOnUsePrompt(infoAfterGenerate.prompt);
              }}
              className="flex justify-center items-center p-1 rounded-sm cursor-pointer hover:text-primary hover:bg-primary-lighter bg-primary-lighter text-primary"
            >
              {common.use}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
