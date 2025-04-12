import {
  type ModelAPIRequest,
  type ModelAPIResponse,
} from "@/refactor_lib/types/api/v1/ModelAPI";

type appModelSelectorTypes = {
  props: {
    formMode?: boolean;
    setting?: boolean;
    title?: boolean;
    model?: {
      value: string;
      onChange(moddel: ModelAPIResponse["getAllModels"][0]["models"][0]): void;
    };
    appType: ModelAPIRequest["modelName"];
  };
  state: {
    search: string;
    dropdown: boolean;
    setting: boolean;
    container: HTMLElement | null;
    models: ModelAPIResponse["getAllModels"];
  };
  context: {
    props: appModelSelectorTypes["props"];
    states: appModelSelectorTypes["state"];
    methods: {
      updateState<T extends keyof appModelSelectorTypes["state"]>(
        key: T,
        value: appModelSelectorTypes["state"][T],
      ): void;
    };
  };
};

export default appModelSelectorTypes;
