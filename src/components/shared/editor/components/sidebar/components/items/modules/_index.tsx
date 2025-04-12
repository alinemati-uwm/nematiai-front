import AiEditor from "./ai/AiEditor";
import ImageEditorDrawers from "./draw/ImageEditorDrawers";
import ImageEditorFilters from "./filters/Filters";
import ImageEditorShapes from "./shapes/Shapes";

const ImageEditorMenuModules = {
  Filters: ImageEditorFilters,
  AiEditor: AiEditor,
  Draws: ImageEditorDrawers,
  Shapes: ImageEditorShapes,
};

export default ImageEditorMenuModules;
