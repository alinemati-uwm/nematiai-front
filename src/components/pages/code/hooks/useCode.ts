import { useParams, useSearchParams } from "next/navigation";

import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

function useCode() {
  const params = useSearchParams();

  const feature = params.get("feature");
  const history = params.get("history");
  const { lang } = useParams();
  const regex = /:([^`]+):/;

  const urlHistory = ({
    uuid,
    prompt,
  }: Pick<HistoryAPIResponse["answers"], "uuid"> & { prompt?: string }) => {
    const url = new URLSearchParams({
      history: uuid,
      ...(prompt && { feature: getTabPrompt(prompt) }),
    });
    return `/${lang}/code?app=code&${url.toString()}`;
  };

  const getBlockCode = (text: string) => {
    if (text) {
      const codeBlockMatch = text.match(regex);
      if (codeBlockMatch) {
        return text.replace(regex, "").trim();
      } else return text;
    }
  };
  const getTabPrompt = (text: string) => {
    const res = text.match(regex);
    return res ? res[0].trim().replace(/:/g, "") : "code-convertor";
  };

  return { history, urlHistory, getBlockCode, feature, getTabPrompt };
}

export default useCode;
