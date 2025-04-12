import React, { useContext, useEffect, useRef, useState } from "react";

import * as Slider from "@radix-ui/react-slider";
import { Point } from "fabric";

import AppIcon from "@/components/shared/AppIcon";
import useOutsideClick from "@/hooks/useOutSideClick";

import ImageEditorContext from "../../../../context";
import imageEditorModel from "../../../../model";
import ImageEditorTopbarModal from "../Modal";

function ImageEditorZoom() {
  const [size, setSize] = useState(1);
  const [modal, setModal] = useState(false);
  const {
    canvas,
    states: {
      defaults: { darkTheme },
    },
  } = useContext(ImageEditorContext);
  const ref = useRef(null);
  useOutsideClick(ref, true, () => setModal(false));

  const defaultZoom = canvas ? imageEditorModel.detectZoomFit(canvas) : null;

  const { maxZoom, minZoom } = {
    maxZoom: canvas ? imageEditorModel.maxZoom(canvas) : 1,
    minZoom: canvas ? imageEditorModel.minZoom(canvas) : 1,
  };

  useEffect(() => {
    if (!canvas || !defaultZoom) return;
    const zoomPercentage =
      ((canvas.getZoom() - minZoom) / (maxZoom - minZoom)) * 100;
    setSize(Math.round(zoomPercentage));
  }, [defaultZoom, canvas]);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:wheel", () => {
      const zoomPercentage = Math.round(
        ((canvas.getZoom() - minZoom) / (maxZoom - minZoom)) * 100,
      );
      setSize(zoomPercentage > 1 ? Math.round(zoomPercentage) : 1);
    });
  }, [canvas, maxZoom, minZoom]);

  return (
    <div className="flex flex-row items-center gap-x-1 relative" ref={ref}>
      <div
        className="border-b border-b-muted-darker flex flex-row items-center gap-x-2 pb-0.5 cursor-pointer"
        onClick={() => setModal(prev => !prev)}
      >
        <strong>{size}%</strong>
        <AppIcon width={20} icon="material-symbols:keyboard-arrow-down" />
      </div>
      {modal ? (
        <ImageEditorTopbarModal>
          <Slider.Root
            className="relative flex h-4 w-[200px] select-none items-center"
            max={100}
            min={1}
            value={[size]}
            onValueChange={value => {
              if (!defaultZoom || !canvas) return;
              const newZoom = minZoom + (value[0] / 100) * (maxZoom - minZoom);
              setSize(value[0]);
              const objectCenter = canvas.getCenterPoint();
              canvas.zoomToPoint(
                new Point(objectCenter.x, objectCenter.y),
                newZoom,
              );
              canvas.requestRenderAll();
            }}
          >
            <Slider.Track className="relative h-1 w-full bg-gray-400 grow overflow-hidden rounded-full">
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-primary-dark border-white cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </Slider.Root>
        </ImageEditorTopbarModal>
      ) : null}
    </div>
  );
}

export default ImageEditorZoom;
