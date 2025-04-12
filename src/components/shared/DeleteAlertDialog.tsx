"use client";

import { useState, type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

interface IProps {
  Trigger?: ReactNode;
  title: string;
  description?: string;
  handleSubmit: (fn: () => void) => void;
  setOpen?: (bool: boolean) => void;
  labelButton?: string;
}

/**
 * use for alert user is sure when want to delete anything
 * @param title dialog title
 * @param description message
 * @param Trigger
 * @param handleSubmit for when press delete
 * @param setOpen
 * @param labelButton
 *
 * @constructor
 */
export function DeleteAlertDialog({
  title,
  description,
  Trigger,
  handleSubmit,
  setOpen,
  labelButton,
}: IProps) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    components: {
      shared: { delete_alert_button_label },
      history_items: { cancel },
    },
  } = useGetDictionary();

  return (
    <>
      {Trigger ? (
        <span onClick={() => setIsOpen(true)}>{Trigger}</span>
      ) : (
        <Button onClick={() => setIsOpen(true)} size="sm" color="danger">
          {delete_alert_button_label}
        </Button>
      )}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/*
        if Trigger is not provided, use default button
      */}
        <AlertDialogContent className="max-w-md z-[51]">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/*
            cancel button that close the dialog
          */}
            <AlertDialogCancel asChild>
              <Button variant="outline">{cancel}</Button>
            </AlertDialogCancel>
            {/*
                delete button that call handleSubmit function
            */}
            <Button
              color="danger"
              onClick={e => {
                setIsPending(true);
                e.stopPropagation();
                e.preventDefault();
                handleSubmit(() => {
                  setIsPending(false);
                  setIsOpen(false);
                  setOpen && setOpen(false);
                });
              }}
              isPending={isPending}
            >
              {labelButton ?? delete_alert_button_label}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
