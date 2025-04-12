import { createContext } from "react";

import type workspaceDocumentsTypes from "./type";

const WorkspaceDocumentsContext = createContext<
  workspaceDocumentsTypes["context"]
>({} as workspaceDocumentsTypes["context"]);

export default WorkspaceDocumentsContext;
