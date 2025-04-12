import React, { useEffect, useRef, useState } from "react";

import { useEditorState } from "@udecode/plate-common/react";

import { useInsertAiResult } from "@/components/editor/editor-custom/hook/useInsertAiResult";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import useDraggComponent from "@/hooks/useDraggComponent";

import useAskQuestion from "../hook/useAskQuestion";
import { AiAskPlugin } from "./AiAskPlugin";
import AiAskResponse from "./AiAskResponse";
import AiAskSelectedText from "./AiAskSelectedText";
import AiAskSendForm from "./AiAskSendForm";

function AiAskModal({ children }: { children: React.ReactNode }) {
  const editor = useEditorState();

  const inputTextRef = useRef<HTMLDivElement>(null);
  const selectionText = editor.useOption(AiAskPlugin, "selectionText");

  const {
    askQuestion,
    isStreaming,
    handleRegenerate,
    currentAnswerIndex,
    setCurrentAnswerIndex,
    answersList,
    responseMessage,
    reset,
    stopGeneration,
  } = useAskQuestion();
  const { handleInsert, handleReplace } = useInsertAiResult(
    answersList[currentAnswerIndex],
  );

  const [inputText, setInputText] = useState<string>("");
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const [engine, setEngine] = useState<string>("");

  useEffect(() => {
    const select = editor.selection;
    editor.setOptions(AiAskPlugin, {
      selectionText: select ? editor.string(select) : "",
    });
  }, [editor.selection]);

  const { showModal, initialPosition } = editor.useOptions(
    AiAskPlugin,
    options => ({
      showModal: options.showModal,
      initialPosition: options.initialPosition,
    }),
  );

  //custom hook for handling dragging the opened modal
  const { onMouseDown, componentRef, position } = useDraggComponent({
    initialPosition: initialPosition,
    initialSize: { width: 550, height: 350 },
  });

  useEffect(() => {
    if (showModal) {
      setInputText(selectionText);
    } else {
      setInputQuestion("");
      reset();
    }
  }, [showModal]);

  const onRegenerate = () => {
    handleRegenerate(engine);
  };

  //close modal with an escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        editor.setOption(AiAskPlugin, "showModal", false);
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
      className="fixed top-0 left-0 z-[100] shadow-lg border rounded bg-popover w-full max-w-xl"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        onMouseDown={onMouseDown}
        className="row cursor-move justify-between p-2 border-b"
      >
        {children}
        <AppIcon
          onClick={() => {
            editor.setOption(AiAskPlugin, "showModal", false);
          }}
          icon="material-symbols:close-rounded"
          className="w-5 h-5 text-label-light cursor-pointer "
        />
      </div>
      <div className="px-2 py-4 flex flex-col gap-4">
        <RenderIf isTrue={!!selectionText}>
          <AiAskSelectedText
            setInputText={setInputText}
            inputTextRef={inputTextRef}
          />
        </RenderIf>

        <AiAskSendForm
          engine={engine}
          setEngine={setEngine}
          handleGenerate={askQuestion}
          inputText={inputText}
          inputQuestion={inputQuestion}
          setInputQuestion={setInputQuestion}
          isStreaming={isStreaming}
          handleStop={stopGeneration}
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

export default AiAskModal;

AiAskModal.Title = function AiAskModalBoxTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <label className=" text-muted-foreground">{children}</label>;
};
