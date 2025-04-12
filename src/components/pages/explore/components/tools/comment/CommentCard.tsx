import React, { forwardRef } from "react";

import { cn } from "@udecode/cn";

import ExplorerCommentOptions from "@/components/pages/explore/components/tools/comment/list/Options";
import ExplorerCommentListTools from "@/components/pages/explore/components/tools/comment/list/Tools";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppTypo from "@/components/ui/AppTypo";
import { UserAvatar } from "@/components/user";
import { timePassedSince } from "@/lib/date-transform";
import type { ChildrenProps } from "@/services/types";

interface IProps {
  item: CommentItem;
  newsId?: number;
  parentId?: number;
  setCommentToReply?: (comment: CommentItem) => void;
  rootClassName?: string;
}

const CommentCard = forwardRef<HTMLDivElement, ChildrenProps<IProps>>(
  (
    { children, newsId, parentId, setCommentToReply, item, rootClassName },
    ref,
  ) => {
    return (
      <div
        className={cn("flex flex-row p-3 gap-x-2 rounded", rootClassName)}
        ref={ref}
      >
        {/* User Avatar */}
        <UserAvatar />

        {/* Comment content */}
        <div className="w-full flex flex-col ">
          {/* Header with user info and comment options */}
          <div className="flex flex-row gap-2 justify-between items-start">
            <div className="flex flex-row gap-x-2 items-center">
              {/* Username and timestamp */}
              <AppTypo variant="headingXXS">{item.user_username}</AppTypo>
              <AppTypo color="secondary" variant="xs">
                {" "}
                . {timePassedSince(item?.created_at)}
              </AppTypo>
            </div>
            {/* Comment options */}
            <ExplorerCommentOptions commentId={item.id} />
          </div>

          {/* Comment text */}
          <AppTypo className="mb-3">{children}</AppTypo>

          {/* Comment tools (e.g., like, reply, etc.) */}
          <ExplorerCommentListTools
            item={item}
            setCommentToReply={setCommentToReply}
            newsId={newsId}
            parentId={parentId}
          />
        </div>
      </div>
    );
  },
);

export default CommentCard;
