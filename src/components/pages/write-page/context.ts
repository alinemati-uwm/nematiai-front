import { createContext } from "react";

import type writePageTypes from "./type";

const WritePageContext = createContext<writePageTypes["context"]>(
  {} as writePageTypes["context"],
);

export default WritePageContext;
