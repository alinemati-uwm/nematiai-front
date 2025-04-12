"use client";

import React from "react";

import { SetSearchParamProvider } from "@/components/shared";
import { GenerateDocument } from "@/components/shared/grammar_translate_rewrite";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { useGetDictionary } from "@/hooks";
import { promptTemplateCreator } from "@/refactor_lib/constants";
import type { SCRPropsType } from "@/services/types";

const WritePage = ({ params, searchParams }: SCRPropsType) => {
  const { selectedEngineFeature, selectedEngine } = useEngineFeatures();

  const {
    page: { rewrite: lang },
  } = useGetDictionary();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="rewrite">
      {/* <Icons.copyChecked className="mr-2 h-4 w-4" /> */}
      <GenerateDocument
        params={params}
        searchParams={searchParams}
        btnTitle={lang.form_rewrite_button}
        placeHolderPrompt={lang.text_input_placeholder}
        advanced={true}
        appName="ai_writer"
        onCreatePrompt={(text, extraInfo) => {
          return promptTemplateCreator.CreateParamsForGeneration({
            prompt_type: "ai_writer",
            model: selectedEngine,
            message: text,
            temperature: selectedEngineFeature
              ? selectedEngineFeature.temperature
              : 0.1,
            frequency_penalty: selectedEngineFeature
              ? selectedEngineFeature.frequency
              : 0,
            presence_penalty: selectedEngineFeature
              ? selectedEngineFeature.presence
              : 0,
            top_p: selectedEngineFeature ? selectedEngineFeature.top : 0,
            language: extraInfo.language,
            point_of_view: extraInfo.pointOfView,
            tone_of_voice: extraInfo.tone,
            format: extraInfo.format || "",
          });
        }}
      />
    </SetSearchParamProvider>
  );
};

export default WritePage;
