"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import { SetSearchParamProvider } from "@/components/shared";
import { GenerateDocument } from "@/components/shared/grammar_translate_rewrite";
import { languages } from "@/components/shared/grammar_translate_rewrite/component/form-section-components/contants";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { getLangById } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { promptTemplateCreator } from "@/refactor_lib/constants";
import { type ParamsType, type SearchParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
  searchParams: SearchParamsType;
}

export default function TranslatePage({ params, searchParams }: IProps) {
  const getSearchParams = useSearchParams();
  const { selectedEngineFeature, selectedEngine } = useEngineFeatures();

  const {
    page: { translate: lang },
  } = useGetDictionary();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Translate">
      <GenerateDocument
        btnTitle={lang.submit_button_label}
        placeHolderPrompt={lang.text_input_placeholder}
        translateLanguages={true}
        params={params}
        advanced={false}
        searchParams={searchParams}
        appName="translate"
        onCreatePrompt={(text, extraInfo) => {
          return promptTemplateCreator.CreateParamsForGeneration({
            prompt_type: "translate",
            model: selectedEngine,
            language:
              getLangById(getSearchParams.get("trLang") ?? "")?.value ??
              languages[1].value,
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
        }}
      />
    </SetSearchParamProvider>
  );
}
