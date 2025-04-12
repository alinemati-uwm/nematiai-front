import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";

import useCodeForm from "../hooks/useCodeForm";
import CodeEditor from "./CodeEditor";
import CodeLanguageSelect from "./CodeLanguageSelect";
import CommonSettings from "./CommonSettings";
import CodeDisplay from "./result/CodeDisplay";

/**
 * code explainer feature
 * used in main section of code page
 * rendered when feature value in search params is "code-explainer"
 * @constructor
 */
function CodeExplainer() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  const {
    watch,
    setValue,
    mutation: { data, loading },
    submit,
  } = useCodeForm({ tab: "code-explainer" });

  return (
    <div className="gap-form grid grid-cols-2">
      {/*code language input*/}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.code_language_select_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={val => setValue("from", val)} />
      </div>

      {/* input code */}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.explainer_code_input_label}</Label>
        <CodeEditor
          value={watch("code")}
          setValue={val => setValue("code", val)}
          language={watch("from") == "auto" ? undefined : watch("from")}
        />
      </div>
      <div className="col col-span-2 gap-label-space">
        <CommonSettings
          values={watch()}
          setValue={setValue}
          loading={loading}
          onSubmit={() => submit("code-explainer")}
          submitButtonTitle={codeDictionary.explainer_button_label}
        />
      </div>

      <div className="col col-span-2 gap-label-space">
        <CodeDisplay content={data} loading={loading} />
      </div>
    </div>
  );
}

export default CodeExplainer;
