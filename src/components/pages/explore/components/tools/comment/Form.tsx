import React, { useEffect, useRef, useState, type RefObject } from "react";

import { useMutateComment } from "@/components/pages/explore/components/tools/comment/comments-actions";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppIcon from "@/components/shared/AppIcon";
import Loading from "@/components/shared/Loading";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

interface IProps {
  id: number;
  commentToReply?: CommentItem;
  clearCommentToReply: () => void;
  commentData: CommentItem[]; // should delete after get api
  containerRef: RefObject<HTMLDivElement | null>;
}

function ExplorerCommentForm({
  id,
  commentToReply,
  commentData,
  containerRef,
  clearCommentToReply,
}: IProps) {
  const [comment, setComment] = useState("");
  const { mutate, isPending } = useMutateComment();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data: userData } = useGetMe();

  const handelSendComment = () => {
    setComment("");
    mutate({
      news_id: id,
      parent_id: commentToReply ? commentToReply.id : 0,
      text: commentToReply
        ? "@" + commentToReply?.user_username + " " + comment
        : comment,
    });
    clearCommentToReply();
  };

  useEffect(() => {
    if (commentToReply) {
      textAreaRef.current?.focus();
    }
  }, [commentToReply]);

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    setComment("");
  }, [commentData, containerRef]); // scroll down after each comment

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [containerRef]); // scroll down in first mount

  return (
    <div className="flex flex-row it justify-center sm:justify-between items-center gap-x-2 sticky -bottom-4 ">
      <UserAvatar
        imageSrc={userData?.profile_image}
        name={userData?.first_name}
        className="h-10"
      />
      <div className="col w-full">
        {!!commentToReply && (
          <div
            className={cn(
              "border border-b-0 rounded rounded-b-none z-20 bg-holder-dark flex justify-between items-center p-2",
            )}
          >
            <AppTypo color="primary">@{commentToReply?.user_username}</AppTypo>
            <AppIcon
              icon="ic:outline-close"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={clearCommentToReply}
            />
          </div>
        )}
        <div
          className={cn(
            "flex flex-row border rounded w-full items-center px-4 !h-12 gap-1",
            !!commentToReply && "border-t-0 rounded-t-none",
          )}
        >
          <textarea
            placeholder="Comment"
            className="w-full outline-none bg-transparent py-2 "
            onChange={e => setComment(e.target.value)}
            value={comment}
            rows={1}
            ref={textAreaRef}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handelSendComment();
              }
            }}
          />
          <Button
            disabled={!comment.length || isPending}
            onClick={handelSendComment}
            className="rounded-full w-5 h-5"
            color="default"
          >
            {isPending ? (
              <Loading svgClass="w-6 h-6 !stroke-primary" />
            ) : (
              <AppIcon icon="tabler:arrow-right" width={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExplorerCommentForm;
