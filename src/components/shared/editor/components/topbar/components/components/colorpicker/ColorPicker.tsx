import React, { useContext, useEffect, useRef, useState } from "react";

import { HexColorPicker } from "react-colorful";

import { AppTooltip } from "@/components/shared";
import type imageEditorTypes from "@/components/shared/editor/type";
import { Input } from "@/components/ui/input";
import useOutsideClick from "@/hooks/useOutSideClick";

import ImageEditorContext from "../../../../../context";
import ImageEditorTopbarModal from "../../Modal";
import imageEditorColorPickerModel from "../model";
import OpacitySlider from "./Opacity";

function ImageEditorColorPicker() {
  const {
    canvas,
    states: { selectedObject, toolActive, defaults },
    methods: { updateState, history },
  } = useContext(ImageEditorContext);

  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState(defaults.colorPicker);
  const [opacity, setOpacity] = useState(100);
  const ref = useRef(null);
  const { detectColor } = imageEditorColorPickerModel;
  useOutsideClick(ref, true, () => setIsOpen(false));

  const mapToRange = (input: number) =>
    parseFloat((((input - 1) / (100 - 1)) * (1 - 0.1) + 0.1).toFixed(1));
  const reverseMapToRange = (input: number) =>
    Math.round(((input - 0.1) / (1 - 0.1)) * (100 - 1) + 1);

  useEffect(() => {
    setBackground(detectColor(selectedObject) ?? defaults.colorPicker);
    setOpacity(
      selectedObject?.opacity ? reverseMapToRange(selectedObject.opacity) : 100,
    );
  }, [selectedObject, toolActive]);

  const changeColor = () => {
    if (!canvas) return;
    const activeObject: imageEditorTypes["customs"]["FabricObject"] =
      selectedObject as imageEditorTypes["customs"]["FabricObject"];
    if (
      activeObject &&
      !["background", "_frame"].includes(activeObject?.id ?? "")
    ) {
      activeObject?.set({
        [["path", "line"].includes(activeObject.type.toLowerCase()) &&
        activeObject?.customType !== "arrow"
          ? "stroke"
          : "fill"]: background,
        color: background,
        opacity: mapToRange(opacity),
      });
      canvas.requestRenderAll();
      history.add();
    } else updateState("defaults", { ...defaults, colorPicker: background });
  };

  useEffect(() => {
    changeColor();
  }, [background]);

  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-row gap-x-1">
        <AppTooltip title="Color picker" side="right">
          <div
            className="w-7 h-7 sm:w-5 sm:h-5 border bg-muted cursor-pointer rounded-full sm:rounded-sm"
            onClick={() => setIsOpen(prev => !prev)}
            style={{ background }}
          />
        </AppTooltip>
      </div>
      {isOpen ? (
        <ImageEditorTopbarModal
          props={{
            className:
              "translate-x-0 bottom-[40px] right-auto sm:left-[50px] sm:bottom-[-31px] top-auto",
          }}
        >
          {/*@ts-ignore*/}
          <HexColorPicker color={background} onChange={e => setBackground(e)} />
          <div className="flex flex-col gap-label-space">
            <div className="w-full">
              <OpacitySlider
                color={background}
                onChange={value => setOpacity(value)}
                opacity={opacity}
              />
            </div>
            <Input
              type="text"
              value={background.replace("#", "")}
              placeholder="000000"
              icon="mdi:hashtag"
              maxLength={6}
              onChange={e => setBackground("#" + e.target.value)}
            />
            {/*<Button onClick={changeColor}>Apply</Button>*/}
          </div>
        </ImageEditorTopbarModal>
      ) : null}
    </div>
  );
}

export default ImageEditorColorPicker;
