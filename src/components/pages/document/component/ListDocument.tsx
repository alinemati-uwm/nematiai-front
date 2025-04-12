"use client";

import React from "react";

import { MinimalButton } from "@/components/shared";
import { useQueryParams } from "@/hooks/useQueryParams";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

import { type DocumentType } from "../types";
import DeleteDocumentPopover from "./DeleteDocumentPopover";

/**
 * Document component renders a list of documents based on the provided answers and search value.
 * It allows interaction with each document item, such as clicking to select and delete.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.answers - The list of document answers to be displayed.
 * @param {string} props.query - The current query string.
 * @param {string} props.selectedUUID - The UUID of the currently selected document.
 * @param {Function} props.beforeChangeDocument - Callback function to be called before changing the document.
 * @param {string} props.searchValue - The search value to filter the documents by title.
 * @param {Function} [props.renderItem] - Optional function to render a custom item.
 * @param {Function} [props.onClick] - Optional function to be called when a document item is clicked.
 *
 * @returns JSX.Element The rendered list of documents.
 */
export const Document = ({
  answers,
  query,
  selectedUUID,
  beforeChangeDocument,
  searchValue,
  renderItem,
  onClick,
  clearEditorAfterDelete,
}: DocumentType & {
  renderItem?: (item: HistoryAPIResponse["answers"]) => React.ReactNode;
  onClick?: () => void;
  clearEditorAfterDelete: () => void;
}) => {
  {
    const { setQueryByRouter } = useQueryParams();

    const clickOnEachFile = (item: HistoryAPIResponse["answers"]) => {
      beforeChangeDocument(selectedUUID);
      if (item.versions[0]) {
        setQueryByRouter({
          uuid: item.uuid,
          version: item.versions[0] && item.versions[0].uuid,
        });
      } else {
        setQueryByRouter({ uuid: item.uuid }, ["version"]);
      }
      if (onClick) onClick();
    };

    const isSelected = (item: HistoryAPIResponse["answers"]) => {
      return selectedUUID === item.uuid ? " bg-primary-lighter " : "";
    };

    return answers.map((item, index) => {
      if (
        item.title &&
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return renderItem ? (
          renderItem(item)
        ) : (
          <div
            key={index}
            className="cursor-pointer hover:bg-holder-light hover:border-holder-dark rounded"
            onClick={() => {
              clickOnEachFile(item);
            }}
          >
            <div
              className={` ${isSelected(item)} w-full cursor-pointer border flex flex-row gap-2 px-3  h-14 rounded-lg items-center`}
            >
              <div className="flex items-center bg-info-lighter justify-center h-10 w-10 min-w-10 rounded-md">
                <MinimalButton
                  icon="hugeicons:doc-02"
                  variant="ghost"
                  color="info"
                />
              </div>
              <p className="max-w-[90%] truncate dont-[400]">{item.title}</p>
              <div className="flex flex-row gap-0.5 ml-auto items-start">
                <DeleteDocumentPopover
                  documentId={item.uuid.toString()}
                  documentTitle={item.title || ""}
                  query={query}
                  clearEditorAfterDelete={clearEditorAfterDelete}
                />
              </div>
            </div>
          </div>
        );
      }
    });
  }
};
