import React, { useContext, useEffect, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../../context";
import ImageEditorPanelTools from "../../layers/Tools";
import useImageEditorPanelTools from "../../layers/useHook";
import MobileToolsContainer from "./Container";

function MobileToolsOptions() {
  const [modal, setModal] = useState(false);
  const { breakpoint } = useBreakpoint();
  const {
    states: {
      selectedObject,
      defaults: { darkTheme },
    },
  } = useContext(ImageEditorContext);
  const { getItem } = useImageEditorPanelTools();

  const icon = (
    <AppIcon
      width={breakpoint === "xs" ? 18 : 26}
      icon="iconamoon:options-light"
    />
  );

  useEffect(() => {
    setModal(false);
  }, [selectedObject]);

  return getItem()?.tools?.length ? (
    <>
      <MobileToolsContainer props={{ onClick: () => setModal(prev => !prev) }}>
        <div className="flex justify-between items-center">{icon}</div>
      </MobileToolsContainer>
      {modal ? (
        <div className="fixed left-0 bottom-0 right-0">
          {breakpoint === "xs" ? (
            <div
              className={`fixed left-0 right-0 bottom-0 ${darkTheme ? "bg-gray-700" : "bg-white"} p-4`}
            >
              <AppIcon
                onClick={() => setModal(false)}
                icon="ic:round-close"
                className="absolute right-0 top-0 m-4"
                width={20}
              />
              <ImageEditorPanelTools />
            </div>
          ) : (
            <div
              className={`absolute right-[100px] rounded bottom-0 m-6 ${darkTheme ? "bg-gray-700" : "bg-white"} p-4`}
            >
              <ImageEditorPanelTools />
            </div>
          )}
        </div>
      ) : null}
    </>
  ) : null;
}

export default MobileToolsOptions;
