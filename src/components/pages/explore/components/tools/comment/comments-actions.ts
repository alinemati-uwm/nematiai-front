import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClientExplore } from "@/components/pages/explore/axiosClientExplore";
import type {
  CommentItem,
  ExploreNewsData,
} from "@/components/pages/explore/index/newsTypes";
import { commentKeys } from "@/components/pages/explore/query-keys";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

const createComment = (
  text: string,
  user_username: string,
  profile_picture?: string,
) => {
  return {
    id: Math.random(),
    user_username,
    user_profile_picture: profile_picture || "",
    created_at: new Date().toISOString(),
    user_liked: false,
    user_disliked: false,
    like_count: 0,
    dislike_count: 0,
    reply_count: 0,
    text,
  } as CommentItem;
};

const updateCommentLike = (
  comments: CommentItem[],
  comment_id: number,
  action: "like" | "dislike",
  value: boolean,
) => {
  return comments.map(comment => {
    if (comment.id === comment_id) {
      return {
        ...comment,
        user_liked: action === "like" ? value : comment.user_liked,
        user_disliked: action === "dislike" ? value : comment.user_disliked,
        like_count:
          action === "like"
            ? comment.like_count + (value ? 1 : -1)
            : comment.like_count,
        dislike_count:
          action === "dislike"
            ? comment.dislike_count + (value ? 1 : -1)
            : comment.dislike_count,
      };
    }
    return comment;
  }) as CommentItem[];
};

export function useMutateComment() {
  const { data: userData } = useGetMe();
  const queryClient = useQueryClient();
  const profile_picture = userData?.profile_image || "";
  const username = userData?.username || "";
  const full_name = userData?.first_name
    ? `${userData.first_name} ${userData.last_name}`
    : "";

  const { data, isPending, mutate, isSuccess } = useMutation({
    mutationKey: ["MutateComment"],
    mutationFn: (commentData: ExploreNewsData["mutateComment"]) =>
      axiosClientExplore.post<ExploreNewsData["responseData"]>(
        "/comments/",
        commentData,
        {
          params: {
            username,
            profile_picture,
            full_name,
          },
        },
      ),
    onSuccess: (_data, { news_id, text, parent_id }) => {
      queryClient.setQueryData(
        parent_id
          ? commentKeys.getReply(parent_id)
          : commentKeys.getComments(news_id),
        (data: any) => {
          const newComment = createComment(text, username, profile_picture);
          if (parent_id) {
            const oldData = data as ExploreNewsData["getCommentsReply"];
            return {
              ...oldData,
              replies: [...oldData.replies, newComment],
            };
          } else {
            const oldData = data as ExploreNewsData["getCommentById"];
            return {
              ...oldData,
              comments: [...oldData.comments, newComment],
            };
          }
        },
      );
    },
  });
  return { data, isPending, mutate, isSuccess };
}

interface MutateLikeDislikeCommentInput {
  action: "like" | "dislike";
  value: boolean;
  comment_id: number;
}

export const useLikeOrDislike = ({
  newsId,
  parentId,
}: {
  newsId?: number;
  parentId?: number;
}) => {
  const queryClient = useQueryClient();
  const { data, isPending, mutate } = useMutation({
    mutationFn: async ({ value, ...data }: MutateLikeDislikeCommentInput) => {
      try {
        await axiosClientExplore[value ? "post" : "delete"]<
          ExploreNewsData["responseData"]
        >("/like-dislike-comment/", value ? data : { data });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    onSuccess: (_data, { comment_id, action, value }) => {
      queryClient.setQueryData(
        newsId
          ? commentKeys.getComments(newsId)
          : commentKeys.getReply(parentId!),
        data => {
          if (newsId) {
            const oldData = data as ExploreNewsData["getCommentById"];
            return {
              ...oldData,
              comments: updateCommentLike(
                oldData.comments,
                comment_id,
                action,
                value,
              ),
            };
          } else {
            const oldData = data as ExploreNewsData["getCommentsReply"];
            return {
              ...oldData,
              replies: updateCommentLike(
                oldData.replies,
                comment_id,
                action,
                value,
              ),
            };
          }
        },
      );
    },
  });
  return { data, isPending, mutate };
};

export function useCommentReport() {
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["comment-report"],
    mutationFn: (data: ExploreNewsData["mutateCommentReport"]) =>
      axiosClientExplore.post<ExploreNewsData["mutateCommentReport"]>(
        "/comment-report/",
        data,
      ),
  });
  return { data, mutate, isPending };
}
