import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import DeletePdfPopOver from "@/components/pages/chat-pdf/componets/DeletePdfPopOver";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { useGetUploadedPDFsForChatPDF } from "@/services/chatPdf";

import HeaderOfSideBar from "./HeaderOfSideBar";
import PdfIsEmpty from "./PdfIsEmpty";
import SearchHistoryChatPdf from "./SearchHistoryChatPdf";
import SkeletonListPdf from "./SkeletonListPdf";
import UploadFileInSideBar from "./UploadFileInSideBar";

interface RestructuredFile {
  id: number;
  file: string;
  title: string;
  uuid: string;
  generate_title: string | null;
}

interface Props {
  sidePanelIsOpen: boolean;
  setSidePanelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  showUploadModal: boolean;
}

const PDFViewerSideBar = ({
  setFile,
  sidePanelIsOpen,
  setSidePanelIsOpen,
  showUploadModal,
}: Props) => {
  //states to control some UI interfaces and searching
  const [searchedValue, setSearchedValue] = useState<string>("");
  const searchParams = useSearchParams();
  const chatIdFromUrl = searchParams.get("chatId");
  const [restructuredPdfFiles, setRestructuredFiles] = useState<
    RestructuredFile[]
  >([]);

  const { common: lang } = useGetDictionary();

  const { queries } = useQueryParams();

  //get total uploaded pdfs
  const {
    data: TotalUploadedPDFs,
    isLoading: fetchAllPdfsIsLoading,
    isSuccess: fetchingPdfIsSuccess,
  } = useGetUploadedPDFsForChatPDF();

  //restructure received PDFs as we need
  useEffect(() => {
    if (TotalUploadedPDFs) {
      setRestructuredFiles(
        TotalUploadedPDFs.conversations.map(conv => {
          return {
            uuid: conv.uuid,
            generate_title: conv.title,
            ...conv.files[0],
          };
        }),
      );
    }
  }, [TotalUploadedPDFs]);

  //function to handle search pdf
  const FilteredFiles = (files: RestructuredFile[]) => {
    if (searchedValue.length === 0) return files;
    return files.filter(file =>
      file.title.toLowerCase().includes(searchedValue.toLowerCase()),
    );
  };

  //set the PDF file if the url contains a valid id
  useEffect(() => {
    if (chatIdFromUrl && fetchingPdfIsSuccess && TotalUploadedPDFs) {
      const fileRelatedToChatId = TotalUploadedPDFs.conversations.filter(
        file => file.uuid === chatIdFromUrl,
      );
      if (fileRelatedToChatId.length === 1) {
        setFile(fileRelatedToChatId[0].files[0].file);
      }
    }
  }, [fetchingPdfIsSuccess]);

  return (
    <>
      <HeaderOfSideBar
        sidePanelIsOpen={sidePanelIsOpen}
        setSidePanelIsOpen={setSidePanelIsOpen}
      ></HeaderOfSideBar>
      <UploadFileInSideBar
        setFile={setFile}
        showUploadModal={showUploadModal}
        sidePanelIsOpen={sidePanelIsOpen}
      ></UploadFileInSideBar>
      <SearchHistoryChatPdf
        setSidePanelIsOpen={setSidePanelIsOpen}
        sidePanelIsOpen={sidePanelIsOpen}
        setSearchedValue={setSearchedValue}
      ></SearchHistoryChatPdf>

      <div className="flex-1 flex flex-col  p-2 pt-0 overflow-y-auto gap-2 ">
        {restructuredPdfFiles &&
          restructuredPdfFiles.length > 0 &&
          !fetchAllPdfsIsLoading && (
            <>
              {FilteredFiles(restructuredPdfFiles).map((file, index) => {
                return (
                  <div key={index} className="relative">
                    <Link href={`/chatpdf?app=chatpdf&chatId=${file.uuid}`}>
                      <div className="flex flex-row justify-center cursor-pointer">
                        <div
                          className={cn(
                            "w-full bg-muted-dark flex flex-row gap-2  py-2 h-10 rounded-lg items-center",
                            queries.chatId === file.uuid && "bg-primary-light",
                            !sidePanelIsOpen
                              ? " w-10 flex justify-center"
                              : " px-3 ",
                          )}
                        >
                          <div className="flex items-center justify-center h-6 w-6 bg-white rounded-md">
                            <p className="px-1 text-primary font-[600] text-sm">
                              PDF
                            </p>
                          </div>
                          {sidePanelIsOpen && (
                            <p className="max-w-[calc(100%-70px)] truncate dont-[400]">
                              {file.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                    {sidePanelIsOpen && (
                      <div className="absolute end-0 h-full flex item-center pe-3  z-[10] top-0">
                        <div className="flex  flex-row gap-2 py-1 ml-auto items-center">
                          <DeletePdfPopOver setFile={setFile} file={file} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        {fetchAllPdfsIsLoading && <SkeletonListPdf />}

        <div>
          {(!restructuredPdfFiles ||
            (restructuredPdfFiles.length === 0 &&
              !fetchAllPdfsIsLoading &&
              sidePanelIsOpen)) && <PdfIsEmpty></PdfIsEmpty>}
        </div>
      </div>
    </>
  );
};

export default PDFViewerSideBar;
