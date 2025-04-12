import { createContext } from "react";

import { type aiImagePageTypes } from "./types";

const AiImagePageContext = createContext<aiImagePageTypes>(
  {} as aiImagePageTypes,
);

export default AiImagePageContext;
