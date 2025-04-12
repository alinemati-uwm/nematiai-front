import { createContext } from "react";

import type appModelSelectorTypes from "./type";

const AppModelSelectorContext = createContext(
  {} as appModelSelectorTypes["context"],
);

export default AppModelSelectorContext;
