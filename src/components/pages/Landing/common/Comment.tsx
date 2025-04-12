import AppIcon from "@/components/shared/AppIcon";

import { type commentItem } from "../Components/comments/model";

interface Props {
  index: number;
  f: (v: number) => string | undefined;
  comment: commentItem;
  onSelect: (v: number) => void;
}

export function CommentSection({ f, index, comment, onSelect }: Props) {
  return (
    <div
      onClick={() => {
        onSelect(index);
      }}
      key={index}
      className=" border-primary border backdrop-blur-sm z-10 bg-glass-dark  cursor-grab active:cursor-grabbing  mr-12 flex w-full min-w-0 max-w-[400px] flex-none flex-col rounded-xl   p-6 "
    >
      <div className="mb-5 flex flex-row  items-center justify-between">
        <div className="flex flex-row">
          {/*Avatar*/}
          <div className="me-1.5 rounded-full">
            <AppIcon
              icon="ix:user-profile-filled"
              width={50}
              height={50}
              color="#EEE"
            />
          </div>
          {/*Name*/}
          <div className=" flex flex-col gap-y-1.5 text-label-light">
            <span className="text-base font-medium sub-title-color leading-6">
              {comment.name}
            </span>
            <span className="sub-title-color  text-small">
              {comment.location}
            </span>
          </div>
        </div>
      </div>
      <div className="sub-title-color font-normal leading-6 text-muted-dark">
        {comment.message}
      </div>
    </div>
  );
}
