import { type Canvas } from "fabric";

import type imageEditorTypes from "../../../../type";
import filterImageEditorModel from "../../../sidebar/components/items/modules/filters/model";
import imageEditorModelTools from "../../../sidebar/model/model";

type created = {
  file: File;
  canvas: Canvas;
  props: imageEditorTypes["customs"]["FabricObject"];
};

type updateObject = {
  undoObject: imageEditorTypes["customs"]["FabricObject"][];
  item: imageEditorTypes["customs"]["FabricObject"];
};

const historyTopbarModel = (() => {
  const { image, circle, rectangle, text, path, triangle } =
    imageEditorModelTools;

  const created = ({ canvas, file, props }: created) => {
    if (props.type === "Image") image.create({ canvas, props });
    else if (props.type === "Circle") circle.create({ canvas, file, props });
    else if (props.type === "Rect") rectangle.create({ canvas, file, props });
    else if (props.type === "Triangle")
      triangle.create({ canvas, file, props });
    else if (["Path", "Group"].includes(props.type))
      path.create({ canvas, props });
    else if (props.type === "Textbox") {
      const textProps = text.serialize(props);
      text.create({
        canvas,
        props: {
          ...textProps,
          update: true,
        },
      });
    }
  };

  const updateObject = ({ undoObject, item }: updateObject) => {
    if (!undoObject) return;
    const finded = undoObject.find(
      (el: imageEditorTypes["customs"]["FabricObject"]) => el.id === item.id,
    );

    if (finded) {
      if (item.type === "textbox") {
        const props = text.serialize(finded);
        if (props) item.set(props);
      } else if (finded.id === "background") {
        let filters: any = [];
        if (finded?.filters?.length)
          filters = filterImageEditorModel.items.find(
            el => el.key === finded.filterID,
          )?.filters;
        item.set({ ...finded, filters });
        //@ts-ignore
        item.applyFilters();
      } else {
        item.set(finded);
      }
    }
  };

  const isFirstOrLastTimestamp = (
    history: imageEditorTypes["states"]["history"],
  ) => {
    const keys = Object.keys(history.timeline);
    return {
      first: Boolean(history.timestamp === Number(keys[0])),
      last: Boolean(history.timestamp === Number(keys[keys.length - 1])),
    };
  };

  return { created, updateObject, isFirstOrLastTimestamp };
})();

export default historyTopbarModel;
