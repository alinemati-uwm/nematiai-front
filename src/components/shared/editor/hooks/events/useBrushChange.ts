import { useEffect } from "react";

import { type Canvas } from "fabric";

import imageEditorModelTools from "../../components/sidebar/model/model";
import type imageEditorTypes from "../../type";

type props = {
  canvas: Canvas | null;
  states: imageEditorTypes["states"];
};

function useBrushChange({ canvas, states }: props) {
  const { draw } = imageEditorModelTools;

  useEffect(() => {
    if (canvas && states.toolActive === "path")
      draw.create({
        brush: states.defaults.brush,
        color: states.defaults.colorPicker,
        canvas,
      });
  }, [canvas, states.toolActive, states.defaults]);
}

export default useBrushChange;
