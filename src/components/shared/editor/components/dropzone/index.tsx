import React, { useContext } from "react";

import useAttachments from "@/components/ui/attachments/Attachments";

import ImageEditorContext from "../../context";

function ImageEditorDropZone() {
  const {
    methods: { updateState },
  } = useContext(ImageEditorContext);
  const { holderDropFile, content } = useAttachments({
    accept: [".png", ".jpeg"],
    eachSize: 5,
    maxSize: 5,
    multiple: false,
    onChange: async images => {
      const files = Object.values(images);
      if (files[0]) updateState("file", files[0]);
    },
  });

  return (
    <div className="w-[90%] sm:w-[60%]">
      {holderDropFile}
      {content}
    </div>
  );
}

export default ImageEditorDropZone;
