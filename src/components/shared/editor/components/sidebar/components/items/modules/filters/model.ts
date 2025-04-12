import { filters, type Canvas, type FabricObject } from "fabric";

import type imageEditorTypes from "../../../../../../type";
import ImageToolsLayersModel from "../../../../../layers/components/list/model";

type itemsProps = {
  filters: any[];
  key: string;
};

type applyImage = {
  background: FabricObject | undefined;
  canvas: Canvas | null;
  item: itemsProps;
  history: imageEditorTypes["context"]["methods"]["history"];
};

type getImage = {
  background: FabricObject | undefined;
  item: itemsProps;
};

const filterImageEditorModel = (() => {
  const items: itemsProps[] = [
    {
      filters: [],
      key: "default",
    },
    {
      filters: [new filters.Grayscale(), new filters.Contrast({ contrast: 1 })],
      key: "grayscale-contrast-1",
    },
    {
      filters: [
        new filters.Brightness({ brightness: -0.3 }),
        new filters.Saturation({ saturation: -0.5 }),
      ],
      key: "brightness-saturation-1",
    },
    {
      filters: [
        new filters.Blur({ blur: 0.15 }),
        new filters.Noise({ noise: 100 }),
      ],
      key: "blur-noise-1",
    },
    {
      filters: [
        new filters.Pixelate({ blocksize: 5 }),
        new filters.Contrast({ contrast: 0.2 }),
      ],
      key: "pixelate-contrast-1",
    },
    {
      filters: [
        new filters.BlendColor({
          color: "#FFD700",
          mode: "multiply",
          alpha: 0.3,
        }),
        new filters.Brightness({ brightness: 0.3 }),
      ],
      key: "blendcolor-brightness-1",
    },
    {
      filters: [
        new filters.Saturation({ saturation: -1 }),
        new filters.Technicolor({ color: "#FF4500", opacity: 0.4 }),
      ],
      key: "saturation-technicolor-1",
    },
    {
      filters: [
        new filters.BlendColor({
          color: "#00FFFF",
          mode: "tint",
          alpha: 0.3,
        }),
        new filters.Saturation({ saturation: -0.2 }),
      ],
      key: "blendcolor-saturation-1",
    },
    {
      filters: [
        new filters.RemoveColor({ threshold: 0.5 }),
        new filters.Contrast({ contrast: 0.6 }),
      ],
      key: "removecolor-contrast-1",
    },
    {
      filters: [
        new filters.Blur({ blur: 0.05 }),
        new filters.Noise({ noise: 200 }),
        new filters.Brightness({ brightness: -0.2 }),
      ],
      key: "blur-noise-brightness-1",
    },
    {
      filters: [
        new filters.Technicolor({ color: "#800080", opacity: 0.5 }),
        new filters.Brightness({ brightness: 0.4 }),
      ],
      key: "technicolor-brightness-1",
    },
    {
      filters: [
        new filters.Grayscale(),
        new filters.Contrast({ contrast: 0.5 }),
      ],
      key: "grayscale-contrast-2",
    },
    {
      filters: [
        new filters.BlendColor({
          color: "#FFA07A",
          mode: "screen",
          alpha: 0.3,
        }),
        new filters.Contrast({ contrast: 0.4 }),
      ],
      key: "blendcolor-contrast-2",
    },
    {
      filters: [
        new filters.Saturation({ saturation: -0.7 }),
        new filters.Contrast({ contrast: 0.4 }),
        new filters.Brightness({ brightness: 0.1 }),
      ],
      key: "saturation-contrast-brightness-1",
    },
    {
      filters: [
        new filters.Brightness({ brightness: -0.2 }),
        new filters.Contrast({ contrast: 0.5 }),
        new filters.Blur({ blur: 0.05 }),
      ],
      key: "brightness-contrast-blur-1",
    },
    {
      filters: [
        new filters.Grayscale(),
        new filters.Contrast({ contrast: 0.3 }),
        new filters.Brightness({ brightness: 0.2 }),
      ],
      key: "grayscale-contrast-brightness-3",
    },
    {
      filters: [
        new filters.RemoveColor({ threshold: 0.3 }),
        new filters.Saturation({ saturation: -0.3 }),
        new filters.Contrast({ contrast: 0.4 }),
      ],
      key: "removecolor-saturation-contrast-1",
    },
    {
      filters: [
        new filters.Brightness({ brightness: 0.15 }),
        new filters.Contrast({ contrast: 0.2 }),
      ],
      key: "brightness-contrast-3",
    },
    {
      filters: [new filters.Saturation({ saturation: 0.5 })],
      key: "saturation-1",
    },
    {
      filters: [new filters.Blur({ blur: 0.05 })],
      key: "blur-1",
    },
    {
      filters: [new filters.Grayscale()],
      key: "grayscale-1",
    },
    {
      filters: [new filters.Contrast({ contrast: -0.2 })],
      key: "contrast-1",
    },
    {
      filters: [new filters.Noise({ noise: 20 })],
      key: "noise-1",
    },
    {
      filters: [
        new filters.Contrast({ contrast: 0.3 }),
        new filters.Saturation({ saturation: -0.4 }),
      ],
      key: "contrast-saturation-1",
    },
    {
      filters: [
        new filters.Brightness({ brightness: -0.1 }),
        new filters.Blur({ blur: 0.02 }),
      ],
      key: "brightness-blur-1",
    },
  ];

  const applyImage = ({ background, canvas, item, history }: applyImage) => {
    if (!background || !canvas) return;
    background.set({
      filters: item.filters,
      filterID: item.key,
    });
    //@ts-ignore
    background.applyFilters();
    canvas.renderAll();
    history.add();
  };

  const getImage = async ({ background, item }: getImage) => {
    const object = background ? await background.clone() : null;
    if (!object) return "";
    object.set({
      filters: item.filters,
    });

    //@ts-ignore
    object.applyFilters();
    return ImageToolsLayersModel.getThumbnail({
      object,
      multiplier: 0.8,
      quality: 1,
    }).thumbnail;
  };

  return { items, applyImage, getImage };
})();

export default filterImageEditorModel;
