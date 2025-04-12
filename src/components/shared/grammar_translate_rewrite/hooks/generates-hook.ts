"use client";

import { useEffect, useRef } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import useStreamMutation from "@/refactor_lib/hooks/mutations/useStreamMutation";
import StreamDynamicAPI from "@/refactor_lib/services/api/v1/StreamDynamicAPI";
import { type StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";

import { type TypeHandleGeneratedData } from "../types";

export const defaultValueOfEditor = [
  {
    children: [{ text: "" }],
    type: "p",
  },
];

export const createValueEditor = (response: string) => {
  return [
    {
      children: [{ text: response }],
      type: "p",
    },
  ];
};

export const useHandleGeneratedData = ({
  beforeGenerate,
  appName,
  setSelectedUUID,
  setEditorValue,
  setSelectedVersion,
  afterGenerate,
}: TypeHandleGeneratedData) => {
  const lock = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { setQueryByRouter } = useQueryParams();

  const reset = () => {
    setSelectedVersion("");

    setEditorValue(defaultValueOfEditor);
    setSelectedUUID("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const {
    UUID,
    mutate: generate,
    isPending: isPendingGenerate,
    responseMessage,
    stopGeneration: onCancel,
    documentName: documentNameAfterGenerate,
    modelIcon: modelIconAfterGenerate,
    isPendingForStop,
  } = useStreamMutation({
    appType: appName,
    mutationFn: StreamDynamicAPI.generate("/ai_writer/generate_ai_writer/"),
    queryInvalidationFn: queryClient => {
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.getHistories(appName),
      });
    },
  });

  useEffect(() => {
    if (UUID && documentNameAfterGenerate) {
      afterGenerate({
        documentName: documentNameAfterGenerate,
        modelIcon: modelIconAfterGenerate,
      });
      lock.current = false;
    }
  }, [UUID, documentNameAfterGenerate]);

  useEffect(() => {
    if (UUID) {
      setSelectedUUID(UUID);
      setQueryByRouter({ uuid: UUID }, ["version"]);
    }
  }, [UUID]);

  useEffect(() => {
    if (responseMessage) {
      setEditorValue(createValueEditor(responseMessage));
    }
  }, [responseMessage]);

  const handelGenerate = (body: StreamDynamicTypeAPI) => {
    if (!lock.current) {
      lock.current = true;
      reset();
      beforeGenerate();
      generate(
        {
          body: {
            ...body,
            app_type: appName,
          },
        },
        {
          onSettled: () => {
            lock.current = false;
          },
        },
      );
    }
  };

  const stopGenerate = (abortFetch: boolean) => {
    lock.current = false;
    void onCancel(abortFetch);
  };
  return {
    isPendingGenerate,
    handelGenerate,
    stopGenerate,
    isPendingForStop,
  };
};
