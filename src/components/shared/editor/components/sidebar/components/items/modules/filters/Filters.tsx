import React, { useContext, useEffect, useMemo, useState } from "react";

import { type FabricObject } from "fabric";
import Image from "next/image";

import ImageEditorContext from "@/components/shared/editor/context";
import { Skeleton } from "@/components/ui/skeleton";
import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorSidebarContext from "../../../../context";
import filterImageEditorModel from "./model";

function ImageEditorFilters() {
  const { canvas, methods } = useContext(ImageEditorContext);
  const {
    states: { filters },
    updateState,
  } = useContext(ImageEditorSidebarContext);
  const [loading, setLoading] = useState(false);
  const { items, applyImage, getImage } = filterImageEditorModel;
  const { isLessThan } = useBreakpoint();

  const background: FabricObject | undefined = useMemo(
    () => canvas?.getObjects().find((el: any) => el.id === "background"),
    [],
  );

  const handleImages = async (items: any[]) => {
    setLoading(true);
    const images: any[] = [];
    for await (const el of items) {
      const url = await getImage({ item: el, background });
      images.push(url);
    }
    updateState("filters", images);
    setLoading(false);
  };

  useEffect(() => {
    if (!filters.length) handleImages(items);
  }, [filters]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {!loading
        ? filters.map((el, key) => (
            <div
              key={key}
              className="cursor-pointer h-[200px] relative overflow-hidden rounded"
            >
              <Image
                onClick={() => {
                  applyImage({
                    item: items[key],
                    background,
                    canvas,
                    history: methods.history,
                  });
                  if (isLessThan("sm")) methods.updateState("toolActive", null);
                }}
                src={el}
                alt=""
                unoptimized
                fill
                className="w-auto h-full object-cover"
              />
            </div>
          ))
        : Array.from({ length: 4 }).map((_, key) => (
            <Skeleton key={key} className="h-[140px]"></Skeleton>
          ))}
    </div>
  );
}

export default ImageEditorFilters;
