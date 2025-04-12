"use client";

import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppModelSelector from "@/components/shared/modelSelector/AppModelSelector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import { type ModelName } from "@/services/models";

interface IProps {
  buttonContent: string;
  isPending: boolean;
  isDisabledSubmit: boolean;
  onClick(): void;
  appType: ModelName;
  stopGenerate: (abortFetch: boolean) => void;
  isPendingForStop: boolean;
}

/**
 * Component for the submit button with engine selection.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.buttonContent - The content to display on the button.
 * @param {function} props.onClick - Function to handle the button click.
 * @param {boolean} props.isPending - Flag to indicate if the generation is pending.
 * @param {boolean} props.isDisabledSubmit - Flag to indicate if the submit button is disabled.
 * @param {boolean} props.isPendingForStop - Flag to indicate if the stop action is pending.
 * @param {function} props.stopGenerate - Function to stop the generation process.
 * @param {ModelName} props.appType - The type of the application model.
 */
export function SubmitButtonSelectEngine({
  buttonContent,
  onClick: handlegenerate,
  isPending,
  isDisabledSubmit,
  isPendingForStop,
  stopGenerate,
  appType,
}: IProps) {
  const { common: lang } = useGetDictionary();

  /**
   * Handle the button click event.
   */
  const onClick = () => {
    if (!isPending && !isPendingForStop) {
      handlegenerate();
    } else {
      if (isPending) {
        stopGenerate(false);
      }
    }
  };
  return (
    <>
      <div className=" col gap-label-space">
        <Label>{lang.model}</Label>
        <AppModelSelector appType={appType} formMode />
      </div>
      <div className="bg-holder-lighter pt-2 flex flex-col gap-form button-sticky-sidebar">
        {/*show engine select box*/}
        {/*submit button*/}
        <Button
          className="row w-full text-small h-input text-white"
          onClick={onClick}
          isPending={isPending}
          disabled={isDisabledSubmit}
        >
          {isPendingForStop ? (
            lang.stoping
          ) : isPending ? (
            lang.stop
          ) : (
            <div className="flex flex-row gap-x-1">
              <AppIcon icon="iconamoon:edit-light" width={16} />
              {buttonContent}
            </div>
          )}
        </Button>
      </div>
    </>
  );
}
