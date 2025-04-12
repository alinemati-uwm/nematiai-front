import React from "react";

import { MinimalButton } from "@/components/shared/MinimalButtton";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

import type appHistoryTypes from "../../types";
import appHistoryIconsModel from "./model";

type props = {
  handleClick?(): void;
  el: appHistoryTypes["icons"]["keys"];
  loading: appHistoryTypes["icons"]["keys"] | null;
  history: HistoryAPIResponse["getAllAnswers"]["histories"][0];
};

function HistoryIconContainer({ handleClick, el, loading, history }: props) {
  const { checkActive, iconMap } = appHistoryIconsModel({ history });

  return (
    <div
      onClick={() => {
        if (!handleClick) return;
        handleClick();
      }}
      className="cursor-pointer"
    >
      <MinimalButton
        size="xs"
        color={el === "delete" ? "danger" : "default"}
        className={loading === el ? "!text-label" : ""}
        selected={checkActive[el]}
        icon={loading === el ? "eos-icons:loading" : iconMap[el]}
      ></MinimalButton>
    </div>
  );
}

export default HistoryIconContainer;
