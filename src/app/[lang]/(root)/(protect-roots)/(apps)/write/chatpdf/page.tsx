"use client";

import { useEffect } from "react";

import dynamic from "next/dynamic";

import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useChatbotStore } from "@/stores/zustand/chat";
import ChatPdfLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/chatpdf/loading";
import type { SCRPropsType } from "@/services/types";

const ChatWithPdf = dynamic(() => import("@/components/pages/chat-pdf"), {
  loading: () => <ChatPdfLoading />,
});

export default function ChatPdf({ searchParams, params }: SCRPropsType) {
  const selectedEngine = useFormStore.use.setSelectedEngine(); // Retrieve the function to set the selected engine from the Zustand store.
  const resetConversation = useChatbotStore.use.resetConversation(); // Retrieve the function to reset the conversation from the Zustand store.

  useEffect(() => {
    selectedEngine(""); // Clear the selected engine on component mount.

    return () => {
      resetConversation(); // Reset the conversation on component unmount.
      selectedEngine(""); // Clear the selected engine on component unmount.
    };
  }, []);
  return <ChatWithPdf params={params} searchParams={searchParams} />;
}
