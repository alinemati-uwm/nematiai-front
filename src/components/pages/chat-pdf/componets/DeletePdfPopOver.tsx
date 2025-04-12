import React, { useEffect, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/useQueryParams";
import useSuccessToast from "@/hooks/useSuccessToast";
import { useGetDictionary } from "@/hooks";
import { useDeleteChatPDFConversation } from "@/services/chatPdf";

interface DeleteProps {
  setFile: React.Dispatch<React.SetStateAction<string>>;
  file: { id: number; file: string; title: string; uuid: string };
}
export default function DeletePdfPopOver({ file, setFile }: DeleteProps) {
  const [open, setOpen] = useState(false);
  const {
    page: { chat: chatLang },
    common: lang,
  } = useGetDictionary();

  const { queries, setQueryByRouter } = useQueryParams();

  const {
    mutate: DeleteMutate,
    isSuccess: deleteIsSuccess,
    isPending: deleteIsPending,
  } = useDeleteChatPDFConversation();
  const { showSuccess } = useSuccessToast();
  useEffect(() => {
    if (deleteIsSuccess) {
      setOpen(false);
      if (queries.chatId === file.uuid) {
        setFile("");
        setQueryByRouter({}, ["chatId"]);
      }
      showSuccess(
        `${file.title.length < 20 ? file.title : `${file.title.slice(0, 20)}...`} is deleted`,
      );
    }
  }, [deleteIsSuccess]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/*delete popover button to open popover*/}
      <PopoverTrigger>
        <AppIcon tooltip={lang.delete_label} icon="fa:trash-o" />
      </PopoverTrigger>
      <PopoverContent
        className="flex w-80 flex-col gap-4"
        collisionPadding={30}
      >
        <div>
          <h3 className="text-base font-semibold">
            {chatLang.delete_history_item}
          </h3>
          <p>{chatLang.delete_history_description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {chatLang.cancel}
          </Button>

          <Button
            variant="outline"
            disabled={deleteIsPending}
            className="border bg-inherit text-danger-darker w-16 hover:border-danger-darker hover:bg-inherit hover:text-danger-darker"
            onClick={e => {
              e.stopPropagation();
              DeleteMutate({ conversation_uuid: file.uuid });
            }}
          >
            {deleteIsPending && (
              <Loading rootClass="-ms-1 me-1 " svgClass="w-4 h-4" />
            )}
            {!deleteIsPending && `${chatLang.delete}`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
