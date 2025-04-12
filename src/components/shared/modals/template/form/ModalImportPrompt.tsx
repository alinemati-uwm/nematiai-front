import React, { useContext } from "react";

import { Button } from "@/components/ui/button";

import AppTemplateModalContext from "../context";
import useTemplateModalRouter from "../hooks/useTemplateRouter";

function ModalImportPrompt({
  prompt,
  title,
}: {
  prompt: string;
  title: string;
}) {
  const {
    methods: { onImportPrompt, closeModal },
  } = useContext(AppTemplateModalContext);

  const { clearRoute } = useTemplateModalRouter();

  const redirect = () => {
    onImportPrompt(prompt, title);
    closeModal();
    clearRoute();
  };

  return (
    <div className="flex justify-end">
      <Button className="p-5" onClick={redirect}>
        Import Prompt
      </Button>
    </div>
  );
}

export default ModalImportPrompt;
