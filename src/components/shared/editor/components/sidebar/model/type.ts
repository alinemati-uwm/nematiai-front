import {
  type CanvasEvents,
  type CircleProps,
  type ImageProps,
  type PathProps,
  type RectProps,
  type TextboxProps,
} from "fabric";

import type imageEditorTypes from "../../../type";
import { type imageEditorModelProps } from "./model";

type editorModelTypes = {
  cursor: {
    drawingDisable: Pick<imageEditorModelProps, "canvas">;
  };
  image: {
    create: Partial<imageEditorModelProps> & {
      props?: Partial<ImageProps> & { id?: string; src?: string };
    };
  };
  circle: {
    create: imageEditorModelProps & {
      props?: Partial<CircleProps> & { id?: string };
    };
  };
  arrow: {
    create: Pick<imageEditorModelProps, "canvas"> & {
      props?: Partial<CircleProps> & { id?: string };
    };
  };
  triangle: {
    create: imageEditorModelProps & {
      props?: Partial<CircleProps> & { id?: string };
    };
  };
  line: {
    create: Pick<imageEditorModelProps, "canvas"> & {
      props?: Partial<RectProps> & { id?: string };
    };
  };
  rect: {
    create: imageEditorModelProps & {
      props?: Partial<RectProps> & { id?: string };
    } & { centerd?: boolean };
  };
  text: {
    create: Pick<imageEditorModelProps, "canvas"> & {
      props?: Partial<TextboxProps> & { id?: string; update?: boolean };
    };
  };
  path: {
    create: Pick<imageEditorModelProps, "canvas"> & {
      props?: Partial<PathProps>;
    };
  };
  draw: {
    create: Pick<imageEditorModelProps, "canvas"> & {
      brush: imageEditorTypes["states"]["defaults"]["brush"];
      color: imageEditorTypes["states"]["defaults"]["colorPicker"];
    };
  };
  erase: {
    draw: Pick<imageEditorModelProps, "canvas"> & {
      event: CanvasEvents["mouse:move"];
    };
  };
  crop: Pick<imageEditorModelProps, "canvas">;
};

export default editorModelTypes;
