import { createContext } from "react";

import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

type codeTypes = {
  context: {
    data: HistoryAPIResponse["answers"] | undefined;
  };
};

const CodeContext = createContext<codeTypes["context"]>(
  {} as codeTypes["context"],
);

export default CodeContext;
