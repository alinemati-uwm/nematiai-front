import React, { type FC } from "react";

import { mindMapForms } from "@/components/pages/mind-map/constants";
import styles from "@/components/pages/mind-map/style.module.css";
import type { MindMapTab } from "@/components/pages/mind-map/types";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import useAttachments from "@/components/ui/attachments/Attachments";
import { useSpeechToText } from "@/components/ui/useSpeechToText";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";

interface TextFiledProps {
  onChange: (val: string) => void;
  value: string;
}

const TextBox = ({ onChange, value }: TextFiledProps) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();
  const { content: btnSpeech, isSpeechRecognitionSupported } = useSpeechToText({
    transcript: value,
    setTranscript: onChange,
  });

  return (
    <div
      className={cn(
        styles.borderGradiant,
        "bg-muted-light w-full h-[160px] p-4 rounded overflow-hidden z-10",
      )}
    >
      <textarea
        className={cn(
          "size-full resize-none bg-transparent placeholder:text-gray-400 outline-none border-none",
          isSpeechRecognitionSupported && "ps-6",
        )}
        placeholder={dictionary.text_box_placeholder}
        value={value}
        maxLength={4000}
        onChange={e => onChange(e.target.value)}
      />
      <RenderIf isTrue={!!value}>
        <span className="absolute bottom-0 right-0 mr-3 text-sm text-gray-500">
          {value?.length}
        </span>
      </RenderIf>
      <RenderIf isTrue={isSpeechRecognitionSupported}>
        <div className="absolute top-2.5 start-2 size-fit">{btnSpeech}</div>
      </RenderIf>
    </div>
  );
};

const LinkBox = ({ onChange, value }: TextFiledProps) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();
  return (
    <div
      className={cn(
        styles.borderGradiant,
        "bg-muted-light w-full p-2 relative rounded overflow-hidden z-10",
      )}
    >
      <div className="h-7 row gap-2 px-2">
        <AppIcon icon="ic:outline-link" width={18} />
        <input
          type="url"
          className="size-full bg-transparent placeholder:text-gray-400 outline-none border-none"
          placeholder={dictionary.link}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

interface FileFiledProps {
  onChangeFile: (file: File) => void;
  fileType: "image" | "doc";
}

const FileBox = ({ onChangeFile, fileType }: FileFiledProps) => {
  const { holderDropFile, content, files } = useAttachments({
    accept:
      fileType === "image" ? [".png", ".jpeg", ".jpg"] : [".docx", ".pdf"],
    maxSize: 5,
    maxUpload: 1,
    classnames: {
      holderDropFile: "m-0 bg-transparent",
    },
    onChange: async files => {
      onChangeFile(Object.values(files)[0]);
    },
  });
  return (
    <div className="flex items-center w-full relative">
      {files.length ? null : holderDropFile}
      <div className="">{content}</div>
    </div>
  );
};

interface IProps {
  activeTab: MindMapTab;
  value: string;
  setValue: StateSetterType<string>;
  setFile: StateSetterType<File | undefined>;
}

const MindMapFields: FC<IProps> = ({ activeTab, setFile, setValue, value }) => {
  const tabField =
    mindMapForms.find(f => f.tabKey === activeTab)?.filedType || "text";

  const FormFiled = {
    file: FileBox,
    link: LinkBox,
    text: TextBox,
  }[tabField];

  return (
    <FormFiled
      value={value}
      onChange={setValue}
      onChangeFile={setFile}
      fileType={activeTab === "image_tab" ? "image" : "doc"}
    />
  );
};

export default MindMapFields;
