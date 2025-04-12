type codePageTypes = {
  tabs: "code-convertor" | "code-generator" | "code-explainer";
  form: {
    from: string;
    to: string;
    code: string;
    want: string;
    output: string;
    model: string;
    text: string;
    tab: codePageTypes["tabs"];
  };
};

export default codePageTypes;
