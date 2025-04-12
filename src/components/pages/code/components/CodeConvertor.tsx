"use client";

import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";

import useCodeForm from "../hooks/useCodeForm";
import CodeEditor from "./CodeEditor";
import CodeLanguageSelect from "./CodeLanguageSelect";
import CommonSettings from "./CommonSettings";
import CodeDisplay from "./result/CodeDisplay";

function CodeConvertor() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const {
    watch,
    setValue,
    mutation: { data, loading },
    submit,
  } = useCodeForm({ tab: "code-convertor" });

  return (
    <div className="gap-form grid grid-cols-2">
      {/* from language select */}
      <div className="col col-span-2 gap-label-space sm:col-span-1">
        <Label>{codeDictionary.code_convert_from_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={val => setValue("from", val)} />
      </div>

      {/* to language select */}
      <div className="col col-span-2 gap-label-space sm:col-span-1">
        <Label>{codeDictionary.code_convert_to_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={val => setValue("to", val)} />
      </div>

      {/* code input */}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.code_convert_code_input_label}</Label>
        <CodeEditor
          value={watch("code")}
          setValue={val => setValue("code", val)}
          language={watch("from") == "auto" ? undefined : watch("from")}
        />
      </div>

      <div className="col col-span-2 gap-label-space">
        <CommonSettings
          values={watch()}
          onSubmit={() => submit("code-convertor")}
          loading={loading}
          setValue={setValue}
          submitButtonTitle={codeDictionary.code_convert_button_label}
        />
      </div>

      <div className="col col-span-2 gap-label-space">
        <CodeDisplay content={data} loading={loading} />
      </div>
    </div>
  );
}

export default CodeConvertor;
