import React from "react";

import { useLikeOrDislike } from "@/components/pages/explore/components/tools/comment/comments-actions";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

interface IProps {
  item: CommentItem;
  setCommentToReply?: (comment: CommentItem) => void;
  newsId?: number;
  parentId?: number;
}

function ExplorerCommentListTools({
  item,
  setCommentToReply,
  newsId,
  parentId,
}: IProps) {
  const { mutate: mutateLikeOrDislike } = useLikeOrDislike({
    newsId,
    parentId,
  });
  // Define the list of tools (like, dislike, reply)
  const items = [
    {
      icon: item.user_liked ? "mdi:like" : "mdi:like-outline", // Icon for the like button
      onClick: () => {
        mutateLikeOrDislike({
          action: "like",
          comment_id: item.id,
          value: !item.user_liked,
        });
        if (item.user_disliked && !item.user_liked) {
          mutateLikeOrDislike({
            action: "dislike",
            comment_id: item.id,
            value: false,
          });
        }
      },
      label: item.like_count, // Number of likes (hardcoded for now)
      isActive: item.user_liked,
    },
    {
      icon: item.user_disliked ? "mdi:dislike" : "mdi:dislike-outline", // Icon for the dislike button
      onClick: () => {
        mutateLikeOrDislike({
          action: "dislike",
          comment_id: item.id,
          value: !item.user_disliked,
        });
        if (item.user_liked && !item.user_disliked) {
          mutateLikeOrDislike({
            action: "like",
            comment_id: item.id,
            value: false,
          });
        }
      },
      label: item.dislike_count, // Number of dislikes (hardcoded for now)
      isActive: item.user_disliked,
    },
    {
      icon: "bx:comment", // Icon for the reply button
      onClick: () => {
        setCommentToReply?.(item);
      },
      label: "Reply", // Text label for the reply button
      hide: !newsId,
    },
  ];

  // Render the tools as a row
  return (
    <div className="flex flex-row gap-x-2">
      {" "}
      {/* Container for tools in a row */}
      {items
        .filter(i => !i.hide)
        .map(
          (
            el,
            key, // Loop through each tool item
          ) => (
            <div
              key={key}
              className="flex flex-row cursor-pointer gap-x-1 items-center text-label-light hover:text-label-dark transition border-r last:border-none pr-2"
              onClick={el.onClick} // Attach the onClick function for the tool
            >
              <AppIcon
                icon={el.icon}
                width={14}
                className={el.isActive ? "text-primary" : ""}
              />{" "}
              {/* Display the icon for the tool */}
              <AppTypo color="secondary">{el.label}</AppTypo>{" "}
              {/* Display the label (e.g., like count or 'Reply') */}
            </div>
          ),
        )}
    </div>
  );
}

export default ExplorerCommentListTools;
