import { useEffect, useRef, useState } from "react";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import useStreamMutation from "@/refactor_lib/hooks/mutations/useStreamMutation";
import StreamDynamicAPI from "@/refactor_lib/services/api/v1/StreamDynamicAPI";
import type { StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";

/**
 * Custom hook to handle the humanize mutation.
 * It manages the state and handles the mutation logic for the humanize feature.
 *
 * @returns object The hook returns an object containing various state variables and functions to handle the humanize mutation.
 */
export const useHumanizeMutation = () => {
  // State to store the output value
  const [outputValue, setOutputValue] = useState("");
  // State to store the input value
  const [inputValue, setInputValue] = useState("");
  // Ref for the output textarea element
  const outputRef = useRef<HTMLTextAreaElement>(null);
  // State to track the success of the mutation
  const [isSuccess, setIsSuccess] = useState(false);
  // const selectedEngine = useFormStore.use.selectedEngine();

  // Destructure various functions and state variables from the useStreamMutation hook
  const {
    stopGeneration,
    mutateAsync,
    isPending,
    responseMessage,
    isPendingForStop,
  } = useStreamMutation<StreamDynamicTypeAPI>({
    appType: "humanize",
    mutationFn: StreamDynamicAPI.generate("/ai_writer/generate_ai_writer/"),
    queryInvalidationFn: queryClient => {
      // Invalidate the history API query to update the history list
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.getHistories("humanize"),
      });
    },
    onSuccess: () => setIsSuccess(true),
  });

  // Effect to handle the success state and update the output value
  useEffect(() => {
    if (isSuccess) {
      setOutputValue(responseMessage);
      outputRef.current?.focus();
      setIsSuccess(false);
    }
  }, [isSuccess]);

  /**
   * Function to handle the humanize mutation.
   * It resets the output value and triggers the mutation with the provided message and style.
   *
   * @param {string} message - The message to be humanized.
   * @param {string} style - The style to be applied to the humanized message.
   */
  const handleHumanize = async (message: string, style: string) => {
    setOutputValue("");
    await mutateAsync({
      body: {
        app_type: "humanize",
        message,
        model: "gpt-4o-mini",
        prompt_context: { style },
        prompt_type: "humanize",
        setting: {
          frequency_penalty: 0,
          presence_penalty: 0,
          temperature: 0.2,
          top_p: 1,
        },
      },
    });
  };

  return {
    handleHumanize,
    isPendingForStop,
    stopGeneration,
    isPending,
    responseMessage,
    outputValue,
    setOutputValue,
    inputValue,
    setInputValue,
    outputRef,
  };
};
