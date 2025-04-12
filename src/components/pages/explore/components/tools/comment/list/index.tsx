import React, { Fragment, useRef } from "react";

import CommentCard from "@/components/pages/explore/components/tools/comment/CommentCard";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppTypo from "@/components/ui/AppTypo";

import { ReplyComment } from "./ReplyComment";

interface IProps {
  comments: CommentItem[];
  setCommentToReply: (comment: CommentItem) => void;
  newsId: number;
}

function ExplorerCommentList({ comments, setCommentToReply, newsId }: IProps) {
  const commentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMentionClick = () => {
    const targetComment = commentRefs.current[0];

    if (targetComment) {
      targetComment.scrollIntoView({ behavior: "smooth", block: "end" });
      targetComment.style.backgroundColor = "lightgray";

      setTimeout(() => (targetComment.style.backgroundColor = ""), 2000);
    }
  };

  return (
    <>
      {comments.map((item, indexContainer) => (
        <Fragment key={item.id}>
          <CommentCard
            item={item}
            newsId={newsId}
            setCommentToReply={setCommentToReply}
            rootClassName="bg-muted-lighter"
            ref={el => {
              if (el) commentRefs.current[indexContainer] = el;
            }}
          >
            {item.text.split(" ").map((word, index) => (
              <AppTypo
                color="secondary"
                key={index}
                onClick={() => {
                  if (
                    word.includes("@") &&
                    commentRefs.current[indexContainer]
                  ) {
                    handleMentionClick();
                  }
                }}
                className={
                  word.includes("@") ? "text-primary cursor-pointer" : ""
                }
              >
                {word + " "}
              </AppTypo>
            ))}
          </CommentCard>
          <ReplyComment key={item.id} item={item} />
        </Fragment>
      ))}
    </>
  );
}

export default ExplorerCommentList;
