"use client";

import { useEffect } from "react";

import { SelectAndDrawer, SelectEngine } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { languages } from "@/constants/languages";
import { useGetDictionary } from "@/hooks";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";

import useCodeFeatures from "../hooks/useCodeFeatures";
import type codePageTypes from "../type";

type IProps = {
  submitButtonTitle: string;
  setValue(key: keyof Omit<codePageTypes["form"], "tab">, value: any): void;
  values: Record<keyof Omit<codePageTypes["form"], "tab">, any>;
  onSubmit(): void;
  loading: boolean;
};

/**
 * common settings for all features of code page
 * contains: want select, output language select, engine select and submit button
 * @param submitButtonTitle - title of submit button
 * @constructor
 */
function CommonSettings({
  submitButtonTitle,
  onSubmit,
  setValue,
  values,
  loading,
}: IProps) {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const { engines } = useGetAppTypeEngines({
    GetAllModels: { modelName: "CODES" },
  });
  const { currentFeature } = useCodeFeatures();

  const wantList = {
    "code-convertor": ["To Convert + Explanation"],
    "code-explainer": ["To Explanation"],
    "code-generator": ["To generator + Explanation"],
  }[currentFeature];

  useEffect(() => {
    if (engines) setValue("model", engines[0]);
    setValue("want", wantList ? wantList[0] : []);
    setValue("output", languages[0].englishTitle);
  }, [engines, currentFeature]);

  return (
    <div className="gap-form grid grid-cols-2">
      {/*I want select*/}
      <div className="col-span-2 md:col-span-1">
        <Label>{codeDictionary.want_select_label}</Label>
        <SelectAndDrawer
          value={values.want ?? ""}
          setValue={val => setValue("want", val)}
          items={wantList ?? []}
        />
      </div>

      {/*output language select*/}
      <div className="col-span-2 md:col-span-1">
        <Label>{codeDictionary.output_language_select_label}</Label>
        <SelectAndDrawer
          value={values.output ?? ""}
          setValue={val => setValue("output", val)}
          items={languages.map(el => el.englishTitle)}
        />
      </div>

      {/*engines select*/}
      <SelectEngine
        defaultValue={values.model}
        className="col-span-2 sm:col-span-1"
        onChange={val => setValue("model", val)}
        app_type="CODES"
      />

      {/*submit button*/}
      <Button
        onClick={onSubmit}
        className="col-span-2 h-input mt-auto sm:col-span-1"
        isPending={loading}
      >
        {submitButtonTitle}
      </Button>
    </div>
  );
}

export default CommonSettings;
