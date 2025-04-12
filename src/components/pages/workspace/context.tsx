import { createContext } from "react";

import type workspaceTypes from "./type";

const WorkspaceContext = createContext({} as workspaceTypes["context"]);

export default WorkspaceContext;
