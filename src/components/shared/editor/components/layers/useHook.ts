import { useContext } from "react";

import ImageEditorContext from "../../context";
import useImageEditorItems from "../../hooks/useImageEditorItems";
import type imageEditorTypes from "../../type";

function useImageEditorPanelTools() {
  const context = useContext(ImageEditorContext);
  const { canvas, states } = context;
  const { items } = useImageEditorItems(context);

  const getItem = (): imageEditorTypes["items"][0] | null => {
    if (canvas && states.toolActive)
      return items.find(el => el.key === states.toolActive) ?? null;
    else return null;
  };

  const toolsActived =
    getItem() && (states.selectedObject || getItem()?.tools_show);

  return { toolsActived, getItem };
}

export default useImageEditorPanelTools;
