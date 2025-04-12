import * as Yup from "yup";

import type codePageTypes from "../../type";

const useCodeMutateModel = (() => {
  const validate = async ({
    form,
    dictionary,
  }: {
    form: codePageTypes["form"];
    dictionary: any;
  }) => {
    const tab = form.tab;

    const paramsSchema = Yup.object().shape({
      from: Yup.string().required(dictionary.language_required),
      ...(tab === "code-convertor" && {
        to: Yup.string().required(dictionary.to_language),
      }),
      ...(tab === "code-generator" && {
        text: Yup.string().required(dictionary.description_required),
      }),
      ...(tab !== "code-generator" && {
        code: Yup.string().required(dictionary.code_required),
      }),
    });

    return await paramsSchema.validate(form, { abortEarly: true });
  };

  return { validate };
})();

export default useCodeMutateModel;
