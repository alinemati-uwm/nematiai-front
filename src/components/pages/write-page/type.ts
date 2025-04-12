import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

type writePageTypes = {
  states: {
    appType: AppsType;
    data: HistoryAPIResponse["getAllAnswers"]["histories"];
    search: string | null;
  };
  context: {
    states: writePageTypes["states"];
    methods: {
      updateState<T extends keyof writePageTypes["states"]>(
        key: T,
        value: writePageTypes["states"][T],
      ): void;
    };
  };
};

export default writePageTypes;
