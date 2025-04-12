import type imageEditorTypes from "@/components/shared/editor/type";

const detectColor = (
  selectedObject: imageEditorTypes["states"]["selectedObject"],
) => {
  if (!selectedObject) return null;

  const objectPermission =
    selectedObject?.id &&
    !["image"].includes(selectedObject?.type) &&
    !["background", "_frame"].includes(selectedObject?.id);

  if (objectPermission)
    return ["path", "line"].includes(selectedObject.type) &&
      selectedObject?.customType !== "arrow"
      ? selectedObject?.stroke?.toString()
      : selectedObject?.fill?.toString();
  else return null;
};

const imageEditorColorPickerModel = { detectColor };

export default imageEditorColorPickerModel;
