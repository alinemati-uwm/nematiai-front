import { Image } from "fabric";
import { v4 as uid } from "uuid";

import { getFileAddress, loadImage } from "@/lib/utils";

import type editorModelTypes from "../type";

const editorModelImage = (() => {
  const create = async ({
    canvas,
    file,
    props,
  }: editorModelTypes["image"]["create"]) => {
    const imageUrl = file ? getFileAddress(file) : (props?.src ?? null);
    if (!canvas || !imageUrl) return;

    const image: Image = await Image.fromURL(
      imageUrl,
      { crossOrigin: "anonymous" },
      {
        left: 0,
        top: 0,
        angle: 0,
        objectCaching: true,
        id: uid(),
      },
    );

    // Set props
    canvas.add(image);
    if (props) image.set(props);
    if (!props?.globalCompositeOperation) {
      canvas.centerObject(image);
      canvas.setActiveObject(image);
    }
    canvas.requestRenderAll();
    return image;
  };

  const scaleFactor = async (file: File) => {
    const img = await loadImage(file);
    const imgWidth = img.width || 0;
    const imgHeight = img.height || 0;
    return Math.min(imgWidth, imgHeight, 1);
  };

  return { create, scaleFactor };
})();

export default editorModelImage;
