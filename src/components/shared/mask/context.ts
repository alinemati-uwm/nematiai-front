import { createContext } from "react";

import type maskTypes from "./type";

type props = {
  props: maskTypes["component"];
  states: maskTypes["states"];
  method: {
    updateState<T extends keyof maskTypes["states"]>(
      key: T,
      value: maskTypes["states"][T],
    ): void;
  };
};

const ContextMask = createContext<props>({} as props);

export default ContextMask;
