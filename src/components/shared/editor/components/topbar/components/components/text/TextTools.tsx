import React from "react";

import TextToolsContainer from "./component/Container";
import TextToolFonts from "./component/Fonts";
import TextToolsList from "./component/List";
import TextToolSize from "./component/Size";
import textToolsModel from "./model";
import useTextTools from "./useTextTools";

function ImageEditorTextTools() {
  const { changeAlign, changeStyle, isActive } = useTextTools();
  const { align, styles } = textToolsModel;

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="">
        <strong>Text</strong>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <TextToolFonts />
        </div>
        <div className="col-span-2">
          <TextToolSize />
        </div>
        <TextToolsList>
          {styles.map((el, key) => (
            <TextToolsContainer key={key} active={isActive(el.style)}>
              <span
                className="cursor-pointer"
                key={key}
                onClick={() => changeStyle(el.key)}
              >
                {el.Icon}
              </span>
            </TextToolsContainer>
          ))}
        </TextToolsList>
        <TextToolsList>
          {align.map((el, key) => (
            <TextToolsContainer key={key} active={isActive(el.style)}>
              <span
                className="cursor-pointer"
                key={key}
                onClick={() => changeAlign(el.key)}
              >
                {el.Icon}
              </span>
            </TextToolsContainer>
          ))}
        </TextToolsList>
      </div>
    </div>
  );
}

export default ImageEditorTextTools;
