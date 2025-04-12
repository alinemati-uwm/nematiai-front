"use client";

import React, { useContext, useEffect, useState } from "react";

import { DialogClose } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import type {
  HighlightItemsType,
  HighlightResult,
} from "@/components/layout/header/apps-header/highlight/types";
import AppIcon from "@/components/shared/AppIcon";
import { DocumentEditorContext } from "@/components/shared/grammar_translate_rewrite/component/editor/context";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useHighlightStore from "@/stores/zustand/highlight-store";
import { useGetDictionary } from "@/hooks";

import { highlightData } from "./constants";
import HighlightAccordion from "./HighlightAccordion";
import HighlightCard from "./HighlightCard";

/**
 * HighlightSheet component renders a dialog that allows users to generate highlights
 * based on the text from the document editor context. It fetches highlight data from
 * the server and provides options to select and generate highlights using AI.
 *
 * @component
 *
 * @returns JSX.Element The rendered HighlightSheet component.
 *
 * @example
 * <HighlightSheet />
 *
 * @remarks
 * This component uses several hooks and context:
 * - `useGetDictionary`: Fetches dictionary data.
 * - `useHighlightStore`: Manages the highlight state.
 * - `documentEditorContext`: Provides the editor text.
 * - `useStreamHighlight`: Handles the highlight generation process.
 *
 * @state
 * - `highlightItems`: An array of selected highlight items.
 * - `clickCard`: An object representing the state of a clicked card.
 * - `responseList`: An array of response messages after generating highlights.
 *
 * @effects
 * - Sets the highlight state to close on the first mount.
 * - Clears highlight items when the highlight modal is closed.
 *
 * @functions
 * - `handelGenerate`: Sends a request to the backend for each highlight item to generate highlights.
 *
 * @dependencies
 * - `Dialog`, `DialogTrigger`, `DialogContent`: Components for rendering the dialog.
 * - `Button`: Component for rendering buttons.
 * - `AppIcon`, `AppTypo`: Custom components for rendering icons and typography.
 * - `HighlightCard`: Component for rendering individual highlight cards.
 * - `HighlightAccordion`: Component for rendering the accordion with highlight responses.
 */
export default function HighlightSheet() {
  const {
    components: { highlight: dictionary },
  } = useGetDictionary();
  const setHighlightIsOpen = useHighlightStore.use.setHighlightIsOpen(); //Set highlight state to open or close
  const isHighlightOpen = useHighlightStore.use.isHighlightOpen(); // check that highlight is open or not
  const { text: editorText } = useContext(DocumentEditorContext); // this is editor text
  // data set here when user click the checkbox
  const [highlightSelectedItems, setHighlightSelectedItems] = useState<
    HighlightItemsType[]
  >([]);
  const [itemsToGenerate, setItemsToGenerate] = useState<HighlightItemsType[]>(
    [],
  );

  const [streamResponses, setStreamResponses] = useState<
    Record<string, string>
  >(
    highlightData.reduce((acc: Record<string, string>, item) => {
      acc[item.id] = "";
      return acc;
    }, {}),
  );

  const [highLightResult, setHighLightResult] = useState<HighlightResult[]>(
    highlightData.map(item => ({ ...item, texts: [], isStreaming: false })),
  );

  useEffect(() => {
    setHighlightIsOpen(false); // set highlight state to close in first mount
  }, []);

  useEffect(() => {
    // delete data after close modal
    return () => {
      setHighlightSelectedItems([]);
      // setResponseData([]);
    };
  }, [isHighlightOpen]);

  const toggleAllSelection = () => {
    setHighlightSelectedItems(
      highlightSelectedItems.length === highlightData.length
        ? []
        : highlightData,
    );
  };

  const handleDelete = (id: string) => {
    setHighLightResult(prev =>
      prev.map(i => (i.id === id ? { ...i, texts: [] } : i)),
    );
    setStreamResponses(prev => ({
      ...prev,
      [id]: "",
    }));
  };

  return (
    <>
      <Dialog onOpenChange={setHighlightIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <AppIcon icon="tabler:highlight" />
            {dictionary.highlight}
          </Button>
        </DialogTrigger>

        <DialogContent className="lg:min-w-[1024px] h-full xl:min-w-[1224px] bg-holder-lighter  lg:!p-4 gap-3  overflow-scroll flex flex-col lg:flex-row sm:max-h-[700px] ">
          <VisuallyHidden>
            <DialogTitle>{dictionary.highlight}</DialogTitle>
          </VisuallyHidden>
          <div className="lg:w-[50%] lg:h-full flex flex-col gap-6 ">
            <div className="w-full flex flex-col gap-2 relative">
              <DialogClose className="absolute right-0  lg:hidden flex">
                <AppIcon width={14} height={14} icon="ic:round-close" />
              </DialogClose>
              <AppTypo variant="headingM" className="font-bold">
                {dictionary.highlight}
              </AppTypo>
              <div className="flex justify-between items-center  h-7">
                <AppTypo className="text-success">
                  {dictionary.generate_for_you_with_ai}
                </AppTypo>
                {highlightSelectedItems.length > 0 && (
                  <Button
                    onClick={toggleAllSelection}
                    variant="outline"
                    size="sm"
                  >
                    <AppIcon
                      width={14}
                      height={14}
                      icon="mdi:tick-circle-outline"
                    />
                    {dictionary.selecet_all}
                  </Button>
                )}
              </div>
              <hr />
            </div>
            <div className=" h-auto w-full flex flex-col gap-4 overflow-x-scroll lg:overflow-x-hidden  ">
              <div className="flex h-[104px] lg:h-full flex-col lg:flex-row flex-wrap gap-4 ">
                {highlightData.map(item => {
                  const itemIndex = highLightResult.findIndex(
                    i => i.id === item.id,
                  );
                  return (
                    <HighlightCard
                      item={item}
                      key={item.id}
                      setHighlightSelectedItems={setHighlightSelectedItems}
                      setItemsToGenerate={setItemsToGenerate}
                      highlightSelectedItems={highlightSelectedItems}
                      editorText={editorText || ""}
                      itemsToGenerate={itemsToGenerate}
                      isRegenerate={
                        itemIndex !== -1 &&
                        highLightResult[itemIndex].texts.length > 0
                      }
                      setItemStreamResponse={(response: string) =>
                        setStreamResponses(prev => ({
                          ...prev,
                          [item.id]: response,
                        }))
                      }
                      setItemTexts={(text: string) =>
                        setHighLightResult(prev =>
                          prev.map(i =>
                            i.id === item.id
                              ? { ...i, texts: [...i.texts, text] }
                              : i,
                          ),
                        )
                      }
                      setIsStreaming={(isStreaming: boolean) =>
                        setHighLightResult(prev =>
                          prev.map(i =>
                            i.id === item.id ? { ...i, isStreaming } : i,
                          ),
                        )
                      }
                    />
                  );
                })}
              </div>

              <div className="w-full h-10 hidden lg:flex justify-end ">
                {highlightSelectedItems.length > 0 && (
                  <Button
                    onClick={() => setItemsToGenerate(highlightSelectedItems)}
                    isPending={itemsToGenerate.length > 0}
                    disabled={itemsToGenerate.length > 0}
                  >
                    {dictionary.generate}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] h-full lg:p-4  relative">
            <DialogClose className="absolute right-0 -top-2 lg:flex hidden">
              <AppIcon width={14} height={14} icon="ic:round-close" />
            </DialogClose>
            <div className="w-full h-full border p-4 rounded flex flex-col gap-[10px] overflow-y-scroll">
              <HighlightAccordion streamText={editorText || ""} />

              {highLightResult.map(item => (
                <HighlightAccordion
                  key={item.id}
                  item={item}
                  setItemsToGenerate={setItemsToGenerate}
                  handleDelete={() => handleDelete(item.id)}
                  streamText={streamResponses[item.id] || ""}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:hidden">
            <Button disabled={highlightSelectedItems.length === 0}>
              {dictionary.generate}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
