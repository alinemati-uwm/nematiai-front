"use client";

import { useState } from "react";

import { type UseQueryResult } from "@tanstack/react-query";

import { MinimalButton } from "@/components/shared";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetDictionary } from "@/hooks";
import useDeleteHistory from "@/refactor_lib/hooks/mutations/useDeleteHistory";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

interface DeleteProps {
  documentId: string;
  documentTitle: string;
  query: UseQueryResult<any, unknown>;
  clearEditorAfterDelete: () => void;
}
/**
 * DeleteDocumentPopover component renders a popover that allows users to delete a document.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.documentId - The unique identifier of the document to be deleted.
 * @param {string} props.documentTitle - The title of the document to be deleted.
 * @param {Object} props.query - The query parameters.
 *
 * @returns {JSX.Element} The rendered DeleteDocumentPopover component.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <DeleteDocumentPopover
 *   documentId="12345"
 *   documentTitle="Sample Document"
 *   query={{ uuid: "12345" }}
 * />
 *
 * @remarks
 * This component uses several custom hooks:
 * - `useGetDictionary` to get language-specific strings.
 * - `useQueryParams` to manage query parameters.
 * - `useDeleteHistory` to handle the deletion of the document.
 * - `useToaster` to display success or error messages.
 *
 * The component maintains an internal state `open` to control the visibility of the popover.
 *
 * The `onDelete` function handles the deletion process, including updating the UI and displaying
 * appropriate messages based on the success or failure of the deletion operation.
 */
export default function DeleteDocumentPopover({
  documentId,
  documentTitle,
  query,
  clearEditorAfterDelete,
}: DeleteProps) {
  const [open, setOpen] = useState(false);
  const {
    page: { document: lang },
    common,
  } = useGetDictionary();

  const { setQueryByRouter, queries } = useQueryParams();

  const { mutateAsync: deleteHistoryByUUID, isPending: deleteIsPending } =
    useDeleteHistory();

  const { toaster } = useToaster();

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteHistoryByUUID(documentId, {
      onSuccess: () => {
        setOpen(false);

        toaster({
          toastProps: {
            type: "success",
            message: `${documentTitle} is deleted`,
          },
        });

        if (queries.uuid === documentId) {
          setQueryByRouter({}, ["uuid", "version"]);
          clearEditorAfterDelete();
        }
      },
      onError: () => {
        setOpen(false);

        toaster({
          toastProps: {
            type: "error",
            message: `There is a problem deleting the document named '${documentTitle}.`,
          },
        });
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/*delete popover button to open popover*/}
      <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
        <div className="ml-auto">
          <MinimalButton
            size="xs"
            icon="mdi:trash-outline"
            title="Delete"
            color="danger"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-80 flex-col gap-4 p-4"
        collisionPadding={30}
      >
        <div>
          <h3 className="text-base font-semibold">
            {lang.delete_document_item}
          </h3>
          <p>{lang.delete_history_description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {common.cancel}
          </Button>

          <Button disabled={deleteIsPending} color="danger" onClick={onDelete}>
            {deleteIsPending && (
              <Loading rootClass="-ms-1 me-1 " svgClass="w-4 h-4" />
            )}
            {!deleteIsPending && `${common.delete_label}`}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
