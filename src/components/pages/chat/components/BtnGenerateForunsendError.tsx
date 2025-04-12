import { useChatbotStore } from "@/stores/zustand/chat";
import { useGetDictionary } from "@/hooks";

export const BtnGenerateForunsendError = ({
  generateConversation,
}: {
  generateConversation: (val: string, files: File[]) => void;
}) => {
  const { chat: lang } = useGetDictionary().page;
  const messageOfUnsent = useChatbotStore.use.messageOfUnsent();
  const setMessageOfUnsent = useChatbotStore.use.setMessageOfUnsent();

  const onClick = () => {
    generateConversation(messageOfUnsent.text, messageOfUnsent.files);
    setMessageOfUnsent({ text: "", files: [] });
  };

  return (
    <div className="w-full flex justify-center items-center cursor-pointer">
      <div
        onClick={onClick}
        className="w-20 bg-[rgba(230,40,11,0.17)] text-danger flex justify-center items-center p-2 rounded"
      >
        {lang.resend}
      </div>
    </div>
  );
};
