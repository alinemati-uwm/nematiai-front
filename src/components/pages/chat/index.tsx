"use client";

import { memo } from "react";

import dynamic from "next/dynamic";

import AppLayout from "@/components/layout/AppLayout";
import ChatCodeEditor from "@/components/pages/chat/components/ChatCodeEditor";
import ChatContent from "@/components/pages/chat/components/ChatContent";
import { useChatHistoryServices } from "@/components/pages/chat/hooks/useChatHistoryServices";
import { SetSearchParamProvider } from "@/components/shared";
import PageMindmap from "@/components/shared/PageMindmap";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useHandleChatBotConversation from "@/hooks/useHandleChatBotConversation";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import { useUiStore } from "@/stores/zustand/ui-store";
import DocumentLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/document/loading";
import type { SCRPropsType } from "@/services/types";

import ChatSettings from "./components/ChatSettings";
import { useDrawerInfo } from "./hooks/useDrawerInfo";

const DocumentPage = dynamic(() => import("@/components/pages/document"), {
  loading: () => <DocumentLoading />,
});

/**
 * ChatPage component is a memoized functional component that renders the chat page layout.
 * It utilizes various hooks and components to manage the chat interface, including chat content,
 * settings, and a resizable drawer for additional functionalities like document viewing and chat editing.
 *
 * @param {SCRPropsType} props - The properties passed to the ChatPage component.
 * @param {object} props.params - The parameters for the chat page.
 * @param {object} props.searchParams - The search parameters for the chat page.
 *
 * @returns {JSX.Element} The rendered chat page component.
 *
 * @component
 *
 * @example
 * return (
 *   <ChatPage params={params} searchParams={searchParams} />
 * )
 *
 * @remarks
 * - The component uses `useChatbot` hook to manage chat content and actions.
 * - The `useEditorStore`, `useDrawerInfo`, and `useUiStore` hooks are used to manage UI states.
 * - The `SetSearchParamProvider` is used to set the app name in the URL search params.
 * - The layout includes a header, main content area, and a resizable drawer for additional tools.
 */
export default memo(function ChatPage({ params, searchParams }: SCRPropsType) {
  /**
   * * Important: SetSearchParamProvider is used to set the app name in the URL search params.
   *  This value is used in the app's Header in the layout or form-section,
   *  and anywhere that needs to know the app name.
   */
  const isFullScreen = useEditorStore.use.isFullScreen();
  const { drawerInfo, close } = useDrawerInfo();
  const { isSidePanelOpen } = useUiStore(state => ({
    isSidePanelOpen: state.isSidePanelOpen,
    setIsSidePanelOpen: state.setIsSidePanelOpen,
  }));

  // Custom hook for managing the chatbot conversation.
  const { stopGenerate, handleGenerate, handleRegenerate } =
    useHandleChatBotConversation({ app_name: "chat_bot" });

  const [maxWidth, minWidth, defaultWidth] = drawerInfo.show
    ? !isFullScreen
      ? [65, 50, 50]
      : [100, 100, 100]
    : [0, 0, 0];

  const service = useChatHistoryServices();

  const drawerComponent = {
    document: (
      <DocumentPage
        callFromOtherPage={true}
        searchParams={searchParams}
        params={params}
        initialValue={drawerInfo.editor?.text}
      />
    ),
    editor: (
      <ChatCodeEditor
        initialValue={drawerInfo.editor?.text || ""}
        title={drawerInfo.editor?.title || ""}
        codeLanguage={drawerInfo.editor?.codeLanguage}
      />
    ),
    mindmap: (
      <PageMindmap
        gap={0}
        value={drawerInfo.editor?.text || ""}
        isOpen={!!(drawerInfo.show && drawerInfo.active === "mindmap")}
        documentName={drawerInfo.editor?.title || ""}
        onClose={close}
        isFullScreen={isFullScreen}
      />
    ),
    humanize: null,
  };

  return (
    <AppLayout>
      <AppLayout.side />
      <AppLayout.body
        className={`max-w-[100%] ${!drawerInfo.show ? `md:max-w-[calc(100%-${isSidePanelOpen ? "240px" : "var(--side-width-collapse)"})]` : ""}`}
      >
        <AppLayout.header
          document
          history={{
            type: "chat_bot",
            titleOfquerySelector: "chatId",
            service,
          }}
          customComponent={
            <ChatSettings stopGenerate={stopGenerate} app_name="chat_bot" />
          }
        />

        <ResizablePanelGroup direction="horizontal" className="col">
          <ResizablePanel order={1} defaultSize={100 - defaultWidth}>
            <AppLayout.main className="!px-0">
              <SetSearchParamProvider appName="app" appSearchParamValue="chat">
                <div className="flex flex-row w-full h-full max-w-[100%]">
                  <div className=" w-full lg:w-auto max-w-[100%] flex justify-center  flex-1 duration-1000 transition-all">
                    <ChatContent
                      flagBtnSend
                      showBtnNewConversation
                      stopGenerate={stopGenerate}
                      handleGenerate={handleGenerate}
                      handleRegenerate={handleRegenerate}
                    />
                  </div>
                </div>
              </SetSearchParamProvider>
            </AppLayout.main>
          </ResizablePanel>
          <ResizableHandle className={!drawerInfo.show ? "hidden" : ""} />
          <AppLayout.DrawerBLur />
          <ResizablePanel
            order={1}
            maxSize={maxWidth}
            minSize={minWidth}
            defaultSize={defaultWidth}
            className={cn(
              "transition-all duration-200 relative md-Drawchat",
              drawerInfo.show ? "" : "md-Drawchat-close",
            )}
          >
            <AppLayout.Drawer
              isOpen={drawerInfo.show || false}
              className="rounded-ts max-md:rounded-te  p-4 md:p-6 bg-holder-light border-t border-s end-0 inset-y-0 w-full"
            >
              {drawerInfo.active ? drawerComponent[drawerInfo.active] : null}
            </AppLayout.Drawer>
          </ResizablePanel>
        </ResizablePanelGroup>
      </AppLayout.body>
    </AppLayout>
  );
});
