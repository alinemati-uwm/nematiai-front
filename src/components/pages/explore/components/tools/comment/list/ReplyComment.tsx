import { Fragment, useEffect, useState } from "react";

import CommentCard from "@/components/pages/explore/components/tools/comment/CommentCard";
import { useGetCommentReply } from "@/components/pages/explore/components/tools/comment/comments-get";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppTypo from "@/components/ui/AppTypo";

interface IProps {
  item: CommentItem;
}

export function ReplyComment({ item }: IProps) {
  const { data } = useGetCommentReply({ commentId: item.id, pageNumber: 1 });
  const replies = data?.replies || [];

  const [showReplyComment, setShowReplyComment] = useState(false);
  useEffect(() => {
    return () => {
      setShowReplyComment(false);
    };
  }, []);

  return (
    <>
      <div className="items-end flex justify-center flex-col gap-2 ">
        {replies.map((reply, index, filteredArray) => (
          <Fragment key={reply.id}>
            {showReplyComment && (
              <CommentCard
                item={reply}
                rootClassName="w-[95%]  bg-primary-lighter"
                parentId={item.id}
              >
                {reply.text}
              </CommentCard>
            )}

            {replies?.length && replies.length > 0 && (
              <div className="w-full flex justify-center items-center gap-2 ">
                <div className="border-t h-[1px] w-10" />
                <AppTypo
                  onClick={() => setShowReplyComment(!showReplyComment)}
                  className="cursor-pointer text-muted-darker"
                  variant="small"
                >
                  {showReplyComment
                    ? "Hide replies"
                    : `View ${filteredArray.length} more replies`}
                </AppTypo>
                <div className="border-t h-[1px] w-10" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}
