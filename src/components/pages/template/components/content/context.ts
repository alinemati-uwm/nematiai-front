import { createContext } from "react";

import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

export type templateContentContextProps = {
  states: {
    category: {
      name: string;
      id: number;
    };
    search: string | null;
  };
  methods: {
    updateState<T extends keyof templateContentContextProps["states"]>(
      key: T,
      value: templateContentContextProps["states"][T],
    ): void;
    callbackMethod?(template: TemplateAPIResponse["allTemplates"]): void;
  };
};

const TemplateContentContext = createContext<templateContentContextProps>(
  {} as templateContentContextProps,
);

export default TemplateContentContext;
