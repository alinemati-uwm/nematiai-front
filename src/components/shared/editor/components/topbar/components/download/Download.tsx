import React, { useContext } from "react";

import { dataURLToBlob } from "@/components/pages/image/feature/utils";
import useImageEditorPage from "@/components/pages/imageditor/useImageEditorPage";
import AppIcon from "@/components/shared/AppIcon";

import ImageEditorContext from "../../../../context";
import CaptionTopbar from "../Caption";

function ImageEditorDownload() {
  const { auth, image } = useImageEditorPage();
  const {
    canvas,
    props: { onSubmit },
  } = useContext(ImageEditorContext);

  const handleSaveImage = async () => {
    if (!canvas) return;
    const mainObject = canvas
      .getObjects()
      .find((obj: any) => obj.id === "_frame");
    if (!mainObject) return;
    const prevViewportTransform = canvas.viewportTransform;

    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.setZoom(1);
    canvas.renderAll();

    const toDataURL = canvas.toDataURL({
      format: "png",
      enableRetinaScaling: true,
      multiplier: 1,
      quality: 1,
      width: mainObject.width * mainObject.scaleX - 1,
      height: mainObject.height * mainObject.scaleY - 1,
      left: mainObject.left + 1,
      top: mainObject.top + 1,
    });
    const blob = dataURLToBlob(toDataURL);

    canvas.viewportTransform = prevViewportTransform;
    canvas.renderAll();

    const url = new File([blob], "canvas-image.png", { type: "image/png" });
    onSubmit(auth && image ? toDataURL : url);
  };

  return (
    <CaptionTopbar
      icon={<AppIcon width={20} icon="material-symbols:download" />}
      title="Download"
      onClick={handleSaveImage}
    />
  );
}

export default ImageEditorDownload;
