import { type WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

type workspaceTypes = {
  states: {
    tab: "document" | "apps";
    search: string;
  };
  context: {
    states: workspaceTypes["states"];
    workspaces: WorkspaceAPIResponse["getUserWorkspace"];
    methods: {
      updateState<T extends keyof workspaceTypes["states"]>(
        key: T,
        value: workspaceTypes["states"][T],
      ): void;
    };
  };
};

export default workspaceTypes;
export type SettingMenu = "setting" | "share";
