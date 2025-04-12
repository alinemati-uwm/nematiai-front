import { useState } from "react";

import { type appTemplateModalTypes } from "../context";

function useTemplateModal() {
  const [states, setStates] = useState<appTemplateModalTypes["states"]>({
    template: {
      id: null,
      template_type: null,
    },
  });

  const updateState = <T extends keyof appTemplateModalTypes["states"]>(
    key: T,
    value: appTemplateModalTypes["states"][T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  const isForm = states.template.id && states.template.template_type;

  return { updateState, states, isForm };
}

export default useTemplateModal;
