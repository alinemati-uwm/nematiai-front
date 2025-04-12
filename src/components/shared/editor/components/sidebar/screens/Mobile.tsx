import React, { useContext } from "react";

import AppSwiper from "@/components/shared/AppSwiper";

import ImageEditorContext from "../../../context";
import useImageEditorItems from "../../../hooks/useImageEditorItems";
import EditorSidebarItems from "../components/items/Items";

function ImageEditorSidebar_mobile() {
  const context = useContext(ImageEditorContext);
  const { items } = useImageEditorItems(context);

  return (
    <div className="flex flex-row gap-y-10 z-50 px-3">
      <div className="w-full relative flex flex-row gap-x-4 justify-center">
        <AppSwiper
          SwiperSlideProps={{ style: { width: "auto" } }}
          config={{
            spaceBetween: 10,
            slidesPerView: 5,
          }}
        >
          {items.map((el, key) => (
            <EditorSidebarItems key={key} item={el} />
          ))}
        </AppSwiper>
      </div>
    </div>
  );
}

export default ImageEditorSidebar_mobile;
