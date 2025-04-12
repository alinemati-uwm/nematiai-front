import React, { useContext } from "react";

import Image from "next/image";

import { MinimalButton } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { inputVariant } from "@/components/ui/variants";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";

import AppIcon from "../../AppIcon";
import AppModelSelectorContext from "../context";

function AppModelSelectorHead() {
  const {
    states: { dropdown },
    props: { appType, formMode, setting, title, model },
    methods: { updateState },
  } = useContext(AppModelSelectorContext);
  const { selectedEngine } = useFormStore();
  const { enginesName, enginesIcon } = useGetAppTypeEngines({
    GetAllModels: { modelName: appType },
  });

  const icon = model?.value
    ? enginesIcon?.[model.value]
    : selectedEngine
      ? enginesIcon?.[selectedEngine]
      : null;

  return (
    <>
      <div
        className={`flex flex-row items-center justify-between cursor-pointer gap-x-2 rounded ${formMode ? "w-full" : "w-[100px] md:w-[175px]"} ${inputVariant({ variant: "input", color: "input" })}`}
      >
        <div className="flex flex-row items-center  truncate gap-x-1  ">
          {icon ? (
            <Image
              src={icon}
              alt=""
              className="rounded-full relative bottom-[2px]"
              width={16}
              height={16}
            />
          ) : (
            <AppIcon icon="hugeicons:chat-gpt" width={16} />
          )}
          {title ? (
            <div className="truncate text-label">
              <AppTypo>
                {model?.value
                  ? enginesName?.[model?.value]
                  : selectedEngine
                    ? enginesName?.[selectedEngine]
                    : ""}
              </AppTypo>
            </div>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-x-1">
          {setting && (
            <MinimalButton
              element="div"
              icon="uil:setting"
              size="xs"
              onClick={e => {
                e.stopPropagation();
                updateState("setting", true);
              }}
            />
            // <AppIcon
            // 	icon="uil:setting"
            // 	width={16}
            //
            // />
          )}
          <AppIcon
            icon="ic:round-keyboard-arrow-down"
            width={16}
            className={`transform transition ${dropdown ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </>
  );
}

export default AppModelSelectorHead;
