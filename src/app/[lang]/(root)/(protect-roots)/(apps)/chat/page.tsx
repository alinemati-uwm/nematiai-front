"use client";

// This directive is used in Next.js to indicate that the file should be treated as a client-side component.
import { useEffect } from "react";

import dynamic from "next/dynamic";

import { useChatbotStore } from "@/stores/zustand/chat";
import ChatLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/chat/loading";
import type { SCRPropsType } from "@/services/types";

// Dynamically import the ChatPage component, with a loading fallback component.
const ChatPage = dynamic(() => import("@/components/pages/chat"), {
  loading: () => <ChatLoading />,
});

function Chat({ searchParams, params }: SCRPropsType) {
  const resetConversation = useChatbotStore.use.resetConversation(); // Retrieve the function to reset the conversation from the Zustand store.

  useEffect(() => {
    return () => resetConversation(); // Reset the conversation on component unmount.
  }, []);

  // Render the ChatPage component with the provided params and searchParams.
  return <ChatPage params={params} searchParams={searchParams} />;
}

export default Chat;
