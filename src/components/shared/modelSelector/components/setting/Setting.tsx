import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

import SettingModalContainer, { type settingContainerProps } from "./Container";

type props = {
  open: boolean;
  onClose(): void;
};

function ModelSettingModal({ onClose, open }: props) {
  const {
    components: { select_engine },
    common: { cancel, save_label },
  } = useGetDictionary();

  const items: settingContainerProps[] = [
    {
      title: select_engine.temperature,
      description:
        "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
      type: "temperature",
      step: 0.1,
      min: 0,
      max: 2,
    },
    {
      title: select_engine.frequency_penalty,
      description:
        "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      type: "frequency",
      step: 1,
      min: -2,
      max: 2,
    },
    {
      title: select_engine.presence_penalty,
      description:
        "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      type: "presence",
      step: 1,
      min: -2,
      max: 2,
    },
    {
      title: select_engine.top,
      description:
        "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
      type: "top",
      step: 0.1,
      min: 0,
      max: 1,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col apy max-w-auto max-w-[95%] w-[400px] gap-y-6 px-8">
        <DialogHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-4 items-center">
            <DialogTitle>{select_engine.engine_setting}</DialogTitle>
          </div>
          <DialogClose className="outline-none">
            <AppIcon icon="ic:outline-close" width={20} />
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          {items.map((el, key) => (
            <SettingModalContainer key={key} {...el} />
          ))}
        </div>
        <div className="flex flex-row items-center justify-end gap-x-2">
          <Button onClick={onClose} variant="secondary">
            {cancel}
          </Button>
          <Button onClick={onClose}>{save_label}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModelSettingModal;
