/**
 * ! Warning
 * @deprecated don't use this type directly. All types must be in the types directory'
 */
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

import { type DynamicInputType } from "@/stores/zustand/types";

import { type Locale } from "../../i18n.config";

export type ChildrenProps<P extends object> = P & {
  children: ReactNode | ReactNode[];
};

export interface PlanFeatureItem {
  title: string;
  description: string;
}

export interface PlanItem {
  id: number;
  title: string;
  price: number;
  is_monthly: boolean;
  credit: number;
  active: boolean;
  highlight: boolean;
  description: string;
  features: PlanFeatureItem[];
}

export type StateSetterType<T> = Dispatch<SetStateAction<T>>;

export interface AppItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: string;
  installCount: number;
}

export interface LangParams {
  params: { lang: Locale };
}

export interface SearchParamsType {
  [key: string]: string | string[] | undefined;
}

export interface ParamsType {
  lang: Locale;
  templateId: string;
}

export type WordType = "char" | "word" | "sentence" | "token";

export interface SCRPropsType {
  searchParams: SearchParamsType;
  params: ParamsType;
}

export interface EngineItem {
  id: string;
  name: string;
  image: string;
}

export interface WorkspaceList {
  id: number;
  role: {
    title: string;
    access_level: Array<{
      title: string;
    }>;
  };
  user: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    phone_number: string;
    description: string;
    is_verified: boolean;
  };
  workspace: WorkspaceInList;
  is_base: boolean;
  is_default: boolean;
}

export interface WorkspaceInList {
  name: string;
  id: number;
}

export interface Workspace {
  name: string;
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  is_default: boolean;
  is_base: boolean;
  workspace: { id: number; name: string };
}

export interface WorkspaceApp {
  id: number;
  app: {
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: Array<object>;
    status: string;
  };
  workspace: Workspace;
}

export interface WorkspaceDocumentProps {
  id: number;
  workspace: {
    name: string;
  };
  history: {
    urls?: string[];
    id: number;
    uuid?: string;
    answer_text: string;
    created_at: Date;
    updated_at: Date;
  };
  name: string;
}

export interface TemplateParamsItem {
  type: DynamicInputType;
  label: string;
  description: string;
  placeholder: string;
  options: string[];
}
export interface TemplateItem {
  id: number;
  topic: string;
  task: string;
  prompt: string;
  params: TemplateParamsItem[];
}

export interface ModelParamsItem {
  enum: string[];
  show: "true" | "false";
  type: "select" | "text" | "number" | "range";
  label: string;
  default: string;
  is_advance: "true" | "false";
  description_i18key: string;
  maximum: number;
  minimum: number;
  step?: number;
}
export interface ModelItem {
  model: string;
  url: {
    name: string;
    url: string;
  };
  params: { [index: string]: ModelParamsItem };
  is_active: boolean;
  icon?: string;
  title?: string;
}
