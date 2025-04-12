import { type HistoryAPIResponse } from "./HistoryAPI";

export interface ChatBotAPIRequest {
  startConversation: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    messages: [
      {
        content: string;
        role: string;
      },
      {
        content: string;
        role: string;
      },
    ];
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
  continueConversation: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    messages: [
      {
        content: string;
        role: string;
      },
    ];
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
  regenerateConversation: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
  saveChat: {
    chat_id: number;
    is_favorite: boolean;
  };
  likeOrDislike: {
    chat_id: number;
    like: string;
  };
  pinConversation: {
    history_uuid: string;
  };
  favConversation: {
    conversation_uuid: string;
  };
  deleteConversation: {
    history_uuid: string;
  };
}

export interface ChatBotAPIResponse {
  getSavedChats: Array<{
    id: number;
    uuid: string;
    role: string;
    text: string;
  }>;
  likeOrDislike: {
    id: number;
    like: "no_idea" | "like" | "dislike";
  };
  pinConversation: {
    uuid: string;
    favorite: boolean;
    pin: boolean;
    created_at: string;
  };
  favConversation: {
    uuid: string;
    favorite: boolean;
    pin: boolean;
    created_at: string;
  };
  conversationsofUser: HistoryAPIResponse["getAllAnswers"];
}
