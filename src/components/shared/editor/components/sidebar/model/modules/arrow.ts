import { Path } from "fabric";
import { v4 as uid } from "uuid";

import type editorModelTypes from "../type";

const editorModelArrow = (() => {
  const create = async ({
    canvas,
    props,
  }: editorModelTypes["arrow"]["create"]) => {
    if (!canvas) return;

    canvas.isDrawingMode = false;

    // M 21 11 l -5 -4 v 3 h -19 v 2 h 19 v 3 z
    const arrowPath = new Path(
      `M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
	s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
	c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z`,
      {
        fill: props?.fill ?? "black",
        stroke: "",
        strokeLineCap: "round",
        strokeLineJoin: "round",
        strokeWidth: 0,
        customType: "arrow",
        id: uid(),
        selectable: true,
      },
    );

    canvas.add(arrowPath);
    canvas.bringObjectToFront(arrowPath);
    if (!props?.globalCompositeOperation) {
      canvas.centerObject(arrowPath);
      canvas.setActiveObject(arrowPath);
    }
    canvas.requestRenderAll();
  };

  return { create };
})();

export default editorModelArrow;
