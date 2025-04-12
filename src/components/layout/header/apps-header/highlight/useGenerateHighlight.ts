import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import type { HighlightItemsType } from "@/components/layout/header/apps-header/highlight/types";
import useStreamHighlight from "@/refactor_lib/hooks/mutations/useStreamHighlight";

interface UseGenerateHighlightProps {
  text: string;
  item: HighlightItemsType;
  setItemsToGenerate: Dispatch<SetStateAction<HighlightItemsType[]>>;
  setItemTexts: (text: string) => void;
  setIsStreaming: (value: boolean) => void;
  setItemStreamResponse: (text: string) => void;
}

export function useGenerateHighlight({
  text,
  item,
  setItemsToGenerate,
  setItemTexts,
  setIsStreaming,
  setItemStreamResponse,
}: UseGenerateHighlightProps) {
  const {
    mutate: generateHighlight,
    responseMessage,
    isPending: isPendingStreaming,
  } = useStreamHighlight();
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (isSuccessful) {
      setItemTexts(responseMessage);
      setIsSuccessful(false);
    }
  }, [isSuccessful]);

  useEffect(() => {
    if (responseMessage) {
      setItemStreamResponse(responseMessage);
    }
  }, [responseMessage]);

  const generateHighlightFunc = () => {
    setItemStreamResponse("");
    setIsStreaming(true);
    generateHighlight(
      {
        body: {
          message: text,
          model: "gpt-4o-mini",
          prompt_context: { type: item.name.toLowerCase() },
          prompt_type: "highlight",
          setting: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.2,
            top_p: 1,
          },
        },
      },
      {
        onSettled() {
          setIsStreaming(false);
          setTimeout(() => {
            setItemsToGenerate([]);
          }, 600);
        },
        onSuccess() {
          setIsSuccessful(true);
        },
      },
    );
  };
  return { generateHighlightFunc, responseMessage, isPendingStreaming };
}
