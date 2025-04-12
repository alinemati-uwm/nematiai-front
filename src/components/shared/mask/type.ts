import { type Canvas } from "fabric";

type maskTypes = {
  component: {
    file: File;
    onSubmit(file: File): void;
    modal: {
      status: boolean;
      toggle(status: boolean): void;
    };
  };
  states: {
    brush: number;
    canvas: Canvas | null;
    fullscreen: boolean;
    drawing: boolean;
  };
};

export default maskTypes;
