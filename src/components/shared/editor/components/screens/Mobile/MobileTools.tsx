import React, { useContext } from "react";

import ImageEditorContext from "../../../context";
import StrokeImageEditor from "../../sidebar/components/Stroke";
import ImageEditorColorPicker from "../../topbar/components/components/colorpicker/ColorPicker";
import ImageEditorHistory from "../../topbar/components/history/History";
import MobileToolsContainer from "../components/Container";
import LayersMobile from "../components/LayersMobile";
import MobileToolsOptions from "../components/MobileToolsOptions";

function MobileTools() {
  const {
    states: { selectedObject },
  } = useContext(ImageEditorContext);
  return (
    <>
      <div className="flex justify-between p-4 items-center relative z-20">
        <div className="flex flex-row items-center gap-x-3">
          <MobileToolsContainer>
            <ImageEditorHistory />
          </MobileToolsContainer>
          <ImageEditorColorPicker />
          {selectedObject ? (
            <div className="flex justify-center">
              <StrokeImageEditor />
            </div>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <MobileToolsOptions />
          <LayersMobile />
        </div>
      </div>
    </>
  );
}

export default MobileTools;
