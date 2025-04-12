import { useFormStore } from "@/stores/zustand/apps-form-section-store";

import { type settingContainerProps } from "./Container";

interface Iprop extends settingContainerProps {
  localValue: string;
  setLocalValue: (str: string) => void;
}

function useSettingModelContainer({
  max,
  min,
  type,
  localValue,
  setLocalValue,
}: Iprop) {
  const { handleEngineSetting } = useFormStore();
  const selectedEngine = useFormStore.use.selectedEngine();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^-?\d*\.?\d*$/.test(val)) {
      setLocalValue(val);
    }

    handleEngineSetting(selectedEngine, type, val);
  };

  const handleBlur = () => {
    let convertVal = parseFloat(localValue);
    if (isNaN(convertVal)) {
      convertVal = 0;
    } else {
      if (convertVal > max) convertVal = max;
      if (convertVal < min) convertVal = min;
    }
    let convertValStr = convertVal.toString();
    if (convertValStr.includes("-")) {
      if (convertValStr.length > 5) convertValStr = convertValStr.slice(0, 5);
    } else {
      if (convertValStr.length > 4) convertValStr = convertValStr.slice(0, 4);
    }
    setLocalValue(convertValStr);
    handleEngineSetting(selectedEngine, type, parseFloat(convertValStr));
  };

  return { handleBlur, handleChange };
}

export default useSettingModelContainer;
