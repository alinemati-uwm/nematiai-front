import React, { type ReactNode } from "react";

import StickyBox from "react-sticky-box";

import useBreakpoint from "@/hooks/useBreakpoint";

function ExploreMediaBox({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const { isLessThan } = useBreakpoint();

  return isLessThan("lg") ? (
    <div className={className}>{children}</div>
  ) : (
    <StickyBox className={className} offsetTop={0} offsetBottom={20}>
      {children}
    </StickyBox>
  );
}

export default ExploreMediaBox;
