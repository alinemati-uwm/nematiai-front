import { useMutation } from "@tanstack/react-query";

import { type DynamicInputType } from "@/stores/zustand/types";
import axiosClient from "@/services/axios-client";

type CreateTemplateParams = {
  topic: string;
  task: string;
  prompt: string;
  params: {
    Type: DynamicInputType;
    Label: string;
    Description: string;
    Placeholder: string;
  }[];
  category_id: number;
  icon: string;
};

export function useCreateTemplate() {
  return useMutation({
    async mutationFn({
      prompt,
      params,
      category_id,
      topic,
      task,
      icon,
    }: CreateTemplateParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        CreateTemplateParams
      >("/templates/", {
        topic,
        params,
        category_id,
        task,
        prompt,
        icon,
      });

      return data;
    },
  });
}
