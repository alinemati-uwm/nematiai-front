import { useGetDictionary } from "@/hooks";

export default function ChatPdfContent() {
  const {
    page: { pdf: lang },
  } = useGetDictionary();
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className=" text-4xl font-bold">
        {lang.chat_with_any}
        <span className="ml-2 inline-block w-fit -rotate-[2deg] bg-[#9373EE] px-2 text-white">
          <p className="rotate-[2deg] text-4xl font-bold my-5">
            {" "}
            {lang.pdf_document}
          </p>
        </span>
      </div>
      <p className="mx-[15%] w-auto text-center text-xl text-[#747474]">
        {lang.description}
      </p>
    </div>
  );
}
