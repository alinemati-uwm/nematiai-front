import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

import type appHistoryTypes from "../../types";

const appHistoryIconsModel = ({
  history,
}: {
  history: HistoryAPIResponse["getAllAnswers"]["histories"][0];
}) => {
  // For get icon
  const iconMap: Record<appHistoryTypes["icons"]["keys"], string> = {
    delete: "ic:outline-delete",
    pin: "ic:outline-push-pin",
  };

  // For check active icon
  const checkActive: Record<appHistoryTypes["icons"]["keys"], boolean> = {
    delete: false,
    pin: history.pin,
  };

  return { iconMap, checkActive };
};

export default appHistoryIconsModel;
