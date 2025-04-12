import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { axiosClientExplore } from "@/components/pages/explore/axiosClientExplore";
import type { ExploreNewsData } from "@/components/pages/explore/index/newsTypes";
import { newsKeys } from "@/components/pages/explore/query-keys";

export function useGetListNews({ categoryId }: { categoryId: number }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: newsKeys.getNews(categoryId),
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        axiosClientExplore.get<ExploreNewsData["getAllNewsList"]>(
          `news/?category_id=${categoryId}&page=${pageParam}`,
        ),
      getNextPageParam: function (
        lastPage,
        allPage,
        lastPageParam,
        allPageParam,
      ) {
        if (lastPageParam < lastPage.data.max_pages) return lastPageParam + 1;
        return null;
      },
      select: data => {
        return data.pages.flatMap(el => el.data.news);
      },
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
}

export function useGetListNewsById({ newsId }: { newsId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: newsKeys.getById(newsId),
    queryFn: async () => {
      const { data } = await axiosClientExplore.get<
        ExploreNewsData["getNewsDataById"]
      >(`/news/${newsId}/`);
      return data;
    },
  });

  return { data, isLoading };
}

export function useGetNewsCategories() {
  const { data, isLoading } = useQuery({
    queryKey: newsKeys.categories,
    queryFn: () =>
      axiosClientExplore.get<ExploreNewsData["getNewsCategories"]>(
        "/news/categories",
      ),
  });
  return { data, isLoading };
}

export function useGetSavedNews() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: newsKeys.savedNews(),
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await axiosClientExplore.get<
        ExploreNewsData["getAllNewsList"]
      >(`/saved-news/?page=${pageParam}`);
      return data;
    },
    getNextPageParam: function (
      lastPage,
      allPage,
      lastPageParam,
      allPageParam,
    ) {
      if (lastPageParam < lastPage.data.max_pages) return lastPageParam + 1;
      return null;
    },
    select: data => {
      return data.pages.flatMap(el => el.data.news);
    },
    retry: 3,
  });
  return { data, fetchNextPage, isFetchingNextPage };
}

export function useGetUserNews() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: newsKeys.userNews(),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      axiosClientExplore.get<ExploreNewsData["getAllNewsList"]>(
        `/user-news/?page=${pageParam}`,
      ),

    getNextPageParam: function (
      lastPage,
      allPage,
      lastPageParam,
      allPageParam,
    ) {
      if (lastPageParam < lastPage.data.max_pages) return lastPageParam + 1;
      return null;
    },
    select: data => {
      return data.pages.flatMap(el => el.data.news);
    },
  });
  return { data, fetchNextPage, isFetchingNextPage };
}
