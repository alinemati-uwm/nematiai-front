"use client";

import React from "react";

import { features } from "@/constants/code";
import { useGetDictionary } from "@/hooks";

import useCodeFeatures from "../hooks/useCodeFeatures";
import CodeConvertor from "./CodeConvertor";
import CodeExplainer from "./CodeExplainer";
import CodeGenerator from "./CodeGenerator";

export function MainSection() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  const { currentFeature } = useCodeFeatures();

  const titleKey = features.find(
    item => item.key === currentFeature,
  )?.titleI18Key;

  const tabs = {
    "code-convertor": <CodeConvertor />,
    "code-generator": <CodeGenerator />,
    "code-explainer": <CodeExplainer />,
  }[currentFeature];

  return (
    <section className="h-full">
      <div className="flex h-fit overflow-hidden md:h-full md:max-h-[calc(var(--apps-main-height)-24px)] lg:max-h-[calc(var(--apps-main-height)-40px)]">
        <div className="col h-full w-full md:min-w-[380px] md:overflow-y-auto lg:min-w-[500px]">
          <div className="hidden w-full lg:flex">
            <h1 className="text-gradiant mx-auto px-3 pt-3 text-center text-2xl font-bold xl:text-3xl">
              {codeDictionary[titleKey!]}
            </h1>
          </div>

          <div className="px-4 py-form-padding md:px-8 xl:px-24">{tabs}</div>
        </div>
      </div>
    </section>
  );
}
