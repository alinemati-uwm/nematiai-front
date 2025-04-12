import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {
  ChatbotState,
  ChatbotStore,
  Conversation,
} from "@/stores/zustand/chat/types";
import { createSelectors } from "@/stores/zustand/createSelectors";

const initialState: ChatbotState = {
  drawerInfo: { show: false },
  conversations: [],
  currentMessage: "",
  lastChatId: -2,
  regeneratedMessageId: -100,
  isStreaming: false,
  conversationUUID: "",
  beforeStart: false,
  documentName: "",
  isPendingForStop: false,
  isEditMessageOfUser: false,
  messageOfUnsent: { text: "", files: [] },
};

const useChatbotSlice = create<ChatbotStore>()(
  devtools(
    immer<ChatbotStore>((set, get) => ({
      ...initialState,

      addMessage: ({ role, text, viewFiles, chatId = [], date, modelIcon }) => {
        let newChatAssistantId = -2;
        let newChatUserId = -1;
        if (chatId && chatId.length != 0) {
          newChatAssistantId = chatId.slice(-2)[1];
          newChatUserId = chatId.slice(-2)[0];
          get().updateMessageId({ chatIds: chatId.slice(-2), date, modelIcon });
        }

        const newMessage: Conversation = {
          role,
          viewFiles,
          text,
          id: newChatUserId,
          answer: [],
          created_at: date,
        };

        set(state => {
          if (state.conversations.length === 0) {
            state.conversations.push(newMessage);
          } else {
            const addAnswer = ({
              conversation,
            }: {
              conversation: Conversation[];
            }) => {
              conversation.forEach(conversation => {
                const parent = conversation;

                if (!parent || !parent.answer) return;
                if (role === "user" && parent.id === state.lastChatId) {
                  parent.answer.push(newMessage);
                  return;
                } else {
                  if (role === "assistant") {
                    if (parent.id === newChatUserId) {
                      const newMsg = {
                        ...newMessage,
                        id: newChatAssistantId,
                        model_icon: modelIcon,
                      };
                      if (parent.answer.length === 0) {
                        parent.answer = [newMsg];
                      } else {
                        parent.answer[0].text = text;
                        parent.answer[0].created_at = date;
                        parent.answer[0].model_icon = modelIcon;
                      }
                      return;
                    }
                  }
                }

                if (parent.answer && parent.answer.length) {
                  addAnswer({ conversation: parent.answer });
                }
              });
            };

            addAnswer({ conversation: state.conversations });
          }
        });
      },
      removeChatFromConversation: () => {
        set(state => {
          const remove = ({
            conversations,
          }: {
            conversations: Conversation[];
          }) => {
            let shouldStop = false;
            conversations.forEach(conversation => {
              if (shouldStop) return;

              const linearRecursive = (linearConv: Conversation) => {
                const parent = linearConv;

                if (!parent || !parent.answer) return;

                if (parent.id === -1 && parent.role === "user") {
                  state.conversations = [];
                  shouldStop = true;
                  return;
                }

                const answer = parent.answer;
                const index = answer.findIndex(eachAnswer => {
                  return eachAnswer.id === -1 && eachAnswer.role === "user";
                });

                if (index !== -1) {
                  answer.splice(index, 1);
                  shouldStop = true;
                  return;
                }

                remove({ conversations: answer });
              };
              linearRecursive(conversation);
            });
          };

          remove({ conversations: state.conversations });
        });
      },
      updateMessageId: ({ chatIds, date, modelIcon }) => {
        set(state => {
          const findParentAndUpdate = (conversations: Conversation[]) => {
            conversations.forEach(conversation => {
              const parent = conversation;
              if (!parent || !parent.answer) return;
              const answer = parent.answer;

              if (parent.id === -1) {
                parent.id = chatIds[chatIds.length - 2];
                parent.created_at = date;
              }
              if (parent.id === -2) {
                parent.id = chatIds[chatIds.length - 1];
                parent.created_at = date;
                parent.model_icon = modelIcon;
              }

              if (parent.answer && parent.answer.length > 0)
                findParentAndUpdate(answer);
            });
          };
          findParentAndUpdate(state.conversations);
        });
      },
      updateRegeneratedMessageId: ({ chatId, date, modelIcon }) => {
        set(state => {
          const findRegeneratedMessageUpdateId = (
            conversation: Conversation[],
          ) => {
            conversation.forEach(conversation => {
              const parent = conversation;
              if (!parent || !parent.answer) return;

              if (parent.id === -10) {
                parent.id = chatId;
                parent.created_at = date;
                parent.model_icon = modelIcon;
                return;
              }

              if (parent.answer.length > 0) {
                findRegeneratedMessageUpdateId(parent.answer);
              }
            });
          };
          findRegeneratedMessageUpdateId(state.conversations);
        });
      },
      addRegeneratedMessage: ({ text, chatId = [], date, modelIcon }) => {
        let nowIdChatAssistant = -10;

        if (chatId && chatId.length !== 0) {
          nowIdChatAssistant = chatId.slice(-1)[0];
          get().updateRegeneratedMessageId({
            chatId: nowIdChatAssistant,
            date: date,
            modelIcon: modelIcon,
          });
        }

        set(state => {
          const findRegeneratedParent = (conversation: Conversation[]) => {
            conversation.forEach(conversation => {
              const parent = conversation;
              if (!parent || !parent.answer) return;
              const answer = parent.answer;

              const itsParent = answer.filter(
                answer => answer.id === state.regeneratedMessageId,
              );

              if (itsParent.length === 1) {
                const newRegenExist = answer.filter(
                  answer => answer.id === nowIdChatAssistant,
                );

                if (newRegenExist.length === 0) {
                  const newMsg = {
                    role: "assistant" as const,
                    text,
                    id: nowIdChatAssistant,
                    answer: [] as Conversation[],
                    created_at: date,
                    model_icon: modelIcon,
                  };

                  parent.answer.push(newMsg);
                  return;
                }
              }

              if (parent.id === nowIdChatAssistant) {
                parent.text = text;
              }

              if (parent.answer.length !== 0) {
                findRegeneratedParent(answer);
                if (chatId && chatId.length !== 0) {
                  nowIdChatAssistant = chatId.slice(-1)[0];

                  get().updateRegeneratedMessageId({
                    chatId: nowIdChatAssistant,
                    date: date,
                    modelIcon: modelIcon,
                  });
                }
              }
            });
          };
          findRegeneratedParent(state.conversations);
        });
      },
      setLastChatId: id => {
        set(state => {
          state.lastChatId = id;
        });
      },
      setBeforeStart: value => {
        set(state => {
          state.beforeStart = value;
        });
      },
      setRegeneratedMessageId: id => {
        set(state => {
          state.regeneratedMessageId = id;
        });
      },
      setIsStreaming: isStreaming => {
        set(state => {
          state.isStreaming = isStreaming;
        });
      },
      resetConversation: () => {
        set(state => {
          //reset states
          state.isPendingForStop = false;
          state.conversations = [];
          state.lastChatId = -2;
          state.currentMessage = "";
          state.conversationUUID = "";
          state.regeneratedMessageId = -100;
          state.isStreaming = false;
          state.documentName = "";
        });
      },
      setConversation: convFromHistory => {
        set(state => {
          //reset states
          const conversation = convFromHistory;

          //find last responses and add answer[] property
          const findNoAnswerFiled = (conversations: Conversation[]) => {
            conversations.forEach((conversation: Conversation) => {
              const linearRecursive = (linearConv: Conversation) => {
                const parent = linearConv;
                if (!parent) return;
                if (!parent.answer) parent.answer = [];
                if (parent.answer) {
                  if (parent.answer.length === 1) {
                    linearRecursive(parent.answer[0]);
                  }
                  if (parent.answer.length > 1) {
                    findNoAnswerFiled(parent.answer);
                  }
                }
              };
              linearRecursive(conversation);
            });
          };
          findNoAnswerFiled(conversation);
          state.conversations = conversation;

          if (convFromHistory.length === 0) {
            state.lastChatId = -2;
          }
        });
      },
      setConversationUUID: uuid => {
        set(state => {
          state.conversationUUID = uuid;
        });
      },
      setDocumentName: value => {
        set(state => {
          state.documentName = value;
        });
      },
      setIsPendingForStop: value => {
        set(state => {
          state.isPendingForStop = value;
        });
      },
      setIsEditMessageOfUser: value => {
        set(state => {
          state.isEditMessageOfUser = value;
        });
      },
      setMessageOfUnsent: value => {
        set(state => {
          state.messageOfUnsent = value;
        });
      },
      setDrawerInfo: value => {
        set(state => {
          if (value.show || value.active === "humanize") {
            state.drawerInfo = value;
          } else {
            state.drawerInfo.show = false;
            state.drawerInfo.active = undefined;
            state.drawerInfo.editor = undefined;
          }
        });
      },
    })),
    { name: "chatbot", store: "chatbot" },
  ),
);

export const useChatbotStore = createSelectors(useChatbotSlice);
