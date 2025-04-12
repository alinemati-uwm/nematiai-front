import React, { useState, type FC } from "react";

import PageGenerate from "@/components/page-generate";
import { mindMapForms } from "@/components/pages/mind-map/constants";
import MindMapFields from "@/components/pages/mind-map/mind-map-generate/generate-fields";
import type { MindMapTab } from "@/components/pages/mind-map/types";
import { useGetDictionary } from "@/hooks";

interface IProps {
  onSubmit: (value: string, activeTab: MindMapTab, file?: File) => void;
}

const MindMapGenerate: FC<IProps> = ({ onSubmit }) => {
  const {
    page: { mind_map: dictionary },
  } = useGetDictionary();
  const [activeTab, setActiveTab] = useState<MindMapTab>("prompt_tab");
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<File>();

  return (
    <PageGenerate className="lg:pt-[8%]">
      <PageGenerate.Main>
        <PageGenerate.Hero
          title={dictionary.page_title}
          description={dictionary.page_description}
        />
        <PageGenerate.Tabs
          activeTab={activeTab}
          onTabChange={val => setActiveTab(val as MindMapTab)}
          tabs={mindMapForms.map(tab => ({
            ...tab,
            title: dictionary[tab.tabKey as MindMapTab] || tab.title,
          }))}
        />
        <PageGenerate.Form
          onSubmit={() => onSubmit(value, activeTab, files)}
          buttonTitle={dictionary.generate_btn_label}
        >
          <MindMapFields
            activeTab={activeTab}
            value={value}
            setValue={setValue}
            setFile={setFiles}
          />
        </PageGenerate.Form>
      </PageGenerate.Main>
    </PageGenerate>
  );
};

export default MindMapGenerate;
