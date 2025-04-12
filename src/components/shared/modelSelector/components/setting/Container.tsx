import React, { useContext, useState } from "react";

import { AppTooltip } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { SliderWithTooltip } from "@/components/shared/SliderWithTooltip";
import AppTypo from "@/components/ui/AppTypo";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { type settingModelNames } from "@/stores/zustand/types";

import AppModelSelectorContext from "../../context";
import useSettingModelContainer from "./useSettingModelContainer";

export type settingContainerProps = {
  title: string;
  description: string;
  step: number;
  min: number;
  max: number;
  type: settingModelNames;
};

function SettingModalContainer(props: settingContainerProps) {
  const { description, type, title, step, max, min } = props;
  const {
    props: { model },
  } = useContext(AppModelSelectorContext);
  const { handleEngineSetting } = useFormStore();
  const selectedEngine = useFormStore.use.selectedEngine();
  const engineSetting = useFormStore.use.engines();

  const engineSettingValue = model?.value
    ? engineSetting?.[model.value]
    : selectedEngine
      ? engineSetting![selectedEngine]
      : null;

  const value = engineSettingValue ? engineSettingValue[type] : 0;
  const [localValue, setLocalValue] = useState(String(value ?? ""));
  const { handleBlur, handleChange } = useSettingModelContainer({
    description,
    type,
    title,
    step,
    max,
    min,
    localValue,
    setLocalValue,
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-x-2">
        <AppTypo color="secondary">{title}</AppTypo>
        <AppTooltip title={description}>
          <AppIcon icon="lucide:info" width={14} />
        </AppTooltip>
      </div>
      <div className="flex flex-row items-baseline justify-between gap-x-2">
        <div className="w-full flex flex-col gap-y-2">
          <SliderWithTooltip
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={e => {
              handleEngineSetting(selectedEngine, type, e[0]);
              setLocalValue(e[0].toString());
            }}
          />
          <div className="flex flex-row justify-between">
            <AppTypo variant="small">{min}</AppTypo>
            <AppTypo variant="small">{max}</AppTypo>
          </div>
        </div>
        <div className="w-14">
          <Input
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}

export default SettingModalContainer;
