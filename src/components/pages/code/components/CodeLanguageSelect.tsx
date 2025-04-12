"use client";

import { useState } from "react";

import { SelectAndDrawer } from "@/components/shared";
import { codeLanguages, monacoLanguages } from "@/constants/code";

interface IProps {
  setCurrentLanguage: (value: string) => void;
}

/**
 * select language for code editor
 * @param setCurrentLanguage - set current language
 * @constructor
 */
function CodeLanguageSelect({ setCurrentLanguage }: IProps) {
  const [value, setValue] = useState("Auto");

  /**
   * change language of code editor
   * when select language find value for code editor in monacoLanguages list
   * for example: if select "C++" find "C++" in monacoLanguages list and set it value(cpp) to current language
   * @param val - selected language
   */
  const changeLang = (val: string) => {
    setValue(val);
    setCurrentLanguage(
      monacoLanguages.find(item => item.key.toLowerCase() === val.toLowerCase())
        ?.value || "auto",
    );
  };

  return (
    <SelectAndDrawer
      value={value}
      setValue={changeLang}
      items={codeLanguages}
      showSearch
      isSelect={false}
    />
  );
}

export default CodeLanguageSelect;
