import { type formDataTabs } from "../model";

const textToImageFormModel = (() => {
  const form = ({
    getModel,
    values,
    quantity,
    document_name,
    workspace_id,
  }: formDataTabs) => ({
    ...values.options,
    model: getModel.model,
    n:
      !quantity && values.options.n
        ? typeof values.options.n === "number"
          ? values.options.n
          : parseInt(values.options.n)
        : (quantity ?? 1),
    prompt: values.prompt ?? null,
    quality: values.options.quality ?? "standard",
    response_format: values.response_format ?? "url",
    size: values.options.size ?? "1024x1024",
    style: values.options.style ?? "vivid",
    document_name,
    workspace_id,
  });

  return { form };
})();

export default textToImageFormModel;
