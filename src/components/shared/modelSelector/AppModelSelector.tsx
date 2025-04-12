import React, { useEffect } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";

import AppPopover from "../AppPopover";
import AppModelSelectorHead from "./components/Head";
import ModelSelectorItem from "./components/item/Item";
import AppModelSelectorLoading from "./components/Loading";
import ModelSelectorResaultSearch from "./components/search/Result";
import ModelSelectorSearch from "./components/search/Search";
import ModelSettingModal from "./components/setting/Setting";
import AppModelSelectorContext from "./context";
import useHookModelSelector from "./hooks/useHookModelSelector";
import useHookProvideContainer from "./hooks/useHookProvideContainer";
import type appModelSelectorTypes from "./type";

function AppModelSelector(props: appModelSelectorTypes["props"]) {
  const { states, updateState } = useHookModelSelector();
  const { isLessThan } = useBreakpoint();
  const { engines, serviceModels } = useGetAppTypeEngines({
    GetAllModels: { modelName: props.appType },
  });
  const { initialEngine, setSelectedEngine } = useFormStore();
  const { selectedEngine } = useEngineFeatures();
  useHookProvideContainer({
    setContainer: div => updateState("container", div),
  });

  //initialize the store
  useEffect(() => {
    if (engines) {
      initialEngine(engines);
      setSelectedEngine(
        selectedEngine ? selectedEngine : engines.length ? engines[0] : "",
      );
    }
  }, [engines, selectedEngine]);

  useEffect(() => {
    if (selectedEngine && !!serviceModels.data) {
      const allModels = serviceModels.data?.data[0].models ?? [];
      props?.model?.onChange?.(
        allModels?.find(el => el?.value === selectedEngine) || allModels[0],
      );
    }
  }, [selectedEngine, serviceModels.data]);

  return (
    <AppModelSelectorContext
      value={{
        states: { ...states, models: serviceModels.data?.data ?? [] },
        methods: { updateState },
        props: { setting: true, title: true, ...props },
      }}
    >
      {serviceModels.isLoading ? (
        <AppModelSelectorLoading />
      ) : (
        <>
          <AppPopover
            props={{
              root: {
                onOpenChange: val => updateState("dropdown", val),
                open: states.dropdown,
              },
              trigger: {
                className: "w-full",
              },
              portal: {
                container: states.container,
              },
              content: {
                side: "bottom",
                align: isLessThan("sm") ? "center" : "start",
                sideOffset: 10,
                className:
                  "min-h-[200px] sm:min-h-[auto] p-2 sm:w-[300px] fixed bottom-0 left-0 right-0 sm:relative sm:left-[unset] sm:bottom-[unset] sm:right-[unset] z-20 data-[side=bottom]:slide-in-from-top-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[side=top]:slide-in-from-bottom-2 data-[state=open]:fade-in-0 data-[state=close]:fade-out-0",
              },
            }}
            trigger={<AppModelSelectorHead />}
          >
            {isLessThan("sm") ? (
              <div
                className="fixed top-0 left-0 bottom-0 right-0 inset-0 z-50 bg-background/30 backdrop-blur-sm"
                onClick={() => updateState("dropdown", false)}
              />
            ) : null}
            <div className="flex flex-col relative z-[60]">
              <ModelSelectorSearch />
              <div className="border-t my-4"></div>
              <div className="flex flex-col gap-y-3 max-h-[400px] overflow-auto">
                {serviceModels.data?.data.length ? (
                  states.search.length ? (
                    <ModelSelectorResaultSearch />
                  ) : (
                    serviceModels.data.data.map((el, key) => (
                      <ModelSelectorItem
                        defaultOpen={key === 0}
                        key={key}
                        model={el}
                      />
                    ))
                  )
                ) : null}
              </div>
            </div>
          </AppPopover>
          <ModelSettingModal
            open={states.setting}
            onClose={() => updateState("setting", false)}
          />
        </>
      )}
    </AppModelSelectorContext>
  );
}

export default AppModelSelector;
