import React, { type ReactNode } from "react";

import SidebarRoadmap from "./SidebarRoadmap";

interface props {
  children: ReactNode;
}

function SidePanelContent({ children }: props) {
  return (
    <>
      <SidebarRoadmap />

      {children}
    </>
  );
}

export default SidePanelContent;
