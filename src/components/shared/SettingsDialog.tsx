"use client";

import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { ChildrenProps } from "@/services/types";

import { AppTooltip } from "./AppTooltip";

interface IProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  triggerBtnLabel: string;
  title: string;
  triggerBtnClass?: string;
  submitBtnLabel?: string;
  submitBtnClass?: string;
  contentClass?: string;
  tooltipTriggerClassName?: string;
  disabled?: boolean;
  closeDialog?: boolean;
  resetFields?: () => void;
  triggerBtnVariant?:
    | "secondary"
    | "outline"
    | "link"
    | "default"
    | "ghost"
    | "input"
    | "text"
    | "gradiant"
    | null;
}

type OnSubmitFn = (
  e: FormEvent<HTMLFormElement>,
  onFinallyCallback?: () => void,
) => void;

/**
 * dialog with title and submit button used in account settings and workspace settings
 * @param title dialog title show in header
 * @param btnLabel trigger button label
 * @param triggerBtnClass trigger button extra classnames
 * @param onSubmit form submit handler
 * @param children dialog content
 * @param submitBtnLabel submit button label
 * @param submitBtnClass submit button extra classnames
 * @param triggerBtnVariant trigger button variant
 * @param contentClass dialog content extra classnames
 * @constructor
 */
export function SettingsDialog({
  title,
  triggerBtnLabel,
  triggerBtnClass,
  onSubmit,
  children,
  submitBtnLabel,
  submitBtnClass,
  triggerBtnVariant = "outline",
  contentClass,
  disabled,
  isDisabledModalTriggerButton = false,
  disabledModalTriggerButtonTooltip = "",
  closeDialog,
  resetFields,
  tooltipTriggerClassName,
}: ChildrenProps<IProps> & {
  onSubmit: OnSubmitFn;
  isDisabledModalTriggerButton?: boolean;
  disabledModalTriggerButtonTooltip?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    common: { save_label },
  } = useGetDictionary();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    closeDialog && setOpen(false);
  }, [closeDialog]);

  //reset fields
  useEffect(() => {
    !open && resetFields && resetFields();
  }, [open]);
  /**
   * form submit handler
   * add this function to control isSubmitting state
   * @param e form submit event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(e, () => {
      setIsSubmitting(false);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDisabledModalTriggerButton ? (
          <AppTooltip
            tooltipTriggerClassName={cn(
              "cursor-not-allowed  ",
              tooltipTriggerClassName,
            )}
            asChild={false}
            title={disabledModalTriggerButtonTooltip}
          >
            <Button
              variant={triggerBtnVariant}
              className={triggerBtnClass}
              onClick={() => setOpen(true)}
              disabled
            >
              {triggerBtnLabel}
            </Button>
          </AppTooltip>
        ) : (
          <Button
            variant={triggerBtnVariant}
            className={triggerBtnClass}
            onClick={() => setOpen(true)}
          >
            {triggerBtnLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={cn("col max-h-[100dvh] max-w-sm bg-popover", contentClass)}
      >
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="col w-full gap-2"
          method="POST"
        >
          {children}
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn(
              "relative mt-4 w-full px-10 sm:ml-auto sm:w-fit md:px-5",
              submitBtnClass,
            )}
            disabled={isSubmitting || disabled} // disable button when isSubmitting
          >
            {/*
            show loading spinner and hide label when isSubmitting
            */}

            {submitBtnLabel || save_label}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
