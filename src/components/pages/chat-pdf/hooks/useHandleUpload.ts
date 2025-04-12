import type React from "react";
import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import useAttachments from "@/components/ui/attachments/Attachments";
import { type FilesType } from "@/components/ui/attachments/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useStartConvWithPdf } from "@/services/chatPdf";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<string>>;
}

const useHandleUpload = (Props: Props) => {
  const resetConversation = useChatbotStore.use.resetConversation();
  const { toaster, closeToastAfterTimeout } = useToaster();
  const { setQueryByRouter } = useQueryParams();

  //upload service for chat pdf
  const {
    mutateAsync: UploadMutate,
    data: uploadPdfResponseData,
    isSuccess: UploadPdfIsSuccess,
    isPending: uploadPdfIsPending,
    isError: uploadPdfIsError,
  } = useStartConvWithPdf();

  const onGetNewFile = async (files: FilesType) => {
    const filesArarye = Object.values(files);

    for (const file of filesArarye) {
      await UploadMutate({ file: file });
    }
  };

  //hook for an uploading file
  const { showUpload, input, holderDropWithChild } = useAttachments({
    accept: [".pdf"],
    eachSize: 5,
    maxSize: 5,
    multiple: false,
    onGetNewFile,
  });

  //destructure props
  const { setFile } = Props;

  //using query for invalidation and retrigger
  const query = useQueryClient();

  useEffect(() => {
    if (UploadPdfIsSuccess) {
      resetConversation();
      if (uploadPdfResponseData) {
        setQueryByRouter({ chatId: uploadPdfResponseData.uuid });

        const fileName = uploadPdfResponseData.files[0].title;

        toaster({
          toastProps: {
            type: "success",
            message: ` ${fileName.length < 20 ? fileName : `${fileName.slice(0, 20)}...`}  uploaded`,
          },
        });
      }
    }
    if (uploadPdfIsError) {
      toaster({
        toastProps: { type: "success", message: "couldn't upload the PDF" },
      });
    }
    if (uploadPdfIsPending) {
      toaster({
        toastProps: { type: "promise", message: "uploading..." },
      });
    }
  }, [UploadPdfIsSuccess, uploadPdfIsError, uploadPdfIsPending]);

  return { input, showUpload, holderDropWithChild };
};

export default useHandleUpload;
