import { useCallback, useRef, useState } from "react";

import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

import {
  type createFetchEventSourceClientV1,
  type StreamGeneratorProps,
} from "@/refactor_lib/services/api/v1";
import { useStopResponding } from "@/services/general";

import useToaster from "../shared/useToaster";

function useStreamMutation<RequestBodyType>({
  mutationFn: inputMutationFunction,
  appType,
  queryInvalidationFn,
  onSuccess,
}: {
  mutationFn: ReturnType<
    typeof createFetchEventSourceClientV1<RequestBodyType>
  >;
  appType: AppsType;
  queryInvalidationFn?: (queryClient: QueryClient) => void;
  onSuccess?: () => void;
}) {
  const { toaster } = useToaster();
  const queryClient = useQueryClient();
  const abortControllerRef = useRef(new AbortController());
  const [responseMessage, setResponseMessage] = useState("");
  const [documentName, SetDocumentName] = useState("");
  const [modelIcon, setModelIcon] = useState("");
  const [isPendingForStop, setIsPendingForStop] = useState<boolean>(false);
  const { mutateAsync: stopGenearteMutate } = useStopResponding();

  const [UUID, setUUID] = useState("");

  const onMessageDataHandler = (data: any) => {
    const { content, history_uuid, document_name, model_icon } = data;
    if (history_uuid) {
      setUUID(history_uuid);
    }
    if (document_name) {
      SetDocumentName(document_name);
    }
    if (model_icon) {
      setModelIcon(model_icon);
    }
    if (!content) return;
    setResponseMessage(prev => {
      return prev + content;
    });
  };

  const stopGeneration = useCallback(
    async (abortFetch: boolean) => {
      setIsPendingForStop(true);

      if (abortFetch) {
        setIsPendingForStop(false);
        abortControllerRef.current?.abort();
      }
      try {
        stopGenearteMutate(appType as AppsType);
      } catch (error) {
        console.log(error);
      }
    },
    [appType],
  );

  const onClose = () => {
    setIsPendingForStop(false);
  };

  const mutation = useMutation({
    mutationFn: async ({
      body,
      headers,
      queryParams,
    }: Omit<
      StreamGeneratorProps<RequestBodyType>,
      "abortController" | "onMessageDataHandler"
    >) => {
      return inputMutationFunction({
        body,
        headers,
        queryParams,
        onMessageDataHandler,
        onClose,
        abortController: abortControllerRef.current,
      });
    },
    retry: 0,
    onMutate: () => {
      setResponseMessage("");
    },
    onError: err => {
      toaster({
        toastProps: {
          type: "error",
          message: err.message,
        },
      });
    },
    onSuccess: () => {
      if (queryInvalidationFn) queryInvalidationFn(queryClient);
      onSuccess?.();
    },
  });

  return {
    ...mutation,
    responseMessage,
    stopGeneration,
    isPendingForStop,
    documentName,
    modelIcon,
    UUID,
  };
}

export default useStreamMutation;
