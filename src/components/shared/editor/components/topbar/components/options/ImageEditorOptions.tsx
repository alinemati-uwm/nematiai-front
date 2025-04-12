import React, { useContext, useRef, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import ImageEditorContext from "@/components/shared/editor/context";

import ImageEditorTopbarModal from "../Modal";
import ImageEditorNew from "./components/New";
import ImageEditorReset from "./components/reset/Reset";
import ImageEditorUpload from "./components/Upload";

function ImageEditorOptions() {
  const [modal, setModal] = useState(false);
  const ref = useRef(null);
  const {
    canvas,
    states: {
      defaults: { darkTheme },
    },
    props: { file },
  } = useContext(ImageEditorContext);

  return (
    <div className="relative" ref={ref}>
      <div
        className={`border border-muted-darker rounded flex flex-row py-1 px-3 pr-2 gap-x-2 items-center cursor-pointer  ${canvas ? "" : "pointer-events-none opacity-70"}`}
        onClick={() => setModal(prev => !prev)}
      >
        File
        <AppIcon
          width={20}
          className="relative top-0.5"
          icon="material-symbols:keyboard-arrow-down"
        />
      </div>
      {modal ? (
        <ImageEditorTopbarModal props={{ className: "py-3" }}>
          <div className="flex flex-col gap-y-4">
            <ImageEditorUpload closeModal={() => setModal(false)} />
            {!file ? (
              <ImageEditorNew closeModal={() => setModal(false)} />
            ) : null}
            <ImageEditorReset closeModal={() => setModal(false)} />
          </div>
        </ImageEditorTopbarModal>
      ) : null}
    </div>
  );
}

export default ImageEditorOptions;
