import React, { useContext } from "react";

import PageGenerate from "@/components/page-generate";
import { podcastTabs } from "@/components/pages/podcast/constants";
import PodcastCreateContext from "@/components/pages/podcast/create/context";
import type { PodcastTab } from "@/components/pages/podcast/create/type";
import { useSubmitCreate } from "@/components/pages/podcast/create/useSubmitCreate";
import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import PodcastGenerate from "./Generate";
import PodcastVoices from "./Voices";

function PodcastFormCreate() {
  // Fetch dictionary data for text content
  const { submit } = useSubmitCreate();
  const {
    page: {
      podcast: dictionary, // Text for episode transformation
    },
    components: {
      generateAudio: audioDictionary, // Text for tone selection
    },
  } = useGetDictionary();
  const {
    methods: { updateState },
    states: { tab },
  } = useContext(PodcastCreateContext); // Access podcast context to manage tab state

  return (
    <PageGenerate className="xl:items-center">
      <PageGenerate.Main>
        <PageGenerate.Hero
          title={audioDictionary.ai_podcast_generation}
          description={dictionary.generate_page_subtitle}
          titleClassName="from-primary via-primary-dark to-primary-darker"
        />
        <PageGenerate.Tabs
          activeTab={tab}
          onTabChange={val => updateState("tab", val as PodcastTab)}
          tabs={podcastTabs.map(tab => ({
            ...tab,
            title: dictionary[tab.tabKey as PodcastTab] || tab.title,
          }))}
        />
        <PageGenerate.Form
          onSubmit={submit}
          buttonTitle={dictionary.generate_button}
        >
          <PodcastGenerate /> {/* Render podcast generation component */}
          <AppTypo>{audioDictionary.choose_tone_podcast}</AppTypo>{" "}
          {/* Display tone selection text */}
          <PodcastVoices /> {/* Render voice selection component */}
        </PageGenerate.Form>
      </PageGenerate.Main>
    </PageGenerate>
  );
}

export default PodcastFormCreate;
