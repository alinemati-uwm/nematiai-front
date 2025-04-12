import React, { useContext, useEffect, useRef, useState } from "react";

import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/plate-ui/button";
import { AppTooltip } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { Input } from "@/components/ui/input";
import useBreakpoint from "@/hooks/useBreakpoint";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useGetDictionary } from "@/hooks";

import ImageEditorContext from "../../../context";
import SelectboxFontTool from "../../topbar/components/components/text/component/SelectboxFontTool";
import ImageEditorTopbarModal from "../../topbar/components/Modal";

function StrokeImageEditor() {
  const {
    states: {
      selectedObject,
      defaults: { darkTheme },
    },
    methods: { history },
    canvas,
  } = useContext(ImageEditorContext);
  const [states, setStates] = useState({
    color: "#777",
    modal: false,
    size: 1,
    dashed: false,
  });
  const {
    common: { apply },
  } = useGetDictionary();
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));
  const ref = useRef(null);
  const { isLessThan } = useBreakpoint();

  useOutsideClick(ref, true, () => updateState("modal", false));

  useEffect(() => {
    if (selectedObject)
      setStates({
        color: selectedObject?.stroke?.toString() ?? "#777",
        modal: false,
        size:
          !selectedObject?.strokeWidth || selectedObject?.strokeWidth === 0
            ? 1
            : selectedObject.strokeWidth,
        dashed: Boolean(selectedObject?.strokeDashArray?.length),
      });
  }, [selectedObject]);

  const applyStroke = () => {
    if (!selectedObject || !canvas) return;
    selectedObject.set({
      stroke: states.color,
      strokeWidth: states.size,
      strokeDashArray: states.dashed ? [states.size, 1] : false,
    });
    canvas.requestRenderAll();
    history.add();
    if (isLessThan("md")) updateState("modal", false);
  };

  const permission = selectedObject?.customType !== "arrow";

  return (
    <div className="relative" ref={ref}>
      <div className="flex justify-center">
        <AppTooltip title="Stroke" side="right">
          <AppIcon
            icon="tabler:rotate-rectangle"
            className="cursor-pointer"
            width={24}
            onClick={() => updateState("modal", !states.modal)}
          />
        </AppTooltip>
      </div>

      {states.modal ? (
        <ImageEditorTopbarModal
          props={{
            className:
              "translate-x-0 bottom-[40px] right-auto sm:left-[50px] flex flex-col gap-y-3 sm:bottom-[-31px] top-auto",
          }}
        >
          {/*@ts-ignore*/}
          <HexColorPicker
            color={states.color}
            onChange={e => updateState("color", e)}
          />
          <div className="flex flex-row gap-x-2">
            {permission ? (
              <SelectboxFontTool
                items={[
                  { caption: "Solid", value: "solid" },
                  { caption: "Dashed", value: "dashed" },
                ]}
                props={{
                  onChange: e =>
                    updateState("dashed", e.target.value !== "solid"),
                  value: states.dashed ? "dashed" : "solid",
                }}
              />
            ) : null}
            <Input
              type="text"
              name=""
              value={states.size}
              onChange={e =>
                updateState(
                  "size",
                  e.target.value && parseInt(e.target.value) >= 0
                    ? parseInt(e.target.value)
                    : 0,
                )
              }
            />
          </div>
          <Button onClick={applyStroke} className="text-white">
            {apply}
          </Button>
        </ImageEditorTopbarModal>
      ) : null}
    </div>
  );
}

export default StrokeImageEditor;
