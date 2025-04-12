import { useCallback, useRef, useState } from "react";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  useMutation,
  useQueryClient,
  type InvalidateQueryFilters,
} from "@tanstack/react-query";

import useErrorToast from "@/hooks/useErrorToast";
import { useWorkspaceStore } from "@/stores/zustand/workspace";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import { getApiBaseUrl } from "@/refactor_lib/services/api/v1";
import { type StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";
import { useStopResponding } from "@/services/general";

export interface UnsentMessageType {
  text: string;
  files: File[];
}

export type StreamParams = {
  invalidationQuery: InvalidateQueryFilters;
  endpoint: string;
  appType: AppsType;
  onMessage?: (data: any) => void;
  preventDefaultSetResponse?: boolean;
  onBeforeStart?: (val: boolean) => void;
  onPendingForStop?: (val: boolean) => void;
  onUnsentMessage?: (data: UnsentMessageType) => void;
  onSuccess?: () => void;
};

type MutationParams = {
  files?: File[];
  generate_data: StreamDynamicTypeAPI;
};

export default function useStream<T extends { dynamicQueryParams?: string }>({
  invalidationQuery,
  endpoint,
  appType,
  onMessage,
  preventDefaultSetResponse,
  onBeforeStart,
  onPendingForStop,
  onUnsentMessage,
  onSuccess,
}: StreamParams) {
  const queryClient = useQueryClient();
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const workspaceID = useWorkspaceStore.use.workspaceID();
  const [isSuccess, setIsSuccess] = useState(false);
  const [documentName, setDocumentName] = useState<string>("");
  const [modelIcon, setModelIcon] = useState<string>("");

  const [chats, setChats] = useState<number[] | null>([]);
  const [beforeStart, setBeforeStart] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>();
  const [messageOfUnsent, setMessageOfUnsent] = useState<UnsentMessageType>({
    text: "",
    files: [],
  });
  const [date, setDate] = useState<string>("");
  const [isPendingForStop, setIsPendingForStop] = useState<boolean>(false);

  const handleBeforeStart = (val: boolean) => {
    (onBeforeStart ? onBeforeStart : setBeforeStart)(val);
  };

  const handlePendingForStop = (val: boolean) => {
    (onPendingForStop ? onPendingForStop : setIsPendingForStop)(val);
  };

  const handleUnsentMessage = (data: UnsentMessageType) => {
    (onUnsentMessage ? onUnsentMessage : setMessageOfUnsent)(data);
  };

  const { showError } = useErrorToast();
  const { mutateAsync: stopGenerateMutate } = useStopResponding();

  const { mutate, ...props } = useMutation({
    async mutationFn(requestBody: MutationParams & T) {
      const session = LocalStorageManger.getUserSession();

      try {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        let fd: FormData | string;

        if (requestBody.files) {
          fd = new FormData();
          fd.append("generate_data", JSON.stringify(requestBody.generate_data));
          requestBody.files.forEach(file => {
            (fd as FormData).append("files", file);
          });
        } else {
          fd = JSON.stringify({
            workspace_id: workspaceID || session!.workspace.workspace.id,
            ...requestBody.generate_data,
          });
        }

        handleBeforeStart(true);

        const baseUrl = getApiBaseUrl();
        await fetchEventSource(
          baseUrl +
            endpoint +
            (requestBody.dynamicQueryParams
              ? requestBody.dynamicQueryParams
              : ""),
          {
            method: "POST",
            body: fd,
            headers: {
              Authorization: `Bearer ${session!.access_token}`,
            },
            signal,
            openWhenHidden: true,
            onmessage(event) {
              const data = JSON.parse(event.data || "{}");
              onMessage?.(data);
              if (!preventDefaultSetResponse) {
                const {
                  content,
                  conversation_uuid,
                  chats,
                  document_name,
                  created_at,
                  model_icon,
                } = data;
                if (content) setMessage(prev => prev + content);
                if (conversation_uuid) setConversationId(conversation_uuid);
                if (created_at) setDate(created_at);
                if (chats) setChats(chats);
                if (document_name) setDocumentName(document_name);
                if (model_icon) setModelIcon(model_icon);
              }
            },
            async onopen(res) {
              handleBeforeStart(false);

              if (res.status === 404) {
                const error = await res.json();
                throw new Error(
                  error.detail || "Resource not found (404). Aborting process.",
                );
              }
              if (!res.ok) {
                const error = await res.json();
                if (Array.isArray(error.detail)) {
                  throw new Error(
                    error?.detail?.[0]?.msg ||
                      `Server responded with ${res.status}`,
                  );
                } else {
                  throw new Error(
                    error.detail || `Server responded with ${res.status}`,
                  );
                }
              }
            },
            onerror(error) {
              if (requestBody.generate_data.message) {
                handleUnsentMessage({
                  text: requestBody.generate_data.message || "",
                  files: requestBody.files || [],
                });
              }
              handleBeforeStart(false);
              throw error; // Propagate error to catch block
            },
            onclose() {
              handleBeforeStart(false);
              handlePendingForStop(false);
            },
          },
        );

        return; // Exit loop if successful
      } catch (error: any) {
        handleBeforeStart(false);

        console.log("error is happening", error.message);

        // Check for 404 error explicitly
        if (error.message === "Subscription NOT found") {
          const errorMessage = error.message || "An unknown error occurred.";
          showError(errorMessage);
        } else {
          showError("error is happening: " + error.message);
        }
      }
    },
    onSuccess() {
      setIsSuccess(true);
      onSuccess?.();
      queryClient.invalidateQueries(invalidationQuery);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.all,
      });
    },
  });

  const resetMessage = useCallback(() => {
    setMessage("");
    setChats([]);
  }, []);

  if (isSuccess) {
    setConversationHistory(prev => [...prev, message]);
    setIsSuccess(false);
  }

  const generateStream = useCallback(
    (requestBody: MutationParams & T) => {
      resetMessage();
      mutate(requestBody);
    },
    [mutate, resetMessage],
  );

  const cancelStream = useCallback(
    async (type: string = "", abortFetch: boolean) => {
      handleBeforeStart(false);
      handlePendingForStop(true);

      if (abortFetch) {
        handleBeforeStart(false);
        handlePendingForStop(false);
        abortControllerRef.current?.abort();
      }
      try {
        stopGenerateMutate((type + appType) as AppsType);
      } catch (error) {
        console.log(error);
      }
    },
    [appType],
  );

  return {
    documentName,
    modelIcon,
    date,
    message,
    resetMessage,
    generateStream,
    cancelStream,
    conversationHistory,
    conversationId,
    chats,
    setChats,
    beforeStart,
    isPendingForStop,
    setIsPendingForStop,
    messageOfUnsent,
    ...props,
  };
}
