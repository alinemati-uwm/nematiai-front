import {
  AppFile,
  LongTextInput,
  NumberInput,
  Range,
  SingleSelect,
  TextInput,
  TextListInputs,
} from "@/components/pages/custom-template/components/inputs-components";
import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

type inputTypes = {
  id: string;
  i18nKey: "input_type" | "textarea_type" | "number_type";
  type: TemplateAPIResponse["allTemplates"]["params"][0]["Type"];
}[];

export const inputTypes: inputTypes = [
  {
    id: "1",
    i18nKey: "input_type",
    type: "text",
  },
  {
    id: "2",
    i18nKey: "textarea_type",
    type: "textarea",
  },
  // {
  //   id: "3",
  //   i18nKey: "date_type",
  //   type: "date",
  // },
  // {
  // 	id: "4",
  // 	i18nKey: "select_type",
  // 	type: "select",
  // },
  {
    id: "5",
    i18nKey: "number_type",
    type: "number",
  },
  // {
  // 	id: "6",
  // 	i18nKey: "list_type",
  // 	type: "list",
  // },
] as const;

export const inputComponents = {
  text: TextInput,
  string: TextInput,
  number: NumberInput,
  textarea: LongTextInput,
  select: SingleSelect,
  list: TextListInputs,
  choice: TextListInputs,
  range: Range,
  file: AppFile,
} as const;
