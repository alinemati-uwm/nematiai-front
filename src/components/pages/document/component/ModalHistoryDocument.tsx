"use client";

import { useState } from "react";

import { MinimalButton } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useGetListPersoanl from "@/services/document-personal";

import { type ModalHistoryDocument } from "../types";
import Empty from "./Empty";
import GenerateDocument from "./GenerateDocument";
import { Document } from "./ListDocument";
import Skeletons from "./Skeleton";

//create new workspace dialog open by click on workspaces combobox

/**
 * ModalHistoryDocument component displays a modal with a history of documents.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.show - Determines if the modal is visible.
 * @param {Function} props.setShow - Function to set the visibility of the modal.
 * @param {string} props.selectedUUID - The UUID of the selected document.
 * @param {Function} props.beforeChangeDocument - Callback function before changing the document.
 *
 * @returns JSX.Element The rendered component.
 */
export function ModalHistoryDocument({
  show,
  setShow,
  selectedUUID,
  beforeChangeDocument,
  addHandler,
}: ModalHistoryDocument) {
  const {
    page: { document: lang },
  } = useGetDictionary();
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, query } = useGetListPersoanl();

  return (
    <>
      {show && (
        <div className="w-full left-0 top-0 z-20 h-full blur-overlay absolute flex justify-center items-center">
          <div className="bg-holder-lighter flex flex-col overflow-y-auto gap-4 rounded m-4 h-[600px] shadow-modal max-h-[calc(100%-2rem)] w-[450px] max-w-[calc(100%-2rem])">
            <div className="sticky top-0 gap-4 flex flex-col bg-holder-lighter ">
              <div className="flex flex-row justify-between  px-4 pt-4 ">
                <AppTypo variant="headingM" type="label">
                  {lang.document}
                </AppTypo>

                <MinimalButton
                  icon="material-symbols:close-rounded"
                  onClick={() => {
                    setShow(false);
                  }}
                ></MinimalButton>
              </div>
              <div className="px-4 flex flex-row justify-between ">
                <GenerateDocument
                  small={true}
                  addHandler={addHandler}
                  onClick={() => {
                    setShow(false);
                  }}
                  className="!w-auto"
                ></GenerateDocument>
                <div className="max-w-[200px]">
                  <Input
                    value={searchValue}
                    type="text"
                    icon="ion:search"
                    className="!ps-8"
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search"
                  />
                </div>
              </div>
              <hr className="mx-4"></hr>
            </div>
            <div className="w-full px-4 ">
              {data?.histories.length !== 0 && (
                <>
                  {query.isLoading ? (
                    <Skeletons col={2} />
                  ) : data?.histories.length ? (
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 pb-4 ">
                      <Document
                        searchValue={searchValue}
                        beforeChangeDocument={beforeChangeDocument}
                        selectedUUID={selectedUUID}
                        query={query}
                        answers={data.histories}
                        onClick={() => {
                          setShow(false);
                        }}
                        clearEditorAfterDelete={addHandler}
                      ></Document>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
