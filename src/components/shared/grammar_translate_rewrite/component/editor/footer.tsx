"use client";

import { useContext, useEffect, useState } from "react";

import { PopoverGenereateAudio } from "@/components/shared/generateAudio/component/PopoverGenereateAudio";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { numberOfTextContent } from "@/lib/numOfChar-word-sentence-token";
import { useGetDictionary } from "@/hooks";
import type { WordType } from "@/services/types";

import { type typeinfoAfterGenerate } from "../../types";
import { characterValueItems } from "./constants";
import { DocumentEditorContext } from "./context";

export default function EditorSectionFooter({
  selectedVersion,
  selectedUUID,
  infoAfterGenerate,
  voiceJustForMain = false,
  appName,
}: {
  selectedVersion: string;
  selectedUUID: string;
  infoAfterGenerate: typeinfoAfterGenerate;
  voiceJustForMain: boolean;
  appName: AppsType;
}) {
  const { text } = useContext(DocumentEditorContext);

  useEffect(() => {}, [text, infoAfterGenerate.audio]);

  const [value, setValue] = useState<string>(characterValueItems[0]);
  const {
    components: { editor_section },
  } = useGetDictionary();

  const items = () => {
    return (
      <>
        {characterValueItems.map(item => (
          <SelectItem
            key={item}
            value={item}
            className="flex flex-row-reversejustify-between gap-4 px-2 text-start"
          >
            {`${editor_section[item]}  ${numberOfTextContent(item.split("_").pop() as WordType, text === null ? "" : text)}`}
          </SelectItem>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-row  justify-between sticky bottom-1  w-full px-3 items-center">
      <div className="gap-2 flex">
        <div className="rounded p-2 gap-2 flex">
          <PopoverGenereateAudio
            version={voiceJustForMain ? "" : selectedVersion}
            intialSrc={infoAfterGenerate.audio || ""}
            icon="ic:round-settings-voice"
            appName={appName}
            uuid={selectedUUID}
            type="voice"
            validChar={{ state: text!.length < 1, number: 1 }}
          ></PopoverGenereateAudio>
          <PopoverGenereateAudio
            version={voiceJustForMain ? "" : selectedVersion}
            intialSrc={infoAfterGenerate.podcast || ""}
            appName={appName}
            uuid={selectedUUID}
            icon="la:podcast"
            type="podcast"
            validChar={{ state: text!.length < 150, number: 150 }}
          ></PopoverGenereateAudio>
        </div>
      </div>
      <div className="py-2">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="row  start-2 h-8 w-fit gap-2 border-none text-small font-normal ">
            <SelectValue
              placeholder={editor_section.editor_footer_placeholder}
            />
          </SelectTrigger>
          <SelectContent className="h-auto">
            <SelectGroup>{items()}</SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
