import { type QueryObserverResult } from "@tanstack/react-query";

import {
  type HistoryAPIRequest,
  type HistoryAPIResponse,
} from "@/refactor_lib/types/api/v1/HistoryAPI";

type appHistoryTypes = {
  model: {
    refetch(): Promise<QueryObserverResult<any, Error>>;
    delete: { UUID: string };
    pin: HistoryAPIRequest["addAnswerToPin"];
  };
  icons: {
    keys: "pin" | "delete";
    appHistoryIconsProps: {
      icons: Array<appHistoryTypes["icons"]["keys"]>;
      history: HistoryAPIResponse["getAllAnswers"]["histories"][0];
      onClick?: (params: appHistoryTypes["icons"]["onclickParams"]) => void;
    };
    onclickParams: { type: appHistoryTypes["icons"]["keys"]; uuid: string };
  };
};

export default appHistoryTypes;
