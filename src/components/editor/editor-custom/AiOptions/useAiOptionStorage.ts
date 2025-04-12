import { useEffect, useState } from "react";

import { useEditorState } from "@udecode/plate-common/react";

import { AiOptionPlugin } from "@/components/editor/editor-custom/AiOptions/AiOptionPlugin";
import { aiActions } from "@/components/editor/editor-custom/constants";
import type { AIAction } from "@/components/editor/editor-custom/types";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

const STORAGE_KEY = "ai_action_storage";

export default function useAiOptionStorage() {
  const [aiActionsList, setAiActionsList] = useState<AIAction[]>([]);
  const { toaster } = useToaster();
  const editor = useEditorState();

  useEffect(() => {
    const list = localStorage.getItem(STORAGE_KEY);
    if (list) {
      setAiActionsList(JSON.parse(list));
    } else {
      setAiActionsList(aiActions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(aiActions));
    }
  }, []);

  const setSetting = (id: string, value: Partial<AIAction>) => {
    const newList = aiActionsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...value,
        };
      }
      return item;
    });
    setAiActionsList(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  const setSelectedAction = (id: string, value?: string) => {
    editor.setOptions(AiOptionPlugin, {
      selectedAction: {
        id,
        selectedOption: value,
      },
    });
  };

  const setSelectedOption = (id: string, value: string) => {
    setSetting(id, { selectedOption: value });
    setSelectedAction(id, value);
  };

  const setPin = (id: string, value: boolean) => {
    const pinCount = aiActionsList.filter(item => item.isPin).length;

    if (value && pinCount >= 3) {
      return toaster({
        toastProps: {
          type: "warning",
          message: "You can't pin more than 3 items.",
        },
      });
    }
    setSetting(id, { isPin: value });
  };

  const { selectedActionData } = editor.useOptions(AiOptionPlugin, options => ({
    selectedActionData: options.selectedAction,
  }));

  const selectedAction = aiActionsList.find(
    item => item.id === selectedActionData?.id,
  );

  return {
    setPin,
    setSetting,
    aiActionsList,
    selectedAction,
    setSelectedOption,
    setSelectedAction,
  };
}
