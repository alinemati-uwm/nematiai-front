"use client";

import React, { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import PageGenerate from "@/components/page-generate";
import { humanizeTabs } from "@/components/pages/humanize/constants";
import Fields from "@/components/pages/humanize/fields";
import type { HumanizeTabs } from "@/components/pages/humanize/types";
import { useHumanizeMutation } from "@/components/pages/humanize/useHumanizeMutation";
import { SetSearchParamProvider } from "@/components/shared";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useGetDictionary } from "@/hooks";

/**
 * The Humanize component is responsible for rendering the humanize page layout.
 * It utilizes various hooks and components to manage state, handle user interactions,
 * and display the appropriate content based on the current state.
 */
const Humanize = () => {
  // Retrieve the humanize dictionary from the dictionary hook
  const {
    page: { humanize: dictionary },
  } = useGetDictionary();

  // Retrieve chat drawer information and state management functions from the chatbot store
  // for when click on assist message humanize option in chatbot
  const { chatDrawerInfo, setChatDrawerInfo } = useChatbotStore(state => ({
    chatDrawerInfo: state.drawerInfo,
    setChatDrawerInfo: state.setDrawerInfo,
  }));

  // State for managing the active tab
  const [activeTab, setActiveTab] = useState<HumanizeTabs>(
    humanizeTabs[0].tabKey as HumanizeTabs,
  );

  // Destructure various functions and state variables from the useHumanizeMutation hook
  const {
    handleHumanize,
    isPending,
    isPendingForStop,
    outputValue,
    setOutputValue,
    stopGeneration,
    inputValue,
    setInputValue,
    outputRef,
    responseMessage,
  } = useHumanizeMutation();

  // Effect to handle chat drawer information changes
  useEffect(() => {
    if (chatDrawerInfo.active == "humanize" && !!chatDrawerInfo?.editor?.text) {
      setInputValue(chatDrawerInfo.editor.text);
      void handleHumanize(chatDrawerInfo.editor.text, activeTab);
      setChatDrawerInfo({ show: false, active: undefined });
    }
  }, [chatDrawerInfo]);

  // Function to handle form submission
  const handleSubmit = () => {
    //stop generation if it is pending
    if (isPending) {
      void stopGeneration(false);
    } else {
      void handleHumanize(inputValue, activeTab);
    }
  };

  return (
    <AppLayout>
      <AppLayout.body>
        <AppLayout.header
          history={{ type: "humanize" }}
          roadmap
          profile
          workspace
          upgrade
          // customComponent={<AppModelSelector appType="AI_WRITER" />}
        />
        <AppLayout.main>
          <SetSearchParamProvider appName="app" appSearchParamValue="humanize">
            <PageGenerate className="items-center">
              <PageGenerate.Main>
                <PageGenerate.Hero
                  title={dictionary.hero_title}
                  description={dictionary.hero_description}
                  titleClassName="from-orange-dark via-orange to-label-dark"
                />
                <PageGenerate.Tabs
                  activeTab={activeTab}
                  onTabChange={val => setActiveTab(val as HumanizeTabs)}
                  tabs={humanizeTabs.map(tab => ({
                    ...tab,
                    title:
                      dictionary.tab_labels[tab.tabKey as HumanizeTabs] ||
                      tab.title,
                  }))}
                />
                <PageGenerate.Form
                  onSubmit={handleSubmit}
                  buttonTitle={
                    isPending
                      ? dictionary.stop_button_label
                      : dictionary.generate_button_label
                  }
                  disabled={isPendingForStop}
                >
                  <Fields
                    inputValue={inputValue}
                    inputOnChange={setInputValue}
                    outputValue={isPending ? responseMessage : outputValue}
                    onChangeText={setOutputValue}
                    outputRef={outputRef}
                    isLoading={isPending || isPendingForStop}
                  />
                </PageGenerate.Form>
              </PageGenerate.Main>
            </PageGenerate>
          </SetSearchParamProvider>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
};

export default Humanize;
