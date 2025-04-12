import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

type podcastSingleType = {
  context: {
    states: {
      file: {
        duration: number;
      };
    };
    data: HistoryAPIResponse["answers"];
    methods: {
      updateState<T extends keyof podcastSingleType["context"]["states"]>(
        key: T,
        value: podcastSingleType["context"]["states"][T],
      ): void;
    };
  };
};

export default podcastSingleType;
