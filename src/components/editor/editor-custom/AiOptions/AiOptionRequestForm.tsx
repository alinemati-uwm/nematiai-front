import React, { useRef } from "react";

import { MinimalButton } from "@/components/shared";
import AppModelSelector from "@/components/shared/modelSelector/AppModelSelector";
import { promptVariant } from "@/components/ui/variants";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { cn } from "@/lib/utils";
import type { StateSetterType } from "@/services/types";

interface IProps {
  setInputText: StateSetterType<string>;
  engine: string;
  inputText: string;
  setEngine: StateSetterType<string>;
  handleGenerate: () => void;
  isStreaming: boolean;
  handleStop: () => void;
}

export default function AiOptionRequestForm({
  setInputText,
  engine,
  setEngine,
  inputText,
  handleGenerate,
  isStreaming,
  handleStop,
}: IProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, inputText);
  const onSubmit = () => {
    (isStreaming ? handleStop : handleGenerate)();
  };

  return (
    <div className="flex flex-col gap-4 py-1">
      <div>
        <textarea
          rows={1}
          className={cn(
            promptVariant({ color: "input", variant: "prompt" }),
            "max-h-32 min-h-10 w-full",
          )}
          ref={textAreaRef}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-2">
        <AppModelSelector
          formMode
          appType="GENERAL"
          setting={false}
          model={{
            value: engine,
            onChange(model) {
              setEngine(model.value);
            },
          }}
        />
        <div>
          <MinimalButton
            onClick={onSubmit}
            variant="fill"
            disabled={!isStreaming && !inputText.trim()}
            icon={isStreaming ? "tabler:player-stop" : "mdi:arrow-up"}
          />
        </div>
      </div>
    </div>
  );
}
