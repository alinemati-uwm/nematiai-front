import React, { useContext, useEffect, useState } from "react";

import { type FabricObject } from "fabric";
import Image from "next/image";
import { useDebounceCallback } from "usehooks-ts";

import ImageEditorContext from "../../../../context";
import type imageEditorTypes from "../../../../type";
import ImageEditorDelete from "../Delete";
import ImageEditorLock from "../Lock";
import ImageEditorView from "../View";
import ImageToolsLayersModel from "./model";

function ImageEditorLayers() {
  const {
    canvas,
    states: { selectedObject },
  } = useContext(ImageEditorContext);
  const [items, setItems] = useState<
    imageEditorTypes["customs"]["FabricObject"][] | []
  >([]);
  const { getThumbnail } = ImageToolsLayersModel;

  const handleEvent = useDebounceCallback(
    () =>
      canvas &&
      setItems(
        canvas.getObjects().length
          ? canvas
              .getObjects()
              .filter(
                (el: imageEditorTypes["customs"]["FabricObject"]) =>
                  el.id && !["_frame"].includes(el.id),
              )
          : [],
      ),
    500,
  );

  useEffect(() => {
    handleEvent();
  }, []);

  useEffect(() => {
    if (canvas) canvas.on("after:render", handleEvent);
    return () => {
      if (canvas) canvas.off("after:render", handleEvent);
    };
  }, [canvas]);

  const onSelectObject = (el: FabricObject) => {
    if (!canvas || !el.evented) return;
    canvas.setActiveObject(el);
    canvas.renderAll();
  };

  const isSelected = (el: FabricObject) => {
    if (!canvas) return;
    return el === selectedObject;
  };

  return (
    <>
      {items && items.length ? (
        <div className="flex flex-col">
          <div className="hidden sm:visible">
            <strong>Layers</strong>
          </div>
          <div className="flex flex-col-reverse gap-y-1 p-2 lg:p-0">
            {items.map((el, key) => (
              <div
                key={key}
                className="flex flex-row justify-between items-center gap-x-1 p-1 rounded bg-muted"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 relative cursor-pointer flex justify-center items-center border ${isSelected(el) ? "border-primary-light" : "border-transparent"} overflow-hidden sm:p-0.5 rounded`}
                  onClick={() => onSelectObject(el)}
                >
                  <Image
                    src={
                      getThumbnail({ object: el, quality: 1, multiplier: 0.2 })
                        .thumbnail
                    }
                    alt=""
                    width={50}
                    height={50}
                    className="w-[100%] h-auto rounded"
                  />
                </div>
                <div className="w-2/5 flex flex-row justify-end items-center gap-x-1 sm:gap-x-2">
                  {el.id !== "background" ? (
                    <>
                      <ImageEditorDelete object={el} />
                      <ImageEditorView object={el} />
                    </>
                  ) : null}
                  <ImageEditorLock object={el} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 text-small text-gray-400">Empty Layers</div>
      )}
    </>
  );
}

export default ImageEditorLayers;
