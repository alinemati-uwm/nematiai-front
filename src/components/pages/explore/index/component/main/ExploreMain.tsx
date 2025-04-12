import React from "react";

import ExploreSearch from "@/components/pages/explore/index/component/main/search/Search";
import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import { CategoryLoading } from "../../loadings/categoryLoading";
import { NewsLoadingList } from "../../loadings/newsLoadingLis";
import { type ExploreNewsData } from "../../newsTypes";
import ExploreCategory from "./Category";
import MainListExlpore from "./list";

{
  /* <ExploreMainLoading /> */
}
function ExploreMain({
  newsListData,
  categoryList,
  category,
  userNews,
  isLoading,
  savedNews,
}: {
  newsListData?: ExploreNewsData["getAllNewsList"]["news"];
  categoryList?: ExploreNewsData["getNewsCategories"];
  category: number;
  userNews?: ExploreNewsData["getAllNewsList"]["news"];
  isLoading?: boolean;
  savedNews?: ExploreNewsData["getAllNewsList"]["news"];
}) {
  const {
    page: {
      explore: { welcom_to_explore_nematiai, your_grate_way },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col m-auto text-center gap-y-5">
      <>
        <AppTypo variant="headingM">{welcom_to_explore_nematiai}</AppTypo>
        <AppTypo color="secondary">{your_grate_way}</AppTypo>
        <ExploreSearch categoryList={categoryList} />
        {categoryList ? (
          <ExploreCategory categoryList={categoryList} category={category} />
        ) : (
          <CategoryLoading />
        )}
        {isLoading && <NewsLoadingList />}
        {category !== 999 && category !== 998 && (
          <MainListExlpore newsListData={newsListData} />
        )}
        {category === 998 && <MainListExlpore newsListData={userNews} />}
        {category === 999 && <MainListExlpore newsListData={savedNews} />}
      </>
    </div>
  );
}

export default ExploreMain;
