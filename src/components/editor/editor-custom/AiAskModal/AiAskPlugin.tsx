"use client";

import React, { useEffect } from "react";

import { createPlatePlugin, useEditorState } from "@udecode/plate-core/react";

import { useGetDictionary } from "@/hooks";

import AiAskModal from "./AiAskModal";

// Extract the render function to a component
const AiAskModalComponent = () => {
  const editor = useEditorState();
  const {
    components: { editor: dictionary },
  } = useGetDictionary();

  const { showModal, inputTextRef, selectionText, inputQuestionref } =
    editor.useOptions(AiAskPlugin, options => {
      return {
        showModal: options.showModal,
        inputTextRef: options.inputTextRef,
        selectionText: options.selectionText,
        inputQuestionref: options.inputQuestionref,
      };
    });

  useEffect(() => {
    if (showModal) {
      if (inputTextRef?.current) {
        inputTextRef.current.innerHTML = selectionText;
      }
      if (inputQuestionref?.current) {
        inputQuestionref.current.focus();
      }
    }
  }, [showModal]);

  useEffect(() => {}, []);

  return (
    <div className={showModal ? " " : " hidden "}>
      <AiAskModal>
        <AiAskModal.Title>{dictionary.ask_ai_title}</AiAskModal.Title>
      </AiAskModal>
    </div>
  );
};

export const keyOfPluginAskAi = "askai";
type typeInitialPosition = {
  x: number;
  y: number;
};
export const AiAskPlugin = createPlatePlugin({
  key: keyOfPluginAskAi,
  options: {
    message: "Default message",
    boxRef: null as React.RefObject<HTMLDivElement | null> | null,
    inputTextRef: null as React.RefObject<HTMLDivElement | null> | null,
    inputQuestionref: null as React.RefObject<HTMLInputElement | null> | null,
    selectionText: "" as string,
    counter: 1,
    showModal: false,
    initialPosition: { x: 0, y: 0 } as typeInitialPosition,
  },
  render: {
    afterEditable: () => {
      return <AiAskModalComponent />;
    },
  },
});
