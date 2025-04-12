"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import {
  getItemStyle,
  getListStyle,
  reorder,
} from "@/components/pages/custom-template/utils";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { useTemplateStore } from "@/stores/zustand/template-store";
import { type DynamicInput } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";

import CreateInputItem from "./CreateInputItem";

export function AddCustomInput() {
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();
  const setCustomTemplateInputs =
    useTemplateStore.use.setCustomTemplateInputs();
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setCustomTemplateInputs(
      reorder(
        customTemplateInputs,
        result.source.index,
        result.destination.index,
      ),
    );
  }

  const handleAdd = () => {
    setCustomTemplateInputs({
      id: uuidv4(),
      name: `input-${customTemplateInputs.length + 1}`,
      description: "",
      placeholder: "",
      defaultValue: "",
      order: customTemplateInputs.length + 1,
      type: "text",
      options: [],
      isAdvance: false,
    });
  };

  const renderInputs = (inputs: DynamicInput[]) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable"
          direction="vertical"
          isDropDisabled={false}
          isCombineEnabled={false}
          ignoreContainerClipping={false}
        >
          {(provided, snapshot) => (
            <div
              className="col gap-2"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {inputs.map((input, index) => (
                <Draggable key={input.id} draggableId={input.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="row w-full relative gap-1 py-3 md:border-b last:border-none"
                      key={input.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <div
                        {...provided.dragHandleProps}
                        id={input.id}
                        role="img"
                        className="max-md:tart-1 max-md:absolute max-md:top-1/2 max-md:-translate-y-1/2"
                      >
                        <AppIcon icon="lsicon:drag-filled" width={20} />
                      </div>
                      <CreateInputItem item={input} order={index + 1} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div className="col px-4 pb-4 lg:px-8 lg:pb-8 xl:px-10  xl:pb-9">
      <div className="row mb-2 gap-2 text-base font-bold">
        {dictionary.inputs_label}
        <Button
          variant="secondary"
          className="!h-8 w-8 rounded-full p-0.5 "
          onClick={handleAdd}
        >
          <AppIcon icon="tabler:plus" width={15} />
        </Button>
      </div>
      {renderInputs(customTemplateInputs.filter(input => !input.isAdvance))}

      <RenderIf isTrue={customTemplateInputs.some(input => input.isAdvance)}>
        <p className="mb-2 mt-5 border-b py-2 text-base font-bold">
          {dictionary.advance_inputs_label}
        </p>
        {renderInputs(customTemplateInputs.filter(input => input.isAdvance))}
      </RenderIf>
    </div>
  );
}
