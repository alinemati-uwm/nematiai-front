import type { JSX } from "react";

export interface ChatDrawer {
  show?: boolean;
  active?: "editor" | "document" | "mindmap" | "humanize";
  editor?: {
    text: string;
    title: string;
    codeLanguage?: string;
    component?: "code" | "text";
  };
}

export interface Conversation {
  id: number;
  role: "user" | "assistant";
  text: string;
  viewFiles?: JSX.Element;
  files?: [];
  like?: "like" | "dislike" | "no_idea";
  created_at?: string;
  answer: Conversation[];
  model_icon?: string | null;
}

export interface AddMessageInput {
  role: "user" | "assistant";
  text: string;
  viewFiles?: JSX.Element;
  chatId?: number[] | null;
  date?: string;
  modelIcon?: string | null;
}

export interface UpdateMessageIdInput {
  chatIds: number[];
  date?: string;
  modelIcon?: string | null;
}

export interface UpdateRegeneratedMessageIdInput
  extends Omit<UpdateMessageIdInput, "chatIds"> {
  chatId: number;
}

export interface AddRegeneratedMessageInput {
  text: string;
  chatId?: number[] | null;
  date?: string;
  modelIcon?: string | null;
}

export interface ChatbotState {
  conversations: Conversation[];
  drawerInfo: ChatDrawer;
  currentMessage: string;
  lastChatId: number;
  regeneratedMessageId: number;
  isStreaming: boolean;
  conversationUUID: string;
  beforeStart: boolean;
  documentName: string;
  isPendingForStop: boolean;
  isEditMessageOfUser: boolean;
  messageOfUnsent: { text: string; files: File[] };
}

export interface ChatbotActions {
  setDrawerInfo: (val: ChatDrawer) => void;
  setIsPendingForStop: (value: boolean) => void;
  setBeforeStart: (value: boolean) => void;
  setDocumentName: (value: string) => void;
  setLastChatId: (id: number) => void;
  addMessage: (input: AddMessageInput) => void;
  removeChatFromConversation: () => void;
  updateMessageId: (input: UpdateMessageIdInput) => void;
  updateRegeneratedMessageId: (input: UpdateRegeneratedMessageIdInput) => void;
  addRegeneratedMessage: (input: AddRegeneratedMessageInput) => void;
  setRegeneratedMessageId: (id: number) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  resetConversation: () => void;
  setConversation: (conversation: Conversation[]) => void;
  setConversationUUID: (uuid: string) => void;
  setIsEditMessageOfUser: (val: boolean) => void;
  setMessageOfUnsent: (val: { text: string; files: File[] }) => void;
}

// Zustand Store
export type ChatbotStore = ChatbotState & ChatbotActions;
