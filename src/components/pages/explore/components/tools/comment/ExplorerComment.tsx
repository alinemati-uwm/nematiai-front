import React, { useRef } from "react";

import ExplorerCommentContent, {
  type explorerCommentContentProps,
} from "./index";

function ExplorerComment(props: explorerCommentContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className={`bg-muted-light fixed top-0 bottom-0 z-10 right-0 h-auto overflow-scroll w-full sm:w-[400px] p-4 ${props.open ? "translate-x-0" : "translate-x-[100%]"} transition border-l`}
    >
      {props.open ? (
        <ExplorerCommentContent {...props} containerRef={containerRef} />
      ) : null}
    </div>
  );
}

export default ExplorerComment;
