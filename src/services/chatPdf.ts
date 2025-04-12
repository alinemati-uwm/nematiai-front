"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosClient from "@/services/axios-client";

type AIWritersParams = {
  generate_data: {
    text: string;
  };
} & OpenAiCompletionParams;

interface FileType {
  id: number;
  file: string;
  title: string;
}

export interface StartConvWithPdfResponse {
  uuid: string;
  favorite: boolean;
  created_at: string; // ISO date string
  files: FileType[];
}

export function useStartConvWithPdf() {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const { mutate, ...other } = useMutation({
    mutationFn: async ({ file, url }: { file?: File; url?: string }) => {
      const fd = new FormData();
      file && fd.append("files", file);
      url && fd.append("conversation_data", JSON.stringify({ url }));
      const { data } = await axiosClient.post<StartConvWithPdfResponse>(
        "/chat_pdf/conversation/",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            setUploadProgress(percentCompleted);
          },
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-pdf"] }); // Invalidate the query to trigger a refetch
      setUploadProgress(null);
    },
  });
  return {
    mutate,
    uploadProgress,
    ...other,
  };
}

export interface ChatPDFHistoryItemsResponse {
  pins: { uuid: string; created_at: string }[];

  conversations: {
    title: string;
    uuid: string;
    favorite: boolean;
    created_at: string;
    files: getPdfs[];
  }[];
}

export function useGetUploadedPDFsForChatPDF() {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["uploaded-pdf"],
    async queryFn() {
      const { data } = await axiosClient.get<ChatPDFHistoryItemsResponse>(
        "/chat_pdf/history_of_user_conversation",
      );
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}

export function useDeleteChatPDFConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      conversation_uuid,
    }: {
      conversation_uuid: string;
    }) => {
      const { data } = await axiosClient.delete<Version>(
        "/chat_pdf/delete_conversation",
        {
          data: { conversation_uuid },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploaded-pdf"] }); // Invalidate the query to trigger a refetch
    },
  });
}
