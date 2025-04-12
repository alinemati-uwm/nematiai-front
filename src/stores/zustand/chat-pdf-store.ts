import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

interface ChatPdfMutations {
  addMessage: (role: "user" | "assistant", message: string) => void;
  conversation: { role: "user" | "assistant"; message: string }[];
}
interface ChatPdfState {
  conversation: { role: "user" | "assistant"; message: string }[];
}
const initialState: ChatPdfState = {
  conversation: [],
};

const usePdfChat = create<ChatPdfMutations>()(
  devtools(
    immer<ChatPdfMutations>((set, get) => ({
      ...initialState,
      addMessage: (role: "user" | "assistant", message: string) => {
        set(state => {
          const newMsg = { role, message };
          state.conversation.push(newMsg);
        });
      },
    })),
    { name: "chatPDF", store: "chatPDF" },
  ),
);

export const useChatPdfStore = createSelectors(usePdfChat);
