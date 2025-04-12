import React, { useContext, useEffect, useState } from "react";

import { type Textbox } from "fabric";

import ImageEditorContext from "../../../../../../context";
import SelectboxFontTool from "./SelectboxFontTool";

function TextToolFonts() {
  const [font, setFont] = useState("");
  const {
    canvas,
    states: { selectedObject },
    methods: { history },
  } = useContext(ImageEditorContext);

  useEffect(() => {
    if (selectedObject && selectedObject.type === "textbox")
      setFont((selectedObject as Textbox).fontFamily);
  }, [selectedObject]);

  const changeFont = (font: string) => {
    if (!canvas) return;
    if (selectedObject && selectedObject.type === "textbox") {
      const textBox = selectedObject as Textbox;
      textBox.set({
        fontFamily: font,
      });
      history.add();
      canvas.requestRenderAll();
    }
  };

  const data = [
    {
      caption: "Anton",
      font: "Anton",
    },
    {
      caption: "Poppins",
      font: "Poppins",
    },
    {
      caption: "Roboto Mono",
      font: "Roboto Mono Variable",
    },
    {
      caption: "Oswald",
      font: "Oswald Variable",
    },
    {
      caption: "Figtree",
      font: "Figtree Variable",
    },
    {
      caption: "Comfortaa",
      font: "Comfortaa Variable",
    },
    {
      caption: "DM Serif Text",
      font: "DM Serif Text",
    },
    {
      caption: "Ubuntu Mono",
      font: "Ubuntu Mono",
    },
    {
      caption: "Kalam",
      font: "Kalam",
    },
    {
      caption: "Cinzel",
      font: "Cinzel Variable",
    },
    {
      caption: "Krona One",
      font: "Krona One",
    },
    {
      caption: "Teko",
      font: "Teko Variable",
    },
    {
      caption: "Yeseva One",
      font: "Yeseva One",
    },
    {
      caption: "Smooch",
      font: "Smooch",
    },
    {
      caption: "Orbitron",
      font: "Orbitron Variable",
    },
    {
      caption: "Dancing Script",
      font: "Dancing Script Variable",
    },
  ];

  return (
    <div className="relative w-full">
      <SelectboxFontTool
        items={data.map(el => ({ caption: el.caption, value: el.font }))}
        font
        props={{
          onChange: e => {
            const value = e.target.value;
            changeFont(value);
            setFont(value);
          },
          value: font,
        }}
      />
    </div>
  );
}

export default TextToolFonts;
