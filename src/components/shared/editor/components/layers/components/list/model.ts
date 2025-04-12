import { type FabricObject } from "fabric";

type getThumbnail = {
  object: FabricObject;
  quality?: number;
  multiplier?: number;
};

const ImageToolsLayersModel = (() => {
  const getThumbnail = ({
    object,
    multiplier = 0.1,
    quality = 0.3,
  }: getThumbnail) => {
    const originalClipPath = object.clipPath;
    // @ts-ignore
    object.clipPath = null;
    const thumbnail = object.toDataURL({
      quality,
      multiplier,
      withoutShadow: true,
      format: "jpeg",
    });
    object.clipPath = originalClipPath;
    return { thumbnail, object };
  };

  return { getThumbnail };
})();

export default ImageToolsLayersModel;
