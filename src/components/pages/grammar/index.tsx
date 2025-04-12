"use client";

import React from "react";

import { SetSearchParamProvider } from "@/components/shared";
import { GenerateDocument } from "@/components/shared/grammar_translate_rewrite";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { useGetDictionary } from "@/hooks";
import { promptTemplateCreator } from "@/refactor_lib/constants";
import type { SCRPropsType } from "@/services/types";

export default function GrammarPage({ params, searchParams }: SCRPropsType) {
  const { selectedEngineFeature, selectedEngine } = useEngineFeatures();
  const {
    page: { grammar: lang },
  } = useGetDictionary();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <GenerateDocument
        btnTitle={lang.submit_button_label}
        placeHolderPrompt={lang.text_input_placeholder}
        params={params}
        searchParams={searchParams}
        advanced={false}
        appName="grammar"
        onCreatePrompt={(text, extraInfo) => {
          return promptTemplateCreator.CreateParamsForGeneration({
            prompt_type: "grammar",
            model: selectedEngine,
            language: extraInfo.language,
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
          });
          // return promptTemplateCreator.createGenerateGrammarPrompt({
          // 	targetLang: extraInfo.language,
          // 	userMessage: text,
          // 	model: selectedEngine,
          // 	temperature: selectedEngineFeature
          // 		? selectedEngineFeature.temperature
          // 		: 0.1,
          // 	maxToken: 100,
          // 	frequencyPenalty: selectedEngineFeature
          // 		? selectedEngineFeature.frequency
          // 		: 0,
          // 	presencePenalty: selectedEngineFeature
          // 		? selectedEngineFeature.presence
          // 		: 0,
          // 	topP: selectedEngineFeature ? selectedEngineFeature.top : 0,
          // 	documentName: extraInfo.documentName || "New Document",
          // });
        }}
      />
    </SetSearchParamProvider>
  );
}
