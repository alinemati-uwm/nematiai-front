type workspaceDocumentsTypes = {
  tabs: {
    name: string;
    app_type: AppsType;
    route: string;
  };
  states: {
    tab: AppsType;
  };
  context: {
    states: workspaceDocumentsTypes["states"];
    methods: {
      updateState<T extends keyof workspaceDocumentsTypes["states"]>(
        key: T,
        value: workspaceDocumentsTypes["states"][T],
      ): void;
    };
  };
};

export default workspaceDocumentsTypes;
