import React, { useContext, useMemo } from "react";

import AppIcon from "@/components/shared/AppIcon";

import ImageEditorContext from "../../../../context";
import CaptionTopbar from "../Caption";
import historyTopbarModel from "./model";
import useHistoryEditor from "./useHistoryEditor";

function ImageEditorHistory() {
  const context = useContext(ImageEditorContext);
  const { isFirstOrLastTimestamp } = historyTopbarModel;
  const { undoRedo } = useHistoryEditor(context);

  const checkIndex = useMemo(
    () => isFirstOrLastTimestamp(context.states.history),
    [context.states.history],
  );

  return (
    <div className="flex flex-row gap-x-5">
      <CaptionTopbar
        disable={checkIndex.first}
        icon={<AppIcon width={20} icon="material-symbols:undo" />}
        title="Undo"
        onClick={() => undoRedo(true)}
      />
      <CaptionTopbar
        disable={checkIndex.last}
        icon={<AppIcon width={20} icon="material-symbols:redo" />}
        title="Redo"
        onClick={() => undoRedo(false)}
      />
    </div>
  );
}

export default ImageEditorHistory;
