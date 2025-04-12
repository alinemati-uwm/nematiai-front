import { useQuery } from "@tanstack/react-query";

import { axiosClientExplore } from "@/components/pages/explore/axiosClientExplore";
import type { ExploreNewsData } from "@/components/pages/explore/index/newsTypes";
import { commentKeys } from "@/components/pages/explore/query-keys";

export function useGetNewsComments({
  pageNumber,
  newsId,
}: {
  pageNumber?: number;
  newsId: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: commentKeys.getComments(newsId),
    queryFn: async () => {
      const { data } = await axiosClientExplore.get<
        ExploreNewsData["getCommentById"]
      >(
        `/comments/${newsId}/?${pageNumber ? "page=" + pageNumber + "&" : ""}user_id=1`,
      );
      return data;
    },
  });
  return { data, isLoading };
}

export function useGetCommentReply({
  commentId,
  pageNumber,
}: {
  commentId: number;
  pageNumber: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: commentKeys.getReply(commentId),
    queryFn: async () => {
      const { data } = await axiosClientExplore.get<
        ExploreNewsData["getCommentsReply"]
      >(`/comments/${commentId}/replies/?page=${pageNumber}&user_id=1`);

      return data;
    },
  });
  return { data, isLoading };
}
