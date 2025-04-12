"use client";

import React, {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type InputHTMLAttributes,
} from "react";

import type { SelectProps } from "@radix-ui/react-select";
import { type Root } from "@radix-ui/react-slider";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn, getFileAddress } from "@/lib/utils";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { DynamicInput, DynamicInputOption } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";

import ImageEditorMask from "../../../shared/mask/ImageEditorMask";

type ChangeValue = { onChangeValue: (val: string | number) => void };

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  DynamicInput &
  ChangeValue;
type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> &
  DynamicInput &
  ChangeValue;
type SingleSelectProps = SelectProps &
  DynamicInput &
  ChangeValue & { select?: keyof DynamicInputOption };
type RangeProps = ComponentPropsWithoutRef<typeof Root> &
  DynamicInput &
  ChangeValue;
type AppFileProps = InputHTMLAttributes<HTMLInputElement> &
  DynamicInput & {
    onChangeValue(file: File | null): void;
    value: File;
    editor?: boolean;
  } & ChangeValue;

export function TextInput({
  placeholder,
  defaultValue,
  onChangeValue,
  value,
  isAdvance,
  ...otherProps
}: InputProps) {
  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      {...otherProps}
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function NumberInput({
  placeholder,
  defaultValue,
  isAdvance,
  onChangeValue,
  ...otherProps
}: InputProps) {
  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...otherProps}
      type="number"
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function LongTextInput({
  placeholder,
  defaultValue,
  onChangeValue,
  isAdvance,
  className,
  ...otherProps
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={5}
      className={cn(
        "w-full rounded border bg-input p-4 outline-none ring-0 focus:border-primary focus:bg-holder-lighter",
        className,
      )}
      {...otherProps}
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function SingleSelect({
  placeholder,
  defaultValue,
  options = [],
  value,
  select,
  onChangeValue,
  ...otherProps
}: SingleSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChangeValue}
    >
      <SelectTrigger className="col-span-8 md:col-span-2 hover:border-muted-darker hover:bg-muted-dark transition-all">
        <SelectValue placeholder={placeholder} {...otherProps} />
      </SelectTrigger>
      <SelectContent className="max-h-[40dvh]" position="item-aligned">
        {options.map(item => (
          <SelectItem key={item.id} value={select ? item[select] : item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TextListInputs({
  placeholder,
  defaultValue,
  className,
  id,
  options = [],
  ...otherProps
}: InputProps) {
  const addCustomTemplateOption =
    useTemplateStore.use.addCustomTemplateOption();
  const changeCustomTemplateInputOptionValue =
    useTemplateStore.use.changeCustomTemplateInputOptionValue();
  const deleteCustomTemplateInputOption =
    useTemplateStore.use.deleteCustomTemplateInputOption();

  const addOption = () => {
    addCustomTemplateOption(id, {
      id: uuidv4(),
      value: `option-${options.length + 1}`,
    });
  };
  return (
    <div className={cn("col gap-2", className)} {...otherProps}>
      {options.map(option => (
        <div key={option.id} className="row gap-2">
          <Input
            className="h-10 w-fit flex-grow"
            value={option.value}
            onChange={e =>
              changeCustomTemplateInputOptionValue(
                id,
                option.id,
                e.target.value,
              )
            }
          />
          <Button
            className="h-8 w-8 rounded-full bg-danger-dark/10 p-1 text-danger-darker hover:bg-danger-dark/30"
            onClick={() => deleteCustomTemplateInputOption(id, option.id)}
          >
            <AppIcon icon="tabler:trash" width={15} />
          </Button>
        </div>
      ))}
      <Button className="h-8 w-8 rounded-full p-1" onClick={addOption}>
        <AppIcon icon="tabler:plus" width={15} />{" "}
      </Button>
    </div>
  );
}

export function Range({
  defaultValue,
  onChangeValue,
  min,
  max,
  step,
  value,
  ...otherProps
}: RangeProps) {
  return (
    <Slider
      value={[Number(value)]}
      min={min}
      max={max}
      step={step}
      {...otherProps}
      onValueChange={val => onChangeValue(val[0])}
    />
  );
}

export const AppFile = ({
  onChangeValue,
  value,
  editor = true,
  ...otherProps
}: AppFileProps) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const {
    page: {
      image: { max_upload_size_message },
    },
  } = useGetDictionary();
  const [states, setStates] = useState<{
    modal: boolean;
    file: File | null;
  }>({
    modal: false,
    file: null,
  });

  const trigger = () => (inputFile.current ? inputFile.current.click() : {});

  return (
    <>
      {value ? (
        <div
          onClick={trigger}
          className="w-8 h-8 relative mt-0.5 overflow-hidden rounded-sm cursor-pointer"
        >
          <Image
            src={getFileAddress(value) ?? ""}
            className="object-cover"
            fill
            alt=""
          />
        </div>
      ) : (
        <div
          onClick={trigger}
          className="bg-gray-100 text-small border h-input flex items-center border-gray-200 p-1 rounded-md pl-3 text-gray-400 cursor-pointer focus-visible:outline-none hover:border-muted-darker hover:bg-muted-dark transition-all"
        >
          {max_upload_size_message}
        </div>
      )}
      <input
        {...otherProps}
        hidden
        ref={inputFile}
        type="file"
        value=""
        accept="image/png"
        onChange={e => {
          const file = e.target.files ? e.target.files[0] : null;
          if (editor) setStates(prev => ({ ...prev, file, modal: true }));
          else onChangeValue(file);
        }}
      />
      {states.file && states.modal && (
        <ImageEditorMask
          modal={{
            status: states.modal,
            toggle: () => setStates(prev => ({ ...prev, modal: false })),
          }}
          file={states.file}
          onSubmit={file => onChangeValue(file)}
        />
      )}
    </>
  );
};
