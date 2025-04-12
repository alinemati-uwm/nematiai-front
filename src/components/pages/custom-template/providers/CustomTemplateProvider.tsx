import { useEffect, type ReactNode } from "react";

import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { useTemplateStore } from "@/stores/zustand/template-store";
import templateAPI from "@/refactor_lib/services/api/v1/TemplateAPI";

type props = {
  children: ReactNode;
};

// This component use for edit

function CustomTemplateProvider({ children }: props) {
  const setCustomTemplateDetails =
    useTemplateStore.use.setCustomTemplateDetails();
  const { mutate, data } = useMutation({
    mutationFn: templateAPI.detail,
    onSuccess: res => {
      const data = res.data;
      setCustomTemplateDetails("template", data.prompt);
      // setCustomTemplateDetails("name", data)
    },
  });
  const searchParams = useSearchParams();
  const template_id = searchParams.get("template_id");
  const template_type = searchParams.get("template_type");

  useEffect(() => {
    if (template_id && template_type)
      mutate({ template_id: parseInt(template_id), template_type });
  }, [template_id, template_type]);

  return children;
}

export default CustomTemplateProvider;
