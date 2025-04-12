"use client";

import { useEffect, useRef } from "react";

import { SelectAndDrawer } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePrompt from "@/components/ui/prompt/Prompt";
import { useTemplateStore } from "@/stores/zustand/template-store";
import { useGetDictionary } from "@/hooks";

import usePromptLibrary from "../../template/hooks/usePromptLibrary";

const Box = (props: any) => {
  return (
    <div className="col col-span-2 gap-2 md:col-span-1">{props.children}</div>
  );
};

export function PromptDetailsForm() {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const setCustomTemplateDetails =
    useTemplateStore.use.setCustomTemplateDetails();
  const customTemplateDetails = useTemplateStore.use.customTemplateDetails();
  const { category } = usePromptLibrary();
  const editableDivRef = useRef(null);
  const { content, addText } = usePrompt({
    onGetNewFile: () => {},
    key: 1,
    clean: true,
    copy: true,
    placeholder: dictionary.write_your_prompt_here,
    upload: false,
    promptFn: prompt => addText(prompt.trim()),
    maxsize: 4000,
    initialValue: customTemplateDetails.template ?? "",
    onchange: val => setCustomTemplateDetails("template", val),
  });

  const getValue = () => {
    try {
      if (!category.data?.data.length) throw Error();
      const categoryFind = category.data?.data.find(
        item =>
          item.id.toString() === String(customTemplateDetails.category.id),
      );
      if (!categoryFind) throw Error();
      return {
        id: categoryFind?.id.toString(),
        title: categoryFind?.name,
        value: categoryFind?.name,
      };
    } catch (error) {
      return { id: "-1", title: "select an option", value: "select an option" };
    }
  };
  useEffect(() => {
    return () => {
      setCustomTemplateDetails("template", "");
      setCustomTemplateDetails("name", "");
      setCustomTemplateDetails("description", "");
      setCustomTemplateDetails("category", "");
      setCustomTemplateDetails("icon", "");
    };
  }, []);

  return (
    <div className="flex flex-col p-4 lg:p-8 xl:p-10  gap-4 xl:gap-7">
      <div className="grid grid-cols-2 gap-4 xl:gap-7">
        <Box>
          <Label htmlFor="custom-template-name">
            {dictionary.prompt_name_label}
          </Label>
          <Input
            id="custom-template-name"
            value={customTemplateDetails.name}
            onChange={e => setCustomTemplateDetails("name", e.target.value)}
          />
        </Box>
        <Box>
          <Label htmlFor="custom-template-description">
            {dictionary.prompt_description_label}
          </Label>
          <Input
            id="custom-template-description"
            value={customTemplateDetails.description}
            onChange={e =>
              setCustomTemplateDetails("description", e.target.value)
            }
          />
        </Box>
      </div>
      <Box>
        <Label>{dictionary.prompt_category_label}</Label>
        <SelectAndDrawer
          value={getValue()}
          setValue={val => {
            if (!category.data?.data.length) return;
            setCustomTemplateDetails("category", {
              id: +val,
              name: category.data?.data
                .filter(item => item.id.toString() === val)[0]
                .id.toString(),
            });
          }}
          items={
            category.data?.data.length
              ? category.data?.data.map(el => ({
                  id: el.id.toString(),
                  value: el.name,
                  image: "",
                }))
              : []
          }
          buttonStyle="lg:h-10"
        />
      </Box>

      <div className="col col-span-2 gap-2">
        <Label>{dictionary.prompt_template_label}</Label>
        {content}
      </div>
    </div>
  );
}
