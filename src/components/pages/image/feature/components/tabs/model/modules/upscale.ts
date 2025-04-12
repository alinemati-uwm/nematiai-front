import { type formDataTabs } from "../model";

const upscaleToImageFormModel = (() => {
  const form = ({
    getModel,
    values,
    document_name,
    workspace_id,
  }: formDataTabs) => ({
    image: values.image,
    generate_data: JSON.stringify({
      [values.options?.upscale_by === "height" ? "height" : "width"]:
        values.options?.upscale_value,
      model: getModel.model,
      document_name,
      workspace_id,
    }),
  });

  return { form };
})();

export default upscaleToImageFormModel;
