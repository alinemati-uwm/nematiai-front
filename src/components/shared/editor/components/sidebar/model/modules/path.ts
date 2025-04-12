import { Path } from "fabric";

import type editorModelTypes from "../type";

const editorModelPath = (() => {
  const create = async ({
    canvas,
    props,
  }: editorModelTypes["path"]["create"]) => {
    if (!canvas) return;
    const object = new Path(props?.path ?? "", props);
    canvas.add(object);
  };
  return { create };
})();

export default editorModelPath;
