import React, { useEffect } from "react";

import { type SetStateAction } from "jotai";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";
import { type ModelName } from "@/services/models";

import styles from "./SelectedModelAi.module.css";

/**
 * Component to select and display a model AI engine.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.selectedEngine - The currently selected engine.
 * @param {React.Dispatch<SetStateAction<string>>} props.setSelectedEngine - Function to set the selected engine.
 * @param {string} [props.triggerClass=""] - Additional class names for the select trigger.
 * @param {ModelName} props.modelName - The name of the model.
 * @param {boolean} [props.showTitle=true] - Flag to indicate if the title should be shown.
 */
const SelectedModelAi = ({
  selectedEngine,
  setSelectedEngine,
  triggerClass = "",
  modelName,
  showTitle = true,
}: {
  setSelectedEngine: React.Dispatch<SetStateAction<string>>;
  selectedEngine: string;
  triggerClass?: string;
  modelName: ModelName;
  showTitle: boolean;
}) => {
  const {
    engines: enginesTypes,
    enginesIcon,
    enginesName: enginesTypesName,
  } = useGetAppTypeEngines({ GetAllModels: { modelName } });

  console.log(enginesTypes);

  const {
    components: { select_engine },
  } = useGetDictionary();

  //initialize the store
  useEffect(() => {
    if (enginesTypes && enginesTypes.length !== 0)
      setSelectedEngine(enginesTypes[0]);
  }, [enginesTypes]);

  function handleSelect(item: string) {
    setSelectedEngine(item);
  }

  return (
    <Select value={selectedEngine} onValueChange={handleSelect}>
      <SelectTrigger
        className={cn("!text-small !w-20 h-8 text-label ", triggerClass)}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="!z-[150]" side="top">
        <SelectGroup>
          <SelectLabel className="text-smallm font-semibold">
            {select_engine.engines}
          </SelectLabel>
          {enginesTypes.map(item => (
            <SelectItem
              key={item}
              value={item}
              className={cn(
                "text-smallm flex-row-reverse justify-between px-2",
                selectedEngine?.toLowerCase() === item.toLowerCase() &&
                  "bg-primary-lighter focus:bg-primary-light",
              )}
            >
              <div
                className={
                  "flex justify-start gap-2 whitespace-nowrap " +
                  styles.holderTitle
                }
              >
                <div
                  className={
                    "relative h-5 w-5  overflow-hidden rounded-full " +
                    styles.iconTitle
                  }
                >
                  <Image src={enginesIcon![item]} alt={item} fill />
                </div>
                <label className={styles.textTile}>
                  {enginesTypesName ? enginesTypesName[item] : ""}
                </label>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectedModelAi;
