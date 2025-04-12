import React from "react";

import LayersMobile from "../components/LayersMobile";
import MobileToolsOptions from "../components/MobileToolsOptions";

function TabletTools() {
  return (
    <div className="fixed bottom-0 right-0 m-5 flex flex-row items-center gap-x-3">
      <MobileToolsOptions />
      <LayersMobile />
    </div>
  );
}

export default TabletTools;
