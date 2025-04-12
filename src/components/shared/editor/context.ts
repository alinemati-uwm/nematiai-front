import { createContext } from "react";

import type imageEditorTypes from "./type";

const ImageEditorContext = createContext({} as imageEditorTypes["context"]);

export default ImageEditorContext;
