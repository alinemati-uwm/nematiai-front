"use client";

import { memo } from "react";

import AppModelSelector from "@/components/shared/modelSelector/AppModelSelector";

import { NewChatButton } from "./ChatArea";

/**
 * Chat settings component used in chat page
 * includes engine select and chat tools
 * @constructor
 */
export default memo(function ChatSettings({
  stopGenerate,
}: {
  app_name: AppsType;
  stopGenerate: (val: { abortFetch: boolean }) => void;
}) {
  return (
    <div className=" flex flex-row w-full gap-4 items-center justify-center">
      {/*engine select*/}

      <NewChatButton stopGenerate={stopGenerate} />

      <AppModelSelector appType="CHAT_BOT" />
    </div>
  );
});
