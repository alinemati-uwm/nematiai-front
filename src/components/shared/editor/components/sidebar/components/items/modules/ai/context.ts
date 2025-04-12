import { createContext } from "react";

import type aiEditorTypes from "./type";

const AiEditorContext = createContext<aiEditorTypes["context"]>(
  {} as aiEditorTypes["context"],
);

export default AiEditorContext;
