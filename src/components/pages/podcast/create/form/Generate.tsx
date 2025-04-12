import React, { useContext } from "react";

import { SelectAndDrawer } from "@/components/shared";
import useAttachments from "@/components/ui/attachments/Attachments";
import { languages } from "@/constants/languages";
import { useGetDictionary } from "@/hooks";
import { type podcastLength } from "@/refactor_lib/types/api/v1/GenerateAudio";

import PodcastCreateContext from "../context";
import podcastGenerateModel from "./model";

function PodcastGenerate() {
  const {
    page: {
      podcast: { what_you_want_generate },
    },
  } = useGetDictionary(); // Fetch localized text for prompt placeholder
  const {
    states: { tab, params },
    methods: { updateState },
  } = useContext(PodcastCreateContext); // Access context for state management
  const { holderDropFile, content, files } = useAttachments({
    // Handle file attachment
    accept: [".pdf"],
    maxSize: 5,
    maxUpload: 1,
    classnames: {
      holderDropFile: "m-0 bg-transparent", // Custom styling for drop area
    },
    onChange: async images => {
      // Handle change in selected files
      updateState("params", {
        ...params,
        file: !Object.keys(images).length ? null : (images as any),
      });
    },
  });

  const onChangeSelect = (value: string) => {
    updateState("params", {
      ...params,
      length: (value as podcastLength) ?? "medium", // Default to "medium" if no match
    });
  };
  return (
    <div className="flex bg-gradient-to-r w-full from-blue-400 to-purple-300 p-0.5 shadow-card-hover rounded-lg">
      <div className="flex flex-col w-full items-center bg-holder-dark rounded">
        <div className="bg-muted-light w-full p-5 relative rounded rounded-b-none overflow-hidden">
          {tab === "long_text" ? ( // Render text input if tab is "text"
            <>
              <textarea
                className="w-full h-24 resize-none bg-transparent placeholder:text-gray-400 outline-none border-none"
                placeholder={what_you_want_generate} // Display prompt placeholder text
                value={params.prompt}
                maxLength={4000}
                onChange={
                  e =>
                    updateState("params", { ...params, prompt: e.target.value }) // Update state on text change
                }
              />
              {params.prompt && (
                <span className="absolute bottom-0 right-0 mr-3 text-sm text-gray-500">
                  {params.prompt.length} {/* Display character count */}
                </span>
              )}
            </>
          ) : (
            <div className="flex items-center w-full relative">
              {files.length ? null : holderDropFile}{" "}
              {/* Show drop area if no files selected */}
              <div className="">{content}</div>
              {/* Display file content */}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between w-full py-3 px-2 md:px-4.5 bg-muted rounded-b-[10px]">
          <div className="w-40">
            <SelectAndDrawer
              isSelect
              value={params.language}
              setValue={
                v => updateState("params", { ...params, language: v }) // Update language selection
              }
              placeHolder="Language Response"
              items={languages.map(el => ({
                id: el.englishTitle,
                value: el.englishTitle,
              }))}
            />
          </div>

          <div className="w-36">
            <SelectAndDrawer
              isSelect
              value={
                podcastGenerateModel.duration.find(e => e.id === params.length)
                  ?.id || ""
              }
              setValue={onChangeSelect}
              items={podcastGenerateModel.duration}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastGenerate;
