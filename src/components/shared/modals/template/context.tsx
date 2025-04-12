import { createContext } from "react";

import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

export type appTemplateModalTypes = {
  states: {
    template: {
      id: TemplateAPIResponse["allTemplates"]["id"] | null;
      template_type: string | null;
    };
  };
  methods: {
    updateState<T extends keyof appTemplateModalTypes["states"]>(
      key: T,
      value: appTemplateModalTypes["states"][T],
    ): void;
    closeModal(): void;
    onImportPrompt(prompt: string, title?: string): void;
  };
};

const AppTemplateModalContext = createContext<appTemplateModalTypes>(
  {} as appTemplateModalTypes,
);

export default AppTemplateModalContext;
