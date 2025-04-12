"use client";

import React, { useState } from "react";

import LoadingPage from "@/components/shared/LoadingPage";
import { Input } from "@/components/ui/input";
import useGetListPersoanl from "@/services/document-personal";

import { type propsListDocument } from "../types";
import Empty from "./Empty";
import GenerateDocument from "./GenerateDocument";
import { Document } from "./ListDocument";
import Skeletons from "./Skeleton";

/**
 * HistoryBox component displays a history of documents and provides functionality
 * to generate new documents, search through the history, and handle document selection.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.beforeChangeDocument - Function to call before changing the document.
 * @param {Function} props.onAftergenerate - Function to call after generating a document.
 * @param {Function} props.setSelectedUUID - Function to set the selected document UUID.
 * @param {string} props.selectedUUID - The currently selected document UUID.
 * @param {Function} props.setEditorValue - Function to set the editor value.
 * @param {boolean} props.callFromOtherPage - Flag indicating if the call is from another page.
 * @param {Function} props.setFlagNewDocuemnt - Function to set the flag for a new document.
 * @param {boolean} props.isPendingWhenLoadDetailsByQuery - Flag indicating if details are pending when loading by query.
 *
 * @returns JSX.Element The rendered HistoryBox component.
 */
const HistoryBox = ({
  beforeChangeDocument,
  selectedUUID,
  callFromOtherPage,
  addHandler,
  isPendingWhenLoadDetailsByQuery,
}: propsListDocument) => {
  const { data, query } = useGetListPersoanl();
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <div
        className={`sticky  ${callFromOtherPage ? "top-0 pt-4" : "top-[var(--header-height)]"} bg-holder-lighter flex flex-col gap-y-4 pb-4`}
      >
        <GenerateDocument disabled={!selectedUUID} addHandler={addHandler} />
        <Input
          value={searchValue}
          type="text"
          icon="ion:search"
          className="!ps-8"
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search"
        />
      </div>
      {data?.histories.length !== 0 && (
        <div className="flex-1 flex flex-col gap-y-4 pb-4 ">
          {query.isLoading ? (
            <Skeletons />
          ) : data?.histories.length ? (
            <Document
              searchValue={searchValue}
              beforeChangeDocument={beforeChangeDocument}
              selectedUUID={selectedUUID}
              query={query}
              answers={data.histories}
              clearEditorAfterDelete={addHandler}
            />
          ) : (
            <Empty />
          )}
        </div>
      )}
      {isPendingWhenLoadDetailsByQuery && <LoadingPage></LoadingPage>}
    </>
  );
};

export default HistoryBox;
