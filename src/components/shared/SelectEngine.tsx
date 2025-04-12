"use client";

import React, { useEffect, useState, type FocusEvent } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ClassValue } from "clsx";
import Image from "next/image";

import { SliderWithTooltip } from "@/components/shared/SliderWithTooltip";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useGetDictionary } from "@/hooks";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";
import { type ModelName } from "@/services/models";
import type { StateSetterType } from "@/services/types";

import AppIcon from "./AppIcon";
import { DescriptionHoverCard } from "./DescriptionHoverCard";

type EnginesType = keyof typeof enginesImage;
interface IProps {
  value: string;
  setValue: (item: string) => void;
  items: string[];
  onOpenChange: StateSetterType<boolean>;
  enginseName: Record<string, string> | undefined;
  enginseIcon: Record<string, string> | undefined;
}

/**
 * this component show a list of items in a command component that used in PopoverDrawer
 * @param items
 * @param setValue
 * @param value
 * @param onOpenChange
 * @constructor
 */

function CommandSelectItems({
  items,
  value,
  setValue,
  onOpenChange,
  enginseName,
  enginseIcon,
}: IProps) {
  const { common } = useGetDictionary();

  const setSelectedEngine = useFormStore.use.setSelectedEngine();

  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
    setSelectedEngine(item);
  }

  return (
    <Command>
      <CommandInput placeholder={common.search_placeholder} />
      <CommandList>
        <CommandEmpty>{common.no_result_message}</CommandEmpty>
        <CommandGroup>
          {items.map(item => (
            <CommandItem
              key={item}
              value={item}
              onSelect={handleSelectItem}
              className={cn(
                "text-smallm flex-row-reverse justify-between px-2 aria-selected:bg-transparent aria-selected:text-black ",
                value.toLowerCase() === item.toLowerCase() &&
                  "!bg-primary-lighter ",
              )}
            >
              <AppIcon
                icon="bi:check"
                className={cn(
                  "text-smallm me-2 h-4 w-4",
                  item.toLowerCase() === value.toLowerCase()
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />

              <div className="flex justify-start gap-2">
                <div className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image src={enginseIcon![item]} alt={item} fill />
                </div>
                {enginseName ? enginseName[item] : ""}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

type SliderProps = React.ComponentProps<typeof Slider> & {
  container?: HTMLDivElement | null;
  open?: boolean;
  onChangeHandler: (v: number[]) => void;
};

/**
 * this component show range input
 * it used in SettingPopover component
 * @param onChangeHandler
 * @param className
 * @param props
 * @constructor
 */

interface Prop {
  handleEngineSetting: (
    engineName: string,
    settingName: "top" | "temperature" | "presence" | "frequency",
    value: number,
  ) => void;
  engineValue: string;
  settingName: "top" | "temperature" | "presence" | "frequency";
  value: number[];
  max: number;
  min: number;
}
function Counter({
  handleEngineSetting,
  engineValue,
  settingName,
  value,
  max,
  min,
}: Prop) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEngineSetting(engineValue, settingName, parseFloat(e.target.value));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    let convertVal = parseFloat(e.target.value);
    if (isNaN(convertVal)) {
      convertVal = 0;
    } else {
      if (convertVal > max) {
        // It never gets bigger than maximom number
        convertVal = max;
      }
      if (convertVal < min) {
        // It never gets smaller than minimom number
        convertVal = min;
      }
    }
    let convertValStr = convertVal.toString();
    if (convertValStr.includes("-")) {
      if (convertValStr.length > 5) {
        // round the number
        convertValStr = convertValStr.slice(0, 5);
      }
    } else {
      if (convertValStr.length > 4) {
        // round the number
        convertValStr = convertValStr.slice(0, 4);
      }
    }

    handleEngineSetting(engineValue, settingName, parseFloat(convertValStr));
  };

  // ******************************************************************************************************

  const hendleKeyDown = (e: any) => {
    const num = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      ".",
    ];
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    if (!num.includes(e.key)) {
      // filter the illegal character

      e.preventDefault();
    }
  };

  return (
    <input
      value={value[0]}
      type="text"
      onBlur={handleBlur}
      onKeyDown={hendleKeyDown}
      onChange={handleChange}
      className="bg-muted border focus:border-primary-dark focus:text-primary-dark  outline-none w-12  h-8 items-center flex justify-center text-center"
    />
  );
}
function SliderSetting({
  onChangeHandler,
  className,
  min = 0,
  max = 1,
  step = 0.1,
  ...props
}: SliderProps) {
  return (
    <SliderWithTooltip
      value={props.value}
      min={min}
      max={max}
      step={step}
      className={cn("w-full", className)}
      onValueChange={onChangeHandler}
      {...props}
    />
  );
}

interface SettingPopoverProps {
  engine: Record<string, string>;
}
/**
 * this component show engines setting
 * @constructor
 */
function SettingPopover({ engine }: SettingPopoverProps) {
  const [open, setOpen] = useState(false);
  const {
    components: { select_engine },
  } = useGetDictionary();
  const engineSetting = useFormStore.use.engines();

  const handleEngineSetting = useFormStore.use.handleEngineSetting();
  // console.log('engineSetting',engineSetting);
  const engineSettingValue = engineSetting![engine.value];
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger
        asChild
        className="absolute end-8 top-1/2 -translate-y-1/2"
      >
        <AppIcon icon="tabler:settings" />
      </DialogTrigger>
      {}
      <DialogContent className=" h-[490px] w-[95%] rounded-lg lg:w-[483px] ">
        <VisuallyHidden>
          <DialogTitle>Select engine</DialogTitle>
        </VisuallyHidden>
        <div className="absolute top-0 flex h-full w-full flex-col  ">
          <div className="mx-4 mb-2 mt-3 flex justify-between ">
            <div className="flex items-center justify-between gap-2">
              <AppIcon icon="tabler:settings" className="text-2xl" />
              <h4 className="text-base font-medium">
                {select_engine.engine_setting}
              </h4>
            </div>
          </div>
          <div className=" mx-4 my-2 flex flex-col">
            <div className="mx-6 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="relative h-4 w-4 overflow-hidden rounded-full">
                  <Image src={engine.icon} alt={engine.title} fill />
                  {engine.icon}
                </div>
                <span className="text-base font-[500]">{engine.title}</span>
              </div>

              <div className=" flex flex-col">
                <span className="text-base text-label-light flex gap-1">
                  {select_engine.temperature}
                  <div className=" cursor-pointer">
                    <DescriptionHoverCard
                      state="info"
                      description="What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."
                    />
                  </div>
                </span>
                <div className="w-full flex gap-3">
                  <SliderSetting
                    open={open}
                    onChangeHandler={(v: number[]) =>
                      handleEngineSetting(engine.value, "temperature", v[0])
                    }
                    value={[engineSettingValue?.temperature]}
                    max={2}
                    key="temperature"
                  />
                  <Counter
                    handleEngineSetting={handleEngineSetting}
                    engineValue={engine.value}
                    key="temperature"
                    settingName="temperature"
                    max={2}
                    min={0}
                    value={[engineSettingValue?.temperature]}
                  />
                </div>
                <div className=" flex justify-between pr-16 mb-3">
                  <p>0</p>
                  <p>2</p>
                </div>

                <span className="text-base text-label-light flex gap-1">
                  {select_engine.frequency_penalty}
                  <div className=" cursor-pointer">
                    <DescriptionHoverCard
                      state="info"
                      description="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
                    />
                  </div>
                </span>
                <div className="w-full flex gap-3">
                  <SliderSetting
                    open={open}
                    onChangeHandler={(v: number[]) =>
                      handleEngineSetting(engine.value, "frequency", v[0])
                    }
                    min={-2}
                    max={2}
                    step={1}
                    value={[engineSettingValue?.frequency]}
                    key="frequency"
                  />
                  <Counter
                    handleEngineSetting={handleEngineSetting}
                    engineValue={engine.value}
                    settingName="frequency"
                    key="frequency"
                    max={2}
                    min={-2}
                    value={[engineSettingValue?.frequency]}
                  />
                </div>
                <div className=" flex justify-between  pr-16 mb-3">
                  <p>-2</p>
                  <p>2</p>
                </div>

                <span className="text-base text-label-light flex gap-1">
                  {select_engine.presence_penalty}
                  <div className=" cursor-pointer">
                    <DescriptionHoverCard
                      state="info"
                      description="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
                    />
                  </div>
                </span>
                <div className="w-full flex gap-3">
                  <SliderSetting
                    open={open}
                    min={-2}
                    max={2}
                    step={1}
                    onChangeHandler={(v: number[]) =>
                      handleEngineSetting(engine.value, "presence", v[0])
                    }
                    value={[engineSettingValue?.presence]}
                    key="presence"
                  />
                  <Counter
                    handleEngineSetting={handleEngineSetting}
                    engineValue={engine.value}
                    settingName="presence"
                    key="presence"
                    min={-2}
                    max={2}
                    value={[engineSettingValue?.presence]}
                  />
                </div>
                <div className=" flex justify-between  pr-16 mb-3">
                  <p>-2</p>
                  <p>2</p>
                </div>

                <span className="text-base text-label-light flex gap-1">
                  {select_engine.top}
                  <div className=" cursor-pointer">
                    <DescriptionHoverCard
                      state="info"
                      description="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered."
                    />
                  </div>
                </span>
                <div className="w-full flex gap-3 ">
                  <SliderSetting
                    open={open}
                    onChangeHandler={(v: number[]) =>
                      handleEngineSetting(engine.value, "top", v[0])
                    }
                    value={[engineSettingValue?.top]}
                    key="top"
                  />
                  <Counter
                    handleEngineSetting={handleEngineSetting}
                    engineValue={engine.value}
                    settingName="top"
                    key="top"
                    min={0}
                    max={1}
                    value={[engineSettingValue?.top]}
                  />
                </div>
                <div className=" flex justify-between pr-16 ">
                  <p>0</p>
                  <p>1</p>
                </div>
              </div>
              <div className=" ml-auto flex flex-row gap-3  pt-3 ">
                <Button
                  type="submit"
                  className="text-[#9373EE] h-input w-20 bg-primary-lighter text-primary hover:text-white"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel{" "}
                </Button>
                <Button
                  type="submit"
                  onClick={() => setOpenModal(false)}
                  className="h-input w-20"
                >
                  Save{" "}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * this component create a select or drawer(in desktop show select and mobile show drawer)
 * to show available engines with settings(Temperature,...)
 * @constructor
 */
function SelectEngineDropDown({
  buttonStyle,
  engines,
  enginesName,
  enginesIcon,
  onChange = () => {},
  selectedEngineChat,
}: {
  buttonStyle?: ClassValue;
  engines: string[];
  enginesName: Record<string, string> | undefined;
  enginesIcon: Record<string, string> | undefined;
  selectedEngineChat: string | undefined;
  onChange?: (value: any) => void;
}) {
  // const [searchParams, setSearchParams] = useCustomSearchParams();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<undefined | boolean>(undefined);
  // const [engine,setSelectedEngine] = useState(engines[0])
  // const engine = useMemo(() => searchParams.get("engine") ?? engines[0], [searchParams]);
  //using store
  const initialEngine = useFormStore.use.initialEngine();
  const engineSetting = useFormStore.use.engines();

  const setSelectedEngine = useFormStore.use.setSelectedEngine(); // value
  const selectedEngine = useFormStore.use.selectedEngine(); // value
  //
  // console.log('engines',engines);
  // console.log('engineSetting',engineSetting);
  const {
    components: { select_engine },
  } = useGetDictionary();

  //initialize the store
  useEffect(() => {
    initialEngine(engines);
    if (selectedEngineChat && engines.includes(selectedEngineChat)) {
      setSelectedEngine(selectedEngineChat);
    } else if (engines.length) {
      setSelectedEngine(engines[0]);
    }
  }, [engines]);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);
  function handleSelect(item: string) {
    setSelectedEngine(item);
    onChange(item);
  }

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="relative">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-between px-2 py-2  ", buttonStyle)}
            >
              <div className="flex justify-start gap-2 max-w-[calc(100%-20px)]">
                <div className="relative h-5 w-5 min-w-5 overflow-hidden rounded-full">
                  <Image
                    src={
                      enginesIcon
                        ? enginesIcon[selectedEngine]
                        : "/images/gpts/gpt.jpeg"
                    }
                    alt={selectedEngine}
                    fill
                  />
                </div>
                <div className={`${engineSetting && "pr-4 "} truncate`}>
                  {enginesName ? enginesName[selectedEngine] : ""}
                </div>
              </div>

              <span data-open={open}>
                <AppIcon
                  icon="bi:chevron-down"
                  className="h-4 w-4 opacity-50"
                />
              </span>
            </Button>
          </DrawerTrigger>
          {engineSetting && (
            <SettingPopover
              engine={
                enginesName
                  ? {
                      title: enginesName[selectedEngine],
                      icon: enginesIcon
                        ? enginesIcon[selectedEngine]
                        : "/images/gpts/gpt.jpeg",
                      value: selectedEngine,
                    }
                  : { icon: "", title: "" }
              }
            />
          )}
        </div>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CommandSelectItems
              items={engines}
              value={selectedEngine}
              onOpenChange={setOpen}
              enginseName={enginesName}
              enginseIcon={enginesIcon}
              setValue={onChange}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Select value={selectedEngine} onValueChange={handleSelect}>
      <div className="relative">
        <SelectTrigger
          className={cn("!text-smallm m-0 w-full text-label", buttonStyle)}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        {engineSetting && (
          <SettingPopover
            engine={
              enginesName
                ? {
                    title: enginesName[selectedEngine],
                    icon: enginesIcon
                      ? enginesIcon[selectedEngine]
                      : "/images/gpts/gpt.jpeg",
                    value: selectedEngine,
                  }
                : { icon: "", title: "", value: "" }
            }
          />
        )}
      </div>
      <SelectContent className="h-auto">
        <SelectGroup>
          <SelectLabel className="text-smallm relative right-6 font-semibold">
            {select_engine.engines}
          </SelectLabel>
          {engines.map(item => (
            <SelectItem
              key={item}
              value={item}
              className={cn(
                "text-smallm flex-row-reverse justify-between px-2",
                selectedEngine.toLowerCase() === item.toLowerCase() &&
                  "bg-holder-lighter focus:bg-holder-lighter",
              )}
            >
              <div className="flex justify-start gap-2">
                <div className="relative min-h-5 min-w-5  overflow-hidden rounded-full">
                  <Image
                    src={
                      enginesIcon ? enginesIcon[item] : "/images/gpts/gpt.jpeg"
                    }
                    alt={item}
                    fill
                  />
                </div>
                <div
                  title={item}
                  className={`${engineSetting && "pr-4 "} truncate`}
                >
                  {enginesName ? enginesName[item] : ""}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface SelectEngineProps extends React.ComponentPropsWithoutRef<"div"> {
  buttonStyle?: ClassValue;
  title?: string;
  titleStyle?: string;
  app_type: ModelName;
  onChange?: (val: any) => void;
  selectedEngineChat?: string;
}
export function SelectEngine({
  className,
  buttonStyle,
  title,
  titleStyle,
  app_type,
  onChange = () => {},
  selectedEngineChat,
  ...divProps
}: SelectEngineProps) {
  const {
    components: { select_engine },
  } = useGetDictionary();

  // const totalEngines = useFormStore.use.totalEngines();
  const {
    engines: appTypeEngines,
    enginesName: appTypeEnginesName,
    enginesIcon: appTypeEnginesIcon,
  } = useGetAppTypeEngines({ GetAllModels: { modelName: app_type } });
  console.log("dasd", appTypeEngines);

  return (
    <div
      className={cn("flex flex-col justify-center gap-2", className)}
      {...divProps}
    >
      <Label className={cn(titleStyle)}>
        {title ?? select_engine.engine_label}
      </Label>

      <SelectEngineDropDown
        buttonStyle={buttonStyle}
        engines={appTypeEngines}
        enginesName={appTypeEnginesName}
        onChange={onChange}
        enginesIcon={appTypeEnginesIcon}
        selectedEngineChat={selectedEngineChat}
      />
    </div>
  );
}

// TODO: replace this with the actual data from the API
const enginesImage = {
  "GPT-3.5 Turbo": "/images/gpts/gpt.jpeg",
  "GPT-4 Turbo": "/images/gpts/gpt.jpeg",
  "Claude-instant": "/images/gpts/cloude.png",
  "Claude-2": "/images/gpts/cloude.png",
  "Gemini Pro": "/images/gpts/gemni.jpeg",
};

const defaultEngine = ["gpt-3.5-turbo-0125"];
