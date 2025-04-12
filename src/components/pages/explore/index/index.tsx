"use client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import {
  useGetListNews,
  useGetNewsCategories,
  useGetSavedNews,
  useGetUserNews,
} from "@/components/pages/explore/news-get";
import LoadingDots from "@/components/ui/LoadingDots";

import ExplorerContainer from "../components/Container";
import ExploreMain from "./component/main/ExploreMain";
import ExploreSearch from "./component/search";
import useHookExplore from "./useHookExplore";

function ExplorePage() {
  const { search } = useHookExplore();
  const searchParam = useSearchParams();
  const categoryIdParams = +searchParam.get("categoryId")!;

  const {
    data: newsListData,
    isFetchingNextPage: isLoadingListNews,
    fetchNextPage: fetchNextPageNewsList,
  } = useGetListNews({
    categoryId: categoryIdParams,
  });

  const {
    data: getUserNews,
    isFetchingNextPage: isLoadingGetUserNews,
    fetchNextPage: fetchNextPageUserNews,
  } = useGetUserNews();

  const {
    data: getSavedNews,
    isFetchingNextPage: isLoadingSaveNews,
    fetchNextPage: fetchNextPageSavedNews,
  } = useGetSavedNews();

  const { data: categoryList } = useGetNewsCategories();

  const newsList =
    categoryIdParams !== 998 && categoryIdParams !== 999 ? newsListData : null;
  const userNews = categoryIdParams === 998 ? getUserNews : null;
  const savedNews = categoryIdParams === 999 ? getSavedNews : null;
  const router = useRouter();

  const topRef = useRef<HTMLDivElement>(null);
  const loadingTarget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [searchParam]);
  useEffect(() => {
    const params = new URLSearchParams(searchParam.toString());
    const defaultUrl = "/explore/?categoryId=1";
    !params.get("page") && !params.get("categoryId")
      ? router.push(defaultUrl)
      : null;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (categoryIdParams === 999) fetchNextPageSavedNews();
          if (categoryIdParams === 998) fetchNextPageUserNews();
          else {
            fetchNextPageNewsList();
          }
        }
      },
      {
        threshold: 1,
      },
    );
    if (loadingTarget.current) {
      observer.observe(loadingTarget.current);
    }
    return () => {
      if (loadingTarget.current) {
        observer.unobserve(loadingTarget.current);
      }
    };
  }, [
    loadingTarget,
    fetchNextPageNewsList,
    fetchNextPageSavedNews,
    fetchNextPageUserNews,
  ]);

  return (
    <AppLayout>
      <AppLayout.side />
      <AppLayout.body>
        <AppLayout.header title="Explore" history={{ type: "all_writer" }} />
        <AppLayout.main>
          <ExplorerContainer ref={topRef}>
            {search ? (
              <ExploreSearch />
            ) : (
              <>
                <ExploreMain
                  categoryList={categoryList?.data}
                  newsListData={newsList ?? undefined}
                  category={categoryIdParams}
                  userNews={userNews ?? undefined}
                  savedNews={savedNews ?? undefined}
                  isLoading={
                    isLoadingGetUserNews ||
                    isLoadingListNews ||
                    isLoadingSaveNews
                  }
                />

                <div ref={loadingTarget}></div>
                {isLoadingListNews && (
                  <div className="w-full h-10 flex justify-center items-end">
                    <LoadingDots />
                  </div>
                )}
              </>
            )}
          </ExplorerContainer>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}

export default ExplorePage;
