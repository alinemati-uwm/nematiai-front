import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import useAppHistory from "@/components/shared/HistoryRefactor/useAppHistory";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useGetDictionary } from "@/hooks";
import useCurrentWorkspaceValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceValue";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import codeAPI from "@/refactor_lib/services/api/v1/CodeAPI";

import type codePageTypes from "../../type";
import useCode from "../useCode";
import useCodeMutateModel from "./model";

function useCodeMutate() {
  const mutation = useMutation({
    mutationFn: codeAPI.generate,
  });
  const [data, setData] = useState<Record<string, any>[]>([]);
  const { toaster } = useToaster();
  const { urlHistory } = useCode();
  const dictionary = useGetDictionary().page.code;
  const router = useRouter();
  const {
    query: { refetch },
  } = useAppHistory({ type: "code" });

  const currentWorkspace = useCurrentWorkspaceValue();

  const makePrompt = ({
    from,
    code,
    output,
    to,
    want,
    tab,
    text,
  }: codePageTypes["form"]) => ({
    "code-convertor": `from language ${from} to language ${to}\ncode:${"```" + code + "```"}\ni want ${want} language output in ${output}\n`,
    "code-generator": `Generate code snippets in ${from} based on the following description in ${output}: ${text}.`,
    "code-explainer": `Explain the following code in a conversational tone, focusing on its functionality and key concepts. The code is written in ${from}. Here's the code snippet:${"```" + code + "```"}\nMake sure to break down complex parts and provide examples if necessary, and keep the explanation in ${output}.`,
  });
  const engineSetting = useFormStore.use.engines();
  const mutate = async (form: codePageTypes["form"]) => {
    try {
      setData([]);
      const prompt = makePrompt(form)[form.tab];
      if (!prompt) throw Error();

      await useCodeMutateModel.validate({ form, dictionary }); // Validate

      const modelSetting = engineSetting?.[form.model];
      await mutation.mutateAsync({
        body: {
          document_name: "New Document",
          frequency_penalty: modelSetting?.frequency ?? 0,
          max_tokens: 500,
          messages: [
            {
              content: prompt,
              role: "assistant",
            },
            {
              content: `:${form.tab}:` + " " + (form.code ?? form.text),
              role: "user",
            },
          ],
          model: form.model,
          presence_penalty: modelSetting?.presence ?? 0,
          stream: true,
          temperature: modelSetting?.temperature ?? 1.3,
          top_p: modelSetting?.top ?? 1,
          workspace_id: currentWorkspace?.workspace?.id ?? 0,
        },
        onMessageDataHandler: (res: Record<string, any>) => {
          setData(prev => [...prev, res.content]);
          if (res?.uuid)
            router.push(
              urlHistory({ uuid: res.uuid }) + `&feature=${form.tab}`,
            );
        },
      });

      refetch();
    } catch (error: any) {
      toaster({
        toastProps: {
          type: "error",
          message: error.statusCode ?? (error as Error).message,
        },
      });
    }
  };

  return {
    mutate,
    data: data.join(""),
    loading: mutation.isPending,
    makePrompt,
  };
}

export default useCodeMutate;
