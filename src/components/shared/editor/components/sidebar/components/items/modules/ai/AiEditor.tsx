import React, { useState } from "react";

import GenerateImage from "./components/GenerateImage";
import AiEditorMain from "./components/Main";
import AiEditorContext from "./context";
import type aiEditorTypes from "./type";

function AiEditor() {
  const [component, setComponent] =
    useState<aiEditorTypes["views"]>("generateImage");

  const views = {
    main: <AiEditorMain />,
    generateImage: <GenerateImage />,
  };

  const updateState = (view: aiEditorTypes["views"]) => setComponent(view);

  return (
    <AiEditorContext value={{ methods: { updateState } }}>
      {views[component]}
    </AiEditorContext>
  );
}

export default AiEditor;
