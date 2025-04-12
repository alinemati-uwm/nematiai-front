import React, { useEffect, useState, type FC } from "react";

import { cn } from "@udecode/cn";

import MindMapPreview from "@/components/pages/mind-map/mind-map-preview";
import RenderIf from "@/components/shared/RenderIf";
import { useEditorStore } from "@/stores/zustand/editor-slice";

const initValue = `
# Main Topic

## Branch 1
- Sub-branch 1.1
  - Leaf 1.1.1
  - Leaf 1.1.2
    - Nested Leaf 1.1.2.1
    - Nested Leaf 1.1.2.2
  - Leaf 1.1.3
- Sub-branch 1.2
  - Leaf 1.2.1
  - Leaf 1.2.2
    - Nested Leaf 1.2.2.1
    - Nested Leaf 1.2.2.2
- Sub-branch 1.3
  - Leaf 1.3.1
  - Leaf 1.3.2

## Branch 2
- Sub-branch 2.1
  - Leaf 2.1.1
  - Leaf 2.1.2
    - Nested Leaf 2.1.2.1
    - Nested Leaf 2.1.2.2
- Sub-branch 2.2
  - Leaf 2.2.1
  - Leaf 2.2.2
- Sub-branch 2.3
  - Leaf 2.3.1
  - Leaf 2.3.2
    - Nested Leaf 2.3.2.1
    - Nested Leaf 2.3.2.2

## Branch 3
- Sub-branch 3.1
  - Leaf 3.1.1
  - Leaf 3.1.2
    - Nested Leaf 3.1.2.1
    - Nested Leaf 3.1.2.2
- Sub-branch 3.2
  - Leaf 3.2.1
  - Leaf 3.2.2
- Sub-branch 3.3
  - Leaf 3.3.1
  - Leaf 3.3.2
    - Nested Leaf 3.3.2.1
    - Nested Leaf 3.3.2.2

## Branch 4
- Sub-branch 4.1
  - Leaf 4.1.1
  - Leaf 4.1.2
    - Nested Leaf 4.1.2.1
    - Nested Leaf 4.1.2.2
- Sub-branch 4.2
  - Leaf 4.2.1
  - Leaf 4.2.2
- Sub-branch 4.3
  - Leaf 4.3.1
  - Leaf 4.3.2
    - Nested Leaf 4.3.2.1
    - Nested Leaf 4.3.2.2

## Branch 5
- Sub-branch 5.1
  - Leaf 5.1.1
  - Leaf 5.1.2
    - Nested Leaf 5.1.2.1
    - Nested Leaf 5.1.2.2
- Sub-branch 5.2
  - Leaf 5.2.1
  - Leaf 5.2.2
- Sub-branch 5.3
  - Leaf 5.3.1
  - Leaf 5.3.2
    - Nested Leaf 5.3.2.1
    - Nested Leaf 5.3.2.2
`;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  isFullScreen: boolean;
  setIsFullScreen?: (isFullScreen: boolean) => void;
  documentName: string;
  gap?: number;
}

const PageMindmap: FC<IProps> = ({
  value,
  isOpen,
  onClose,
  isFullScreen,
  setIsFullScreen,
  documentName,
  gap = 1.5,
}) => {
  const [markmapValue, setMarkmapValue] = useState("");
  const toggleFullScreen = useEditorStore.use.toggleFullScreen();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log(value);
      setMarkmapValue(initValue);
      setTimeout(() => setLoaded(true), 200);
    }

    return () => {
      setLoaded(false);
    };
  }, [isOpen]);

  const onFullScreenChange = (val: boolean) => {
    setIsFullScreen?.(val);
    toggleFullScreen();
  };

  return (
    <div
      className={cn("col size-full relative")}
      style={{ paddingInlineStart: isFullScreen ? 0 : gap + "rem" }}
    >
      <RenderIf isTrue={loaded}>
        <MindMapPreview
          value={markmapValue}
          documentName={documentName}
          onClose={onClose}
          isFullScreen={isFullScreen}
          setIsFullScreen={onFullScreenChange}
        />
      </RenderIf>
    </div>
  );
};

export default PageMindmap;
