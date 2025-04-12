import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useSaveNewsOfList } from "@/components/pages/explore/useSaveNewsOfList";
import AppTypo from "@/components/ui/AppTypo";

import { type ExploreNewsData } from "../index/newsTypes";
import useHookExplore from "../index/useHookExplore";
import ExploreSaveArticle from "./Save";

function ExploreRelated({
  data,
}: {
  data?: ExploreNewsData["getNewsDataById"];
}) {
  // Destructuring the `makeArticleLink` function from the `useHookExplore` hook
  const { makeArticleLink } = useHookExplore();
  const { handleSaveNews, savedData } = useSaveNewsOfList();
  return (
    <div className="flex flex-col gap-y-3">
      {/* Title of the section */}
      <AppTypo variant="headingM">Related</AppTypo>

      {/* Container for the grid layout of related articles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Mapping through an array of length 4 to create related article items */}
        {data?.related_news?.map((item, key) => {
          const isSaved = savedData?.data.news?.some(n => n.id === item.id);
          return (
            <div
              key={key}
              className="flex flex-col bg-muted rounded overflow-hidden"
            >
              {/* Link to the article with an image as background */}
              <Link
                href={makeArticleLink(item.id)} // Article link generated dynamically
                className="h-[120px] relative"
              >
                <Image
                  src={item.image_urls[0]}
                  alt="" // Placeholder alt text for the image
                  layout="fill"
                  unoptimized // Option to not optimize the image
                  className="absolute w-full rounded-t object-cover"
                />
              </Link>

              {/* Content section below the image */}
              <div className="px-4 py-2 flex flex-col gap-y-2">
                {/* Title of the related article */}
                <Link href={makeArticleLink(item.id)}>
                  <AppTypo variant="headingXXS" className="w-full">
                    has the been launched
                  </AppTypo>
                </Link>

                {/* Information about the author and save option */}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-x-2 truncate w-1/2">
                    <Image
                      src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
                      alt="" // Placeholder alt text for author image
                      width={14}
                      height={14}
                      unoptimized
                      className="rounded-full"
                    />
                    <AppTypo className="truncate" variant="small">
                      Mehrpouya {/* Author name */}
                    </AppTypo>
                  </div>

                  {/* Button or link for saving the article */}
                  <ExploreSaveArticle
                    handleSaveNews={() => handleSaveNews(item.id, !isSaved)}
                    isSaved={!!isSaved}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreRelated;
