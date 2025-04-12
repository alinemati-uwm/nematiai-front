import React from "react";

import { useGetDictionary } from "@/hooks";

/**
 * Component `FirsatPage` renders a page with a title and description.
 * The content and styles of the page change based on the `callFromOtherPage` prop.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.callFromOtherPage - Determines the styling and layout of the page.
 *
 * @returns {JSX.Element} The rendered component.
 */
function FirsatPage({ callFromOtherPage }: { callFromOtherPage: boolean }) {
  const {
    page: { document: lang },
  } = useGetDictionary();

  return (
    <div className="flex p-12 md:p-0 h-full flex-col items-center justify-center gap-10">
      <div
        className={` text-2xl  ${callFromOtherPage ? " text-base " : " text-2xl md:text-4xl  "}   font-bold`}
      >
        <div className="flex justify-center">{lang.create}</div>
        <span className="ml-2 inline-block w-fit -rotate-[2deg] bg-[#9373EE] px-2 text-white">
          <p
            className={`rotate-[2deg] font-bold    ${callFromOtherPage ? "  my-2 " : " my-5 "} `}
          >
            {lang.your_document}
          </p>
        </span>
      </div>
      <p
        className={`md:mx-[15%] w-auto text-center   ${callFromOtherPage ? " text-larg " : " text-large md:text-xl "} text-[#747474]`}
      >
        {lang.description}
      </p>
    </div>
  );
}

export default FirsatPage;
