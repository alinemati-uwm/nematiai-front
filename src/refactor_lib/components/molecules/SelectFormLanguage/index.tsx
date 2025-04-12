import React, { useMemo } from "react";

import { SelectAndDrawer } from "@/components/shared";
import type { typeStateAndDispatchCreateDocument } from "@/components/shared/grammar_translate_rewrite/reducer";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import { ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES } from "@/refactor_lib/constants/advancedPromptOptions";

const SelectFormLanguage = ({
  stateAndDispatchInfo,
}: {
  stateAndDispatchInfo: typeStateAndDispatchCreateDocument;
}) => {
  const {
    page: { grammar },
  } = useGetDictionary();

  const drawerItems = useMemo(
    () =>
      ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES.map(langItem => ({
        id: langItem.value,
        value: langItem.label,
      })),
    [],
  );

  return (
    <div className="gap-label-space flex flex-col">
      <Label>{grammar.grammar_language_label}</Label>
      <SelectAndDrawer
        value={stateAndDispatchInfo.state.language}
        setValue={value => {
          stateAndDispatchInfo.dispatch({
            type: "SET_STATE",
            listStates: {
              language: value,
            },
          });
        }}
        items={drawerItems}
      />
    </div>
  );
};

export default SelectFormLanguage;
