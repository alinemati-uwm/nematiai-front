import React, { useContext, useEffect, useState } from "react";

import { type Textbox } from "fabric";

import ImageEditorContext from "../../../../../../context";
import SelectboxFontTool from "./SelectboxFontTool";

function TextToolSize() {
  const [font, setFont] = useState(0);
  const {
    canvas,
    states: { selectedObject },
    methods: { history },
  } = useContext(ImageEditorContext);

  useEffect(() => {
    if (selectedObject && selectedObject.type === "textbox")
      setFont((selectedObject as Textbox).fontSize);
  }, [selectedObject]);

  const changeFont = (font: string) => {
    if (!canvas) return;
    if (selectedObject && selectedObject.type === "textbox") {
      const textBox = selectedObject as Textbox;
      textBox.set({
        fontSize: font,
      });
      history.add();
      canvas.requestRenderAll();
    }
  };

  return (
    <div className="relative w-full">
      <SelectboxFontTool
        items={Array.from({ length: 80 }).map((_, key) => ({
          caption: key,
          value: key,
        }))}
        props={{
          onChange: e => {
            const value = e.target.value;
            changeFont(value);
            setFont(parseInt(value));
          },
          value: font,
        }}
      />
    </div>
  );
}

export default TextToolSize;
