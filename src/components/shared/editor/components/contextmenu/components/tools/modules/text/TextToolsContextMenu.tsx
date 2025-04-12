import React, { useEffect, useState } from "react";

import TextToolsContainer from "@/components/shared/editor/components/topbar/components/components/text/component/Container";
import TextToolFonts from "@/components/shared/editor/components/topbar/components/components/text/component/Fonts";
import TextToolSize from "@/components/shared/editor/components/topbar/components/components/text/component/Size";
import textToolsModel from "@/components/shared/editor/components/topbar/components/components/text/model";
import useTextTools from "@/components/shared/editor/components/topbar/components/components/text/useTextTools";
import useBreakpoint from "@/hooks/useBreakpoint";

function TextToolsContextMenu() {
  const [collapse, setCollapse] = useState(false);
  const { changeAlign, changeStyle, isActive } = useTextTools();
  const { align, styles } = textToolsModel;
  const { breakpoint } = useBreakpoint();

  useEffect(() => {
    setCollapse(breakpoint === "xs");
  }, [breakpoint]);

  return breakpoint !== "xs" ? (
    <div
      className={`flex flex-row items-center md:p-1 gap-1 md:gap-4 ${!collapse ? "w-[370px]" : ""} md:w-auto`}
    >
      {/* {breakpoint === "xs" && <AppIcon icon="mage:dots" onClick={() => setCollapse(prev => !prev)} height={20} />} */}
      {!collapse ? (
        <>
          <div className="flex flex-row items-center md:gap-2">
            <div className="w-[120px]">
              <TextToolFonts />
            </div>
            <div>
              <TextToolSize />
            </div>
          </div>
          <div className="flex flex-row items-center md:gap-2 ">
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
          </div>
        </>
      ) : null}
    </div>
  ) : null;
}

export default TextToolsContextMenu;
