type aiEditorTypes = {
  context: {
    methods: {
      updateState(view: aiEditorTypes["views"]): void;
    };
  };
  views: "main" | "generateImage";
};

export default aiEditorTypes;
