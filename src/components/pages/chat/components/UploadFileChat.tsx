import { useEffect, useState } from "react";

import { type AttachmentsOutput } from "@/components/ui/attachments/types";
import PopoverList from "@/components/ui/PopoverList";
import { useGetDictionary } from "@/hooks";

import { type typeActiveTypeFile } from "../hooks/useChatbot";

type typeProps = {
  setActiveTypeFile: React.Dispatch<React.SetStateAction<typeActiveTypeFile>>;
  propsAttachments: AttachmentsOutput;
};

export default function UploadFileChat({
  setActiveTypeFile,
  propsAttachments,
}: typeProps) {
  const {
    page: { chat: lang },
    common,
  } = useGetDictionary();
  const [disableimage, setDisableImage] = useState(false);
  const [disableDoc, setDisableDoc] = useState(false);

  useEffect(() => {
    if (propsAttachments.files.length) {
      if (propsAttachments.files[0].type.includes("image")) {
        setDisableImage(false);
        setDisableDoc(true);
      } else {
        setDisableImage(true);
        setDisableDoc(false);
      }
    } else {
      setDisableImage(false);
      setDisableDoc(false);
    }
  }, [propsAttachments.files]);

  return (
    <PopoverList
      icon="eva:attach-fill"
      title={lang.upload_file}
      align="start"
      list={[
        {
          icon: "material-symbols:image-outline-rounded",
          title: lang.upload_image,
          disabled: disableimage,
          onClick: () => {
            setActiveTypeFile("image");
            setTimeout(() => {
              propsAttachments.showUpload();
            }, 500);
          },
        },
        {
          icon: "material-symbols:sticky-note-2-outline",
          title: lang.upload_doc,
          disabled: disableDoc,
          onClick: () => {
            setActiveTypeFile("doc");
            setTimeout(() => {
              propsAttachments.showUpload();
            }, 500);
          },
        },
      ]}
    />
  );
}
