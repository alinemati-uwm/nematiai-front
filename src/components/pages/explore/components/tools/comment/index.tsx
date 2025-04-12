"use client";

import React, { useState, type RefObject } from "react";

import Link from "next/link";

import { useGetNewsComments } from "@/components/pages/explore/components/tools/comment/comments-get";
import type { CommentItem } from "@/components/pages/explore/index/newsTypes";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Separator } from "@/components/ui/separator";

import ExplorerCommentForm from "./Form";
import ExplorerCommentList from "./list";

export type explorerCommentContentProps = {
  open: boolean;
  onClose(): void;
  params: { id: string };
};

interface explorerCommentContentPropsWithRef
  extends explorerCommentContentProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

function ExplorerCommentContent({
  onClose,
  params,
  containerRef,
}: explorerCommentContentPropsWithRef) {
  const [commentToReply, setCommentToReply] = useState<CommentItem>();
  const { data } = useGetNewsComments({ newsId: +params.id });
  const comments = data?.comments || [];

  return (
    <div className="flex flex-col  h-auto justify-between min-h-full">
      {/* Close button */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-start">
          <AppIcon
            icon="gg:close-o"
            className="cursor-pointer"
            width={16}
            onClick={onClose} // Trigger onClose when clicked
          />
        </div>
        {/* Agreement message */}
        <AppTypo variant="small">
          By proceeding, a public profile will be created and you are agreeing
          to our{" "}
          <Link href="" className="underline">
            Community Guidelines
          </Link>
          ,{" "}
          <Link href="" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="" className="underline">
            Privacy & Cookies
          </Link>
          .
        </AppTypo>
        {/* Comment form and list */}
        {/* Form for users to submit comments */}
        <Separator /> {/* Separator between form and comment list */}
        <ExplorerCommentList
          comments={comments}
          setCommentToReply={setCommentToReply}
          newsId={+params.id}
        />
      </div>

      <ExplorerCommentForm
        commentData={comments}
        id={+params.id}
        containerRef={containerRef}
        commentToReply={commentToReply}
        clearCommentToReply={() => setCommentToReply(undefined)}
      />
      {/* List of existing comments */}
    </div>
  );
}

export default ExplorerCommentContent;
