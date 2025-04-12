interface imageEditorSidebarProps {
  states: {
    filters: string[];
  };
  updateState<T extends keyof imageEditorSidebarProps["states"]>(
    key: T,
    value: imageEditorSidebarProps["states"][T],
  ): void;
}

export default imageEditorSidebarProps;
