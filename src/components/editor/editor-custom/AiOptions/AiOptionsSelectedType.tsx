import React from "react";

import useAiOptionStorage from "@/components/editor/editor-custom/AiOptions/useAiOptionStorage";
import { useGetDictionary } from "@/hooks";

import AiOptionMenuItemList from "./AiOptionMenuItemList";

export default function AiOptionsSelectedType() {
  const { aiActionsList, selectedAction, setSelectedAction } =
    useAiOptionStorage();
  const {
    components: { editor: dictionary },
  } = useGetDictionary();

  const list = aiActionsList.map(i => ({
    title: dictionary[i.titleI18n],
    value: i.id,
  }));

  const selectedActionTitle = selectedAction
    ? dictionary[selectedAction.titleI18n]
    : "";

  const onChange = (value: string) => {
    const action = aiActionsList.find(i => i.id === value);
    if (!action) return;
    setSelectedAction(value, action.selectedOption);
  };

  return (
    <div className=" ms-2 px-2  relative bg-muted border rounded">
      <AiOptionMenuItemList
        className="!py-1 !text-xs"
        title={selectedActionTitle}
        onChange={onChange}
        list={list}
      />
    </div>
  );
}
