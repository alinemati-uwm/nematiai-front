"use client";

import { v4 as uuidv4 } from "uuid";

import { ResponsivePopover, Show } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { iconVariants } from "@/components/ui/variants";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { DynamicInput } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";

function CreateItemSettingsPopover({ item }: { item: DynamicInput }) {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();

  const setCustomTemplateInputValue =
    useTemplateStore.use.setCustomTemplateInputValue();
  const toggleCustomTemplateInputAdvance =
    useTemplateStore.use.toggleCustomTemplateInputAdvance();
  const addCustomTemplateOption =
    useTemplateStore.use.addCustomTemplateOption();
  const changeCustomTemplateInputOptionValue =
    useTemplateStore.use.changeCustomTemplateInputOptionValue();
  const deleteCustomTemplateInputOption =
    useTemplateStore.use.deleteCustomTemplateInputOption();

  const addOption = () => {
    addCustomTemplateOption(item.id, {
      id: uuidv4(),
      value: `option-${item.options.length + 1}`,
    });
  };

  return (
    <ResponsivePopover
      trigger={
        <Button
          className="w-10 rounded-full p-1 data-[state=open]:bg-primary data-[state=open]:text-white lg:h-8 lg:min-w-8"
          variant="secondary"
        >
          <AppIcon
            icon="tabler:settings"
            className={iconVariants({ size: "md" })}
          />
        </Button>
      }
      drawerContentProps={{
        className: "p-5",
      }}
      popoverContentProps={{
        className: "max-w-xs",
      }}
    >
      <div className="col  gap-1 py-2 px-4">
        <RenderIf isTrue={item.type === "select" || item.type === "list"}>
          <div className="col mb-4 gap-2">
            <div className="row mb-2 gap-2 text-base font-bold">
              {item.type === "select"
                ? dictionary.options_label
                : dictionary.list_options_label}
              <Button
                variant="secondary"
                className="h-8 w-8 rounded-full p-0.5 "
                onClick={addOption}
              >
                <AppIcon icon="tabler:plus" width={15} />
              </Button>
            </div>
            {item.options.map(option => (
              <div key={option.id} className="row gap-2">
                <Input
                  className="h-10 w-fit flex-grow"
                  value={option.value}
                  onChange={e =>
                    changeCustomTemplateInputOptionValue(
                      item.id,
                      option.id,
                      e.target.value,
                    )
                  }
                />
                <Button
                  className="h-8 w-8 rounded-full bg-danger-dark/10 p-1 text-danger-darker hover:bg-danger-dark/30"
                  onClick={() =>
                    deleteCustomTemplateInputOption(item.id, option.id)
                  }
                >
                  <AppIcon icon="tabler:trash" width={15} />
                </Button>
              </div>
            ))}
          </div>
        </RenderIf>

        <Label htmlFor="input-placeholder">
          {dictionary.placeholder_label}
        </Label>
        <Input
          className="mb-4"
          id="input-placeholder"
          value={item.placeholder}
          onChange={e =>
            setCustomTemplateInputValue(item.id, "placeholder", e.target.value)
          }
        />

        <Label htmlFor="input-default-value">
          {dictionary.default_value_label}
        </Label>
        <Show>
          <Show.When isTrue={item.type === "select"}>
            <Select
              value={item.defaultValue}
              onValueChange={val =>
                setCustomTemplateInputValue(item.id, "defaultValue", val)
              }
            >
              <SelectTrigger className="mb-4">
                <SelectValue placeholder={dictionary.default_value_label} />
              </SelectTrigger>
              <SelectContent>
                {item.options.map(option => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Show.When>
          <Show.Else>
            <Input
              className="mb-4"
              id="input-default-value"
              value={item.defaultValue}
              onChange={e =>
                setCustomTemplateInputValue(
                  item.id,
                  "defaultValue",
                  e.target.value,
                )
              }
            />
          </Show.Else>
        </Show>

        <div className="spacing-row gap-2">
          {/*open and close collapsible div*/}
          <Label htmlFor="addvance-switch">{dictionary.to_advance_label}</Label>
          <Switch
            id="addvance-switch"
            checked={item.isAdvance}
            onCheckedChange={() => toggleCustomTemplateInputAdvance(item.id)}
          />
        </div>
      </div>
    </ResponsivePopover>
  );
}

export default CreateItemSettingsPopover;
