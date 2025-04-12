import { useEffect } from "react";

import useHookShapes from "../../components/sidebar/components/items/modules/shapes/useHookShapes";
import useHistoryEditor from "../../components/topbar/components/history/useHistoryEditor";
import type imageEditorTypes from "../../type";
import useImageEditorItems from "../useImageEditorItems";

type props = imageEditorTypes["context"];

function useShortKeys(props: props) {
  const {
    canvas,
    states: {
      selectedObject,
      history,
      file,
      defaults: { colorPicker },
    },
    props: {
      modal: { toggle },
    },
    methods,
  } = props;
  const { undoRedo } = useHistoryEditor(props);
  const menues = {
    tools: useImageEditorItems(props),
    shapes: useHookShapes(props),
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!event.key || !file) return;

    const controlKey = event.ctrlKey || event.metaKey;

    if (event.keyCode === 27) {
      // Escape key: Close or toggle off
      toggle(false);
    } else if (event.keyCode === 46 && selectedObject) {
      // Delete key: Remove selected object
      canvas?.remove(selectedObject);
      canvas?.requestRenderAll();
      methods.history.add();
    } else if (controlKey) {
      if (event.keyCode === 90) {
        // Ctrl + Z: Undo
        undoRedo(true);
      } else if (event.keyCode === 89) {
        // Ctrl + Y: Redo
        undoRedo(false);
      } else if (event.altKey) {
        // Ctrl + Alt + [key]
        const shortkeys = [...menues.tools.items, ...menues.shapes.items];
        shortkeys.forEach(el => {
          if (el.shortKey.codeKey === event.keyCode) {
            el.onClick();
            canvas?.requestRenderAll();
          }
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedObject, history, canvas, colorPicker]);
}

export default useShortKeys;
