import {
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

import Image from "next/image";

import type { HighlightItemsType } from "@/components/layout/header/apps-header/highlight/types";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

import { useGenerateHighlight } from "./useGenerateHighlight";

interface IProps {
  item: HighlightItemsType;
  setHighlightSelectedItems: Dispatch<SetStateAction<HighlightItemsType[]>>;
  highlightSelectedItems: HighlightItemsType[];
  editorText: string;
  itemsToGenerate: HighlightItemsType[];
  setItemsToGenerate: Dispatch<SetStateAction<HighlightItemsType[]>>;
  isRegenerate: boolean;
  setItemStreamResponse: (text: string) => void;
  setItemTexts: (text: string) => void;
  setIsStreaming: (value: boolean) => void;
}

export default function HighlightCard({
  item,
  setHighlightSelectedItems,
  highlightSelectedItems,
  editorText,
  itemsToGenerate,
  setItemsToGenerate,
  isRegenerate,
  setItemStreamResponse,
  setItemTexts,
  setIsStreaming,
}: IProps) {
  const {
    components: { highlight: ditionary },
  } = useGetDictionary();

  const handelChange = (
    name: HighlightItemsType,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      setHighlightSelectedItems([...highlightSelectedItems, item]);
    } else if (highlightSelectedItems.includes(name)) {
      setHighlightSelectedItems(
        highlightSelectedItems.filter(itm => itm !== name),
      );
    }
  };

  const { generateHighlightFunc, isPendingStreaming, responseMessage } =
    useGenerateHighlight({
      item: item,
      setItemsToGenerate: setItemsToGenerate,
      text: editorText,
      setItemTexts,
      setIsStreaming,
      setItemStreamResponse,
    });

  useEffect(() => {
    if (itemsToGenerate.some(el => el.id === item.id)) {
      generateHighlightFunc();
    }
  }, [itemsToGenerate]);

  return (
    <div className="lg:w-[235px] w-[207px] xl:w-[285px] lg:mb-2 h-11 border py-2 px-[10px] rounded flex justify-center items-center">
      <div className="w-full h-full flex justify-between items-center">
        <div className="py-1 flex gap-2 justify-center items-center ">
          <div>
            <Input
              type="checkbox"
              className="accent-primary"
              onChange={e => handelChange(item, e)}
              checked={highlightSelectedItems.includes(item)}
            />
          </div>
          <Image src={item.image} width={20} height={20} alt="any" />
          <AppTypo variant="small">{item.name}</AppTypo>
        </div>
        <div className=" pl-2">
          <Button
            disabled={highlightSelectedItems.length > 0 || isPendingStreaming}
            isPending={isPendingStreaming && itemsToGenerate.length === 0}
            onClick={generateHighlightFunc}
            variant="outline"
            size="sm"
          >
            {isRegenerate ? ditionary.regenerate : ditionary.generate}
          </Button>
        </div>
      </div>
    </div>
  );
}
