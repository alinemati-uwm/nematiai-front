import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";

import { data } from "../featuresPageData";

const LangSection = ({
  params,
  try_compony_name,
}: {
  params: string;
  try_compony_name: string;
}) => {
  return (
    <div className=" w-full h-auto flex flex-col mt-10 text-white gap-3">
      {data[params]?.map(item => (
        <>
          <div className="mb-4" key={item.title}>
            {!item.lang && (
              <div className="border px-3 flex font-bold justify-between items-center py-2 rounded text-2xl lg:text-3xl">
                <h2>{item.title}</h2>
                <AppIcon icon="mdi:chevron-down" />
              </div>
            )}
            <p className="text-landing-muted lg:w-[70%]  px-3 mt-5  text-base md:text-large">
              {item.desc}
            </p>
            {item.lang && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-auto  px-3   mt-20 text-white ">
                {item.lang.map(lang => (
                  <Link
                    key={lang}
                    href={`/${params}`}
                    className="mt-5 border-t-4  rounded-full lg:hover:bg-glass-dark duration-200 border-landing-primaryDark py-5 flex flex-col justify-center items-center gap-8 pr-5 w-full  mr-10"
                  >
                    <h2 className="text-2xl  w-[80%] text-center h-12  leading-8 z-30">
                      {lang}
                    </h2>
                    <p className="text-landing-muted w-full  text-large mt-4 text-center">
                      {try_compony_name + lang}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};
export default LangSection;
