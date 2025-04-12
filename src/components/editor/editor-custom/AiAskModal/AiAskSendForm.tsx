import React, { useEffect, useRef } from "react";

import { useEditorState } from "@udecode/plate-common/react";

import { MinimalButton } from "@/components/shared";
import AppModelSelector from "@/components/shared/modelSelector/AppModelSelector";
import { Input } from "@/components/ui/input";

import { type AskInput } from "../hook/useAskQuestion";
import { AiAskPlugin } from "./AiAskPlugin";

interface IProps {
  inputText: string;
  setInputQuestion: React.Dispatch<React.SetStateAction<string>>;
  inputQuestion: string;
  handleGenerate: (val: AskInput) => void;
  engine: string;
  setEngine: React.Dispatch<React.SetStateAction<string>>;
  isStreaming: boolean;
  handleStop: () => void;
}

export default function AiAskSendForm({
  inputText,
  setInputQuestion,
  inputQuestion,
  handleGenerate,
  engine,
  setEngine,
  isStreaming,
  handleStop,
}: IProps) {
  const editor = useEditorState();
  const inputQuestionref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputQuestionref) {
      editor.setOption(AiAskPlugin, "inputQuestionref", inputQuestionref);
    }
  }, []);

  const onSubmit = () => {
    if (isStreaming) {
      handleStop();
    } else {
      handleGenerate({
        model: engine,
        message: `
			${inputQuestion} 
			here is the text: ${inputText}
			`,
      });
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="w-24 max-w-24">
        <AppModelSelector
          appType="GENERAL"
          formMode
          setting={false}
          model={{
            value: engine,
            onChange(model) {
              setEngine(model.value);
            },
          }}
        />
      </div>
      <Input
        className="w-full border rounded p-2"
        type="text"
        value={inputQuestion}
        placeholder="Ask your question!"
        onChange={e => setInputQuestion(e.target.value)}
        ref={inputQuestionref}
      />

      <div>
        <MinimalButton
          onClick={onSubmit}
          variant="fill"
          disabled={!isStreaming && !inputQuestion.trim()}
          icon={isStreaming ? "tabler:player-stop" : "mdi:arrow-up"}
        />
      </div>
    </div>
  );
}
