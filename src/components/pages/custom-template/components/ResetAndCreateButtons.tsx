"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { useTemplateStore } from "@/stores/zustand/template-store";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useCreateTemplate } from "@/services/templates";

export function ResetAndCreateButtons() {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const resetCustomTemplate = useTemplateStore.use.resetCustomTemplate();
  const customTemplateDetails = useTemplateStore.use.customTemplateDetails();
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();
  const {
    mutate: createTemplate,
    isPending,
    isError: CreateTemplateIsError,
    isSuccess: CreateTemplateIsSuccess,
  } = useCreateTemplate();

  //toaster
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
  const { toaster } = useToaster();

  //router
  const router = useRouter();

  //show toaster
  useEffect(() => {
    if (CreateTemplateIsSuccess) {
      showSuccess("template is created");
      router.push("/template");
    }
    if (CreateTemplateIsError) showError("Template is not created");
  }, [CreateTemplateIsError, CreateTemplateIsSuccess]);

  const handleCreate = () => {
    try {
      const prompt = customTemplateDetails.template;
      const countBracket = prompt.match(/\[.*?\]/g);

      const checkBracket = customTemplateInputs.length || countBracket?.length;
      if (!prompt.trim().length) throw Error(dictionary.please_enter_prompt);
      if (checkBracket && customTemplateInputs.length !== countBracket?.length)
        throw Error(dictionary.number_of_brackets);

      createTemplate({
        prompt,
        params: customTemplateInputs.map(input => ({
          Type: input.type,
          Label: input.name,
          Description: input.description,
          Placeholder: input.placeholder ?? "",
        })),
        category_id: customTemplateDetails.category.id,
        task: customTemplateDetails.description,
        topic: customTemplateDetails.name,
        icon: customTemplateDetails.icon,
      });
    } catch (error) {
      toaster({
        toastProps: {
          type: "error",
          content: <span className="text-sm">{(error as Error).message}</span>,
        },
      });
    }
  };

  return (
    <div className="row sticky bottom-0 mt-auto w-full justify-end gap-4 bg-holder-lighter px-4 pb-4 lg:px-8 lg:pb-8 xl:px-10  xl:pb-9">
      <Button variant="secondary" onClick={resetCustomTemplate}>
        {dictionary.reset_button_label}
      </Button>
      <Button onClick={handleCreate} isPending={isPending}>
        {dictionary.create_button_label}
      </Button>
    </div>
  );
}
