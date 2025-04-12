import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ExploreSaveArticle from "@/components/pages/explore/components/Save";
import { useSaveNewsOfList } from "@/components/pages/explore/useSaveNewsOfList";
import AppTypo from "@/components/ui/AppTypo";

import { type ExploreNewsData } from "../../../../newsTypes";
import useHookExplore from "../../../../useHookExplore";
import MainListExlporeSources from "../../list/Sources";

function MainListExlpore({
  newsListData,
}: {
  newsListData?: ExploreNewsData["getAllNewsList"];
}) {
  const { makeArticleLink } = useHookExplore();
  const router = useRouter();

  function deleteComma(imagesUrl: string) {
    const imageList = imagesUrl.split(",");
    return imageList[0];
  }

  const { handleSaveNews, savedData } = useSaveNewsOfList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {newsListData?.map((el, key: any) => {
        const isSaved = savedData?.data.news?.some(n => n.id === el.id);
        return (
          <div
            role="link"
            key={key}
            onClick={() => router.push(makeArticleLink(el.id))}
            className={`flex flex-col bg-muted-light cursor-pointer  ${key % 7 === 0 ? "col-span-full" : ""}`}
          >
            <div className="h-[20vh] relative">
              <Image
                src={deleteComma(el.image_urls)}
                alt=""
                layout="fill"
                unoptimized
                className="absolute w-full rounded-t object-cover"
              />
            </div>
            <div
              className={`flex flex-col p-2 text-left gap-y-2 justify-between ${key % 7 === 0 ? "" : "h-[25vh]"}`}
            >
              <div className="flex flex-col gap-2">
                <AppTypo variant="headingXXS">{el.title}</AppTypo>
                <AppTypo variant="small">{el.title}</AppTypo>
              </div>
              <div className="flex flex-row items-center justify-between">
                <MainListExlporeSources />
                <ExploreSaveArticle
                  handleSaveNews={() => handleSaveNews(el.id, !isSaved)}
                  isSaved={!!isSaved}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainListExlpore;
