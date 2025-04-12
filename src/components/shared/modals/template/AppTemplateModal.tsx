import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import TemplateContent from "@/components/pages/template/components/content/TemplateContent";
import { Show } from "@/components/shared";
import TemplateModalFormSkeleton from "@/components/shared/modals/template/form/Skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";
import templateAPI from "@/refactor_lib/services/api/v1/TemplateAPI";
import type { TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import AppIcon from "../../AppIcon";
import TemplateModalForm from "./form/TemplateModalForm";
import useTemplateModalRouter from "./hooks/useTemplateRouter";

type TemplateItem = TemplateAPIResponse["allTemplates"];

type props = {
  open: boolean;
  onClose(): void;
  onImportPrompt: (template: TemplateItem) => void;
};

function AppTemplateModal({ open, onImportPrompt, onClose }: props) {
  const { template, clearRoute } = useTemplateModalRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>();
  const chat = useGetDictionary().page.chat;

  const { isPending, data } = useQuery({
    queryKey: [
      "template",
      { id: template.id },
      { typ: template.type || "PublicTemplate" },
    ],
    queryFn: async () => {
      const { data } = await templateAPI.detail({
        template_id: +template.id!,
        template_type: template.type || "PublicTemplate",
      });
      return data;
    },
    enabled: !!template.id,
  });
  useEffect(() => {
    if (data) {
      setSelectedTemplate(data);
    }
  }, [data]);

  const closeModal = () => {
    clearRoute();
    if (onClose) onClose();
  };

  const onClickUse = (item: TemplateItem) => {
    if (
      (item.params && item.params.length && item.params.length > 0) ||
      !!template.id
    ) {
      setSelectedTemplate(item);
    } else {
      onImportPrompt(item);
      closeModal();
    }
  };

  const isOpen = template.id ? true : open;

  useEffect(() => {
    if (!isOpen) {
      setSelectedTemplate(undefined);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="flex flex-col max-w-auto max-w-[95%] w-[1000px] h-[95%] sm:h-[80%] gap-y-0 px-8">
        <DialogHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-4 items-center">
            {selectedTemplate ? (
              <AppIcon
                icon="fa-solid:arrow-left"
                onClick={() => {
                  setSelectedTemplate(undefined);
                  clearRoute();
                }}
                width={14}
              />
            ) : null}
            <DialogTitle>{chat.prompt_library_title}</DialogTitle>
          </div>
          <DialogClose>
            <AppIcon icon="ic:outline-close" width={23} />
          </DialogClose>
        </DialogHeader>
        <Show>
          <Show.When isTrue={isPending && !!template.id}>
            <TemplateModalFormSkeleton />
          </Show.When>
          <Show.Else>
            {selectedTemplate ? (
              <TemplateModalForm
                selectedTemplate={selectedTemplate}
                onImportPrompt={prompt => {
                  onImportPrompt({ ...selectedTemplate, prompt });
                  closeModal();
                }}
              />
            ) : (
              <TemplateContent callbackMethod={onClickUse} />
            )}
          </Show.Else>
        </Show>
      </DialogContent>
    </Dialog>
  );
}

export default AppTemplateModal;
