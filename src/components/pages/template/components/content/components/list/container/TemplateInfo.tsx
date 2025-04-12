import React, { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

import TemplateCardImage from "./TemplateCardImage";
import { type templateListIconsProps } from "./TemplateListIcons";

function TemplateInfo({ template }: Pick<templateListIconsProps, "template">) {
  // State to control the modal visibility
  const [Modal, setModal] = useState(false);

  // Retrieve the close text for the modal from the dictionary (likely for internationalization)
  const {
    page: {
      template: { close },
    },
  } = useGetDictionary();

  return (
    <>
      {/* Icon that triggers the modal when clicked */}
      <AppIcon
        icon="fe:info"
        color="#747474"
        width={18}
        onClick={() => setModal(true)}
      />
      {/* Conditional rendering of the modal */}
      {Modal ? (
        <Dialog open onOpenChange={() => setModal(false)}>
          {" "}
          {/* Modal opens when 'Modal' is true */}
          <DialogContent className="flex flex-col w-[95%] max-w-[600px] gap-y-3 p-6">
            <VisuallyHidden>
              <DialogTitle>Template Info</DialogTitle>
            </VisuallyHidden>
            {/* Modal content layout */}
            <div className="flex flex-row items-start gap-x-3">
              {/* Template Image */}
              <div className="bg-primary-lighter rounded">
                <TemplateCardImage />
              </div>
              <div className="flex flex-col w-[85%] gap-y-2">
                {/* Display template topic and task */}
                <AppTypo variant="headingXS">{template.topic}</AppTypo>
                <AppTypo>{template.task}</AppTypo>
              </div>
            </div>
            {/* Template prompt displayed inside a styled box */}
            <AppTypo className="p-4 bg-muted-light rounded">
              {template.prompt}
            </AppTypo>
            {/* Close button to close the modal */}
            <div className="flex justify-center">
              <Button onClick={() => setModal(false)}>{close}</Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}{" "}
      {/* Modal will not render unless 'Modal' is true */}
    </>
  );
}

export default TemplateInfo;
