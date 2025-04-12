"use client";

import { DescriptionHoverCard, SelectAndDrawer } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import {
  ADVANCED_PROMPT_OPTIONS_Format,
  ADVANCED_PROMPT_OPTIONS_Length,
  ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW,
  ADVANCED_PROMPT_OPTIONS_TONE,
} from "@/refactor_lib/constants/advancedPromptOptions";

import { type typeStateAndDispatchCreateDocument } from "../../reducer";
import { SelectResponseLang } from "./select-response-lang";

interface IProps {
  hiddenSelectResponseLang?: boolean;
  stateAndDispatchInfo: typeStateAndDispatchCreateDocument;
}

/**
 * this component generate options select boxes like tone , creativity , ...
 * @param hiddenSelectResponseLang
 * @param stateAndDispatchInfo
 * @constructor
 */
export function OptionsSelectBoxes({
  hiddenSelectResponseLang = false,
  stateAndDispatchInfo,
}: IProps) {
  const {
    components: { form_section },
  } = useGetDictionary();

  return (
    <>
      <RenderIf isTrue={!hiddenSelectResponseLang}>
        <SelectResponseLang />
      </RenderIf>

      {/*show language select box*/}
      <div className="gap-form grid grid-cols-1 items-start sm:grid-cols-2">
        <div className="flex flex-col gap-label-space">
          <Label className="row m-0 gap-1">
            {form_section.form_format}
            <DescriptionHoverCard
              description={form_section.form_format_description}
            />
          </Label>

          <SelectAndDrawer
            value={stateAndDispatchInfo.state.format}
            setValue={value => {
              stateAndDispatchInfo.dispatch({
                type: "SET_STATE",
                listStates: {
                  format: value,
                },
              });
            }}
            items={ADVANCED_PROMPT_OPTIONS_Format as unknown as string[]}
          />
        </div>
        <div className="flex flex-col gap-label-space">
          <Label className="row m-0 gap-1">
            {form_section.form_tone}
            <DescriptionHoverCard
              description={form_section.form_tone_description}
            />
          </Label>

          <SelectAndDrawer
            value={stateAndDispatchInfo.state.tone}
            setValue={value => {
              stateAndDispatchInfo.dispatch({
                type: "SET_STATE",
                listStates: {
                  tone: value,
                },
              });
            }}
            items={ADVANCED_PROMPT_OPTIONS_TONE as unknown as string[]}
          />
        </div>
        <div className="flex flex-col gap-label-space">
          <Label className="row m-0 gap-1">
            {form_section.form_point}
            <DescriptionHoverCard description={form_section.form_point} />
          </Label>

          <SelectAndDrawer
            value={stateAndDispatchInfo.state.pointOfView}
            setValue={value => {
              stateAndDispatchInfo.dispatch({
                type: "SET_STATE",
                listStates: {
                  pointOfView: value,
                },
              });
            }}
            items={ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW as unknown as string[]}
          />
        </div>
        <div className="flex flex-col gap-label-space">
          <Label className="row m-0 gap-1">
            {form_section.form_length}
            {/*<DescriptionHoverCard description={form_section.form_point} />*/}
          </Label>

          <SelectAndDrawer
            value={stateAndDispatchInfo.state.length}
            setValue={value => {
              stateAndDispatchInfo.dispatch({
                type: "SET_STATE",
                listStates: {
                  length: value,
                },
              });
            }}
            items={ADVANCED_PROMPT_OPTIONS_Length as unknown as string[]}
          />
        </div>

        {/*show input type number for determine number of results*/}
        {/* <NumberOfResults /> */}
      </div>
    </>
  );
}
