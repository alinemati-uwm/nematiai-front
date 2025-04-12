"use client";

import AppIcon from "@/components/shared/AppIcon";

import { likePost } from "../GetAllNews";

interface Props {
  isLiked?: any;
  id?: string;
  close: boolean;
  setClose: (bool: boolean) => void;
}
export default function ButtonsGroupe({ isLiked, id, setClose, close }: Props) {
  return (
    <>
      <div className="bg-glass-dark lg:hover:bg-primary duration-300 p-3 cursor-pointer rounded-md">
        <AppIcon icon="fa:volume-up" width={16} />
      </div>
      <div
        onClick={() => setClose(!close)}
        className="bg-glass-dark lg:hover:bg-primary duration-300 p-3  cursor-pointer rounded-md"
      >
        <AppIcon icon="fluent:comment-text-16-filled" width={16} />
      </div>
      <div
        onClick={() => {
          likePost(id, "like", isLiked);
        }}
        className={`bg-glass-dark lg:hover:bg-primary ${isLiked && "bg-primary"} duration-300 p-3 cursor-pointer rounded-md`}
      >
        <AppIcon icon="bx:like" width={16} />
      </div>
      <div className="bg-glass-dark lg:hover:bg-primary duration-300 p-3 cursor-pointer rounded-md">
        <AppIcon icon="mdi:share-variant-outline" width={16} />
      </div>
    </>
  );
}
