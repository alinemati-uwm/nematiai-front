import React, { useEffect, useState } from "react";

import { useEditorState } from "@udecode/plate-common/react";

import useAiOptionStorage from "@/components/editor/editor-custom/AiOptions/useAiOptionStorage";
import { useInsertAiResult } from "@/components/editor/editor-custom/hook/useInsertAiResult";
import AppIcon from "@/components/shared/AppIcon";
import useDraggComponent from "@/hooks/useDraggComponent";
import { useGetDictionary } from "@/hooks";

import AiAskResponse from "../AiAskModal/AiAskResponse";
import useAskQuestion from "../hook/useAskQuestion";
import { AiOptionPlugin } from "./AiOptionPlugin";
import AiOptionRequestForm from "./AiOptionRequestForm";
import AiOptionsSelectedType from "./AiOptionsSelectedType";

export function AiOptionModal() {
  const editor = useEditorState();
  const [inputText, setInputText] = useState<string>("");
  const [engine, setEngine] = useState<string>("");
  const { selectedAction } = useAiOptionStorage();

  const {
    components: { editor: dictionary },
  } = useGetDictionary();

  const { showModal, initialPosition, selectedOption } = editor.useOptions(
    AiOptionPlugin,
    options => ({
      showModal: options.showModal,
      initialPosition: options.initialPosition,
      selectionText: options.selectionText,
      selectedOption: options.selectedAction.selectedOption,
    }),
  );

  const {
    generateAction,
    responseMessage,
    isStreaming,
    handleRegenerate,
    setCurrentAnswerIndex,
    currentAnswerIndex,
    answersList,
    reset,
    stopGeneration,
  } = useAskQuestion();

  const { handleInsert, handleReplace } = useInsertAiResult(
    answersList[currentAnswerIndex],
  );

  const { onMouseDown, componentRef, position } = useDraggComponent({
    initialPosition: initialPosition,
    initialSize: { width: 400, height: 350 },
  });

  const handleGenerate = () => {
    if (!selectedAction) return;
    generateAction(selectedAction, engine, inputText);
  };

  const onRegenerate = () => {
    handleRegenerate(engine);
  };

  useEffect(() => {
    if (showModal) {
      const selectText = editor.selection
        ? editor.string(editor.selection)
        : "";
      editor.setOptions(AiOptionPlugin, {
        selectionText: selectText,
      });

      if (answersList.length === 0 && !isStreaming && !!selectText) {
        setInputText(selectText);
        if (!selectedAction) return;
        generateAction(
          {
            ...selectedAction,
            selectedOption: selectedOption || selectedAction.selectedOption,
          },
          engine,
          selectText,
        );
      }
    } else {
      reset();
    }
  }, [editor.selection, showModal]);

  //close modal with an escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        editor.setOption(AiOptionPlugin, "showModal", false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className={` ${showModal ? "" : "hidden"} fixed  top-0 left-0 z-[100] shadow-lg border rounded bg-popover w-full max-w-md`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        onMouseDown={onMouseDown}
        className="flex cursor-move justify-between items-center p-2 border-b"
      >
        <div className="flex flex-row whitespace-nowrap items-center">
          {dictionary.ai_option_title}
          <AiOptionsSelectedType />
        </div>

        <AppIcon
          onClick={() => {
            editor.setOption(AiOptionPlugin, "showModal", false);
          }}
          icon="material-symbols:close-rounded"
          className="w-5 h-5 text-label-light cursor-pointer "
        />
      </div>

      <div className=" p-2 flex gap-2 flex-col">
        <AiOptionRequestForm
          inputText={inputText}
          engine={engine}
          setEngine={setEngine}
          handleGenerate={handleGenerate}
          setInputText={setInputText}
          handleStop={stopGeneration}
          isStreaming={isStreaming}
        />
        <AiAskResponse
          onRegenerate={onRegenerate}
          messageText={responseMessage}
          isStreaming={isStreaming}
          index={currentAnswerIndex}
          setIndex={setCurrentAnswerIndex}
          allAnswers={answersList}
          handleReplace={handleReplace}
          handleInsert={handleInsert}
        />
      </div>
    </div>
  );
}
