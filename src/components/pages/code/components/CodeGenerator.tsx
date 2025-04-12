import { useRef } from "react";

import { Label } from "@/components/ui/label";
import usePrompt from "@/components/ui/prompt/Prompt";
import { useGetDictionary } from "@/hooks";

import useCodeForm from "../hooks/useCodeForm";
import CodeLanguageSelect from "./CodeLanguageSelect";
import CommonSettings from "./CommonSettings";
import CodeDisplay from "./result/CodeDisplay";

/**
 * generate code by explanation feature
 * used in main section of code page
 * rendered when feature value in search params is "code-generator"
 * @constructor
 */
function CodeGenerator() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  const {
    watch,
    setValue,
    mutation: { data, loading },
    submit,
  } = useCodeForm({ tab: "code-generator" });
  const editableDivRef = useRef(null);

  const { content, addText } = usePrompt({
    onGetNewFile: () => {},
    key: 1,
    placeholder: codeDictionary.generate_code_textarea_placeholder,
    upload: false,
    promptFn: prompt => addText(prompt.trim()),
    maxsize: 4000,
    initialValue: watch().text ?? "",
    onchange: val => setValue("text", val),
  });

  return (
    <div className="gap-form grid grid-cols-2">
      {/*code language input*/}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.code_language_select_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={val => setValue("from", val)} />
      </div>

      {/*code explanation input*/}
      <div className="col col-span-2 gap-label-space">
        <Label htmlFor="generate-code-textarea">
          {codeDictionary.generate_code_textarea_label}
        </Label>
        {content}
      </div>

      {/*common settings for all features of code*/}
      <div className="col col-span-2 gap-label-space">
        <CommonSettings
          setValue={setValue}
          values={watch()}
          loading={loading}
          onSubmit={() => submit("code-generator")}
          submitButtonTitle={codeDictionary.generate_button_label}
        />
      </div>

      <div className="col col-span-2 gap-label-space">
        <CodeDisplay content={data} loading={loading} />
      </div>
    </div>
  );
}

export default CodeGenerator;
