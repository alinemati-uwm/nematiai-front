"use client";

import CreateItemSettingsPopover from "@/components/pages/custom-template/components/CreateItemSettingsPopover";
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
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { DynamicInput, DynamicInputType } from "@/stores/zustand/types";
import { inputTypes } from "@/constants/dynamic-inputs";
import { useGetDictionary } from "@/hooks";

function CreateInputItem({
  item,
  order,
}: {
  item: DynamicInput;
  order: number;
}) {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const setCustomTemplateInputValue =
    useTemplateStore.use.setCustomTemplateInputValue();
  const setCustomTemplateInputType =
    useTemplateStore.use.setCustomTemplateInputType();
  const deleteCustomTemplateInput =
    useTemplateStore.use.deleteCustomTemplateInput();

  return (
    <div className="flex w-full items-start gap-2 md:items-center">
      <div className="centered-col h-8 w-8 rounded border bg-muted-dark text-sm font-semibold md:w-10">
        {order}
      </div>
      <div className="grid w-full grid-cols-6 gap-2 rounded p-0">
        <div className="col-span-full sm:col-span-2">
          <Input
            placeholder={dictionary.name_input_placeholder}
            value={item.name}
            onChange={e =>
              setCustomTemplateInputValue(item.id, "name", e.target.value)
            }
          />
        </div>
        <div className="col-span-full sm:col-span-2">
          <Input
            className="col-span-full sm:col-span-1"
            placeholder={dictionary.description_input_placeholder}
            value={item.description}
            onChange={e =>
              setCustomTemplateInputValue(
                item.id,
                "description",
                e.target.value,
              )
            }
          />
        </div>
        <div className="col-span-4 sm:col-span-1">
          <Select
            defaultValue={inputTypes[0].type}
            value={item.type}
            onValueChange={val =>
              setCustomTemplateInputType(item.id, val as DynamicInputType)
            }
          >
            <SelectTrigger className="col-span-8 md:col-span-2">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {inputTypes.map(item => (
                <SelectItem key={item.id} value={item.type}>
                  {dictionary[item.i18nKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row justify-end col-span-2 sm:col-span-1 gap-2">
          <CreateItemSettingsPopover item={item} />
          <Button
            className="w-10 rounded-full bg-danger-lighter p-1 text-danger-darker hover:bg-danger-light hover:text-danger-lighter lg:h-8 lg:min-w-8"
            onClick={() => deleteCustomTemplateInput(item.id)}
          >
            <AppIcon icon="tabler:trash" width={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateInputItem;
