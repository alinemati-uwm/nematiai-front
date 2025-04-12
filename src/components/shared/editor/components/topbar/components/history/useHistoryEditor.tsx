import useImageEditorModel from "@/components/shared/editor/hooks/main/model";
import historyImageEditorModel from "@/components/shared/editor/hooks/main/modules/history";
import type imageEditorTypes from "@/components/shared/editor/type";

import historyTopbarModel from "./model";

type props = imageEditorTypes["context"];

function useHistoryEditor({
  canvas,
  states: { history, file },
  methods: { updateState },
}: props) {
  const { created, updateObject } = historyTopbarModel;
  const { retrieveTimelineStepKey } = historyImageEditorModel;
  const { availableObjects } = useImageEditorModel;

  const undoRedo = (undo: boolean) => {
    const retrieveTimeline = retrieveTimelineStepKey({ history, undo });
    if (!canvas || !retrieveTimeline) return;
    canvas.discardActiveObject();
    const undoObject = history.timeline[retrieveTimeline];
    if (undoObject && file) {
      if (undoObject.length !== canvas.getObjects().length) {
        availableObjects(canvas.getObjects()).forEach(obj => {
          canvas.remove(obj);
        });
        availableObjects(undoObject).forEach(
          async (props: imageEditorTypes["customs"]["FabricObject"]) => {
            created({ canvas, file, props });
          },
        );
      } else {
        canvas
          .getObjects()
          .forEach((item: imageEditorTypes["customs"]["FabricObject"]) => {
            updateObject({ item, undoObject });
          });
      }
      canvas.requestRenderAll();
      updateState("history", {
        timestamp: parseInt(retrieveTimeline),
        timeline: history.timeline,
        canvas: history.canvas,
      });
    }
  };
  return { undoRedo };
}

export default useHistoryEditor;
