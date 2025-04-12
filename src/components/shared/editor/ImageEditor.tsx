import dynamic from "next/dynamic";

import type imageEditorTypes from "./type";

const Core = dynamic(() => import("./Core"));

function ImageEditor(props: imageEditorTypes["props"]) {
  return props.modal.status ? <Core {...props} /> : null;
}

export default ImageEditor;
