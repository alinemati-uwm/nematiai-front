import { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";

import CodeContext from "../context";
import type codePageTypes from "../type";
import useCodeMutate from "./mutate/useCodeMutate";
import useCode from "./useCode";

function useCodeForm(props: { tab: codePageTypes["tabs"] }) {
  const { setValue, getValues, watch } =
    useForm<Omit<codePageTypes["form"], "tab">>();
  const { feature, getBlockCode, getTabPrompt } = useCode();
  const { data: history } = useContext(CodeContext);

  const mutation = useCodeMutate();

  const submit = (tab: codePageTypes["tabs"]) => {
    mutation.mutate({ ...getValues(), tab });
  };

  useEffect(() => {
    const historyTab = history && getTabPrompt(history.prompt);
    if (history && feature === historyTab) {
      const text = getBlockCode(history.prompt);
      if (text)
        setValue(historyTab === "code-generator" ? "text" : "code", text);
    }
  }, [history, feature]);

  return { setValue, watch, mutation, submit };
}

export default useCodeForm;
