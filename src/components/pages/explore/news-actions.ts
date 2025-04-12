import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClientExplore } from "@/components/pages/explore/axiosClientExplore";
import type { ExploreNewsData } from "@/components/pages/explore/index/newsTypes";
import { newsKeys } from "@/components/pages/explore/query-keys";

export function useMutateFavoriteCategories() {
  const { isPending, mutate, data } = useMutation({
    mutationKey: ["MutateFavoriteCategories"],
    mutationFn: (categoryData: ExploreNewsData["mutateFavoriteCategories"]) =>
      axiosClientExplore.post<ExploreNewsData["responseData"]>(
        "/favorite-categories/",
        categoryData,
      ),
  });
  return { isPending, mutate, data };
}

interface MutateLikeOrDislikeProps {
  value: boolean;
  action: "like" | "dislike";
  news_id: string;
}

export const useMutateLikeOrDislike = () => {
  const queryClient = useQueryClient();
  const { data, isPending, mutate } = useMutation({
    mutationFn: ({ value, ...data }: MutateLikeOrDislikeProps) =>
      axiosClientExplore[value ? "post" : "delete"]<
        ExploreNewsData["responseData"]
      >("/like-news/", value ? data : { data }),
    onSuccess: (_data, { news_id, action, value }) => {
      queryClient.setQueryData(
        newsKeys.getById(news_id),
        (data: ExploreNewsData["getNewsDataById"]) => {
          return {
            ...data,
            user_liked: action === "like" ? value : data.user_liked,
            user_disliked: action === "dislike" ? value : data.user_disliked,
            like_count:
              action === "like"
                ? data.like_count + (value ? 1 : -1)
                : data.like_count,
            dislike_count:
              action === "dislike"
                ? data.dislike_count + (value ? 1 : -1)
                : data.dislike_count,
          };
        },
      );
    },
  });
  return { data, isPending, mutate };
};

export function useMutateReport() {
  const { data, isPending, mutate, isError, isSuccess, error } = useMutation({
    mutationKey: ["MutateReport"],
    mutationFn: (reportData: ExploreNewsData["mutateReport"]) =>
      axiosClientExplore.post<ExploreNewsData["responseData"]>(
        "/news/report/",
        reportData,
      ),
  });
  return { data, isPending, mutate, isError, isSuccess, error };
}

interface MutateSaveOrUnSaveNewsProps {
  value: boolean;
  news_id: string;
}

export const useSaveOrUnSaveNews = () => {
  const queryClient = useQueryClient();
  const { data, mutate, isPending } = useMutation({
    mutationFn: ({ news_id, value }: MutateSaveOrUnSaveNewsProps) =>
      axiosClientExplore[value ? "post" : "delete"]<
        ExploreNewsData["responseData"]
      >(
        value ? "/save-news/" : "/unsave-news/",
        value ? { news_id } : { data: { news_id } },
      ),
    onSuccess: (_data, { news_id, value }) => {
      queryClient.setQueryData(
        newsKeys.getById(news_id),
        (data: ExploreNewsData["getNewsDataById"]) => {
          return {
            ...data,
            is_saved: value,
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: newsKeys.savedNews(1) });
    },
  });
  return { data, mutate, isPending };
};
