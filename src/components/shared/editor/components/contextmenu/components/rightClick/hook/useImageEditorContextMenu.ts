import { useContext, useState } from "react";

import ImageEditorContext from "../../../../../context";
import type imageEditorTypes from "../../../../../type";
import useImageEditorContextMenuModel from "./model";

export type editorContextMenuStates = {
  x: number;
  y: number;
  target: imageEditorTypes["customs"]["FabricObject"] | null;
};

function useImageEditorContextMenu() {
  const [states, setStates] = useState<editorContextMenuStates>({
    x: 0,
    y: 0,
    target: null,
  });
  const {
    canvas,
    methods: { history },
  } = useContext(ImageEditorContext);
  const { actions } = useImageEditorContextMenuModel({
    canvas,
    states,
    history,
  });

  const items = [
    {
      caption: "Go to Forward",
      onClick: () => actions("forward"),
    },
    {
      caption: "Go to Backward",
      onClick: () => actions("backward"),
    },
    {
      caption: "Delete",
      onClick: () => actions("delete"),
    },
  ];

  const handleMenu = (event: any) => {
    if (!canvas) return;
    event.e.preventDefault();
    const target = canvas.findTarget(event.e) ?? null;
    setStates({ x: target ? event.e.x : 0, y: target ? event.e.y : 0, target });
  };

  const reset = () => {
    if (!canvas) return;
    setStates({ x: 0, y: 0, target: null });
  };

  return { items, states, handleMenu, reset };
}

export default useImageEditorContextMenu;
