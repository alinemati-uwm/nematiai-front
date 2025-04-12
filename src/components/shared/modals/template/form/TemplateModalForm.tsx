import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import type { TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateModalFormFields from "./TemplateModalFormFields";

type statesProps = {
  prompt: Record<number, string>;
  keys: Record<number, any>;
};

interface IProps {
  selectedTemplate: TemplateAPIResponse["allTemplates"];
  onImportPrompt: (prompt: string) => void;
}

function TemplateModalForm({ selectedTemplate, onImportPrompt }: IProps) {
  const {
    page: { template: dictionary },
  } = useGetDictionary();
  const [states, setStates] = useState<statesProps>({
    prompt: {},
    keys: {},
  });

  useEffect(() => {
    const splitTextToArray = selectedTemplate.prompt.split(/(\[.*?\])/);
    setStates(prev => ({ ...prev, prompt: splitTextToArray }));
  }, [selectedTemplate]);

  const regex = /\[.*?\]/g;
  const { watch, setValue } = useForm();

  useEffect(() => {
    if (
      Object.keys(states.prompt).length &&
      Object.values(states.prompt).find(el => el.match(regex)) &&
      !Object.keys(states.keys).length
    ) {
      const keys = Object.values(states.prompt)
        .map((el, key) => el.match(regex) && key)
        .filter(el => el);
      setStates(prev => ({
        ...prev,
        keys: Object.fromEntries(keys.map((v, i) => [i, v])),
      }));
    }
  }, [states.prompt, states.keys]);

  useEffect(() => {
    const subscription = watch(value => {
      Object.keys(value).forEach((field, keyField) => {
        setStates(prev => ({
          ...prev,
          prompt: { ...prev.prompt, [states.keys[keyField]]: value[field] },
        }));
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, states.keys, states.prompt]);

  const prompt = Object.values(states.prompt).join("");

  return (
    <div className="flex flex-col gap-6 mt-8">
      <AppTypo variant="headingM">{selectedTemplate.topic}</AppTypo>
      <div className="text-sm sm:text-base md:text-base text-[#747474]">
        {prompt}
      </div>
      {selectedTemplate?.params?.length
        ? selectedTemplate.params.map((element, key) => (
            <TemplateModalFormFields
              key={key}
              param={element}
              onChangeValue={value => setValue(element?.Label, value)}
            />
          ))
        : null}

      <Button
        className="p-5 mt-4 w-fit ms-auto"
        onClick={() => onImportPrompt(prompt)}
      >
        {dictionary.import_button_label}
      </Button>
    </div>
  );
}

export default TemplateModalForm;
