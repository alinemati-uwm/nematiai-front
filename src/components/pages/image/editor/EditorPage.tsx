"use client";

import React from "react";

import ImageEditor from "@/components/shared/editor/ImageEditor";
import { getFileAddress } from "@/lib/utils";

function EditorPage() {
  return (
    <>
      <ImageEditor
        modal={{ status: true, toggle: () => {} }}
        onSubmit={(file: any) => {
          if (!file) return;
          const imageUrl = getFileAddress(file);
          if (imageUrl) window.open(imageUrl, "_blank");
        }}
      />
    </>
  );
}

export default EditorPage;
