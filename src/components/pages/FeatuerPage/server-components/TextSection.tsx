import { type StaticImport } from "next/dist/shared/lib/get-img-props";

export interface FeaturesData {
  name?: string;
  image?: string | StaticImport;
  title?: string;
  title2?: string;
  higlight?: string;
  higlight2?: string;
  image2?: string | StaticImport;
  text?: string;
  text2?: string;
}
export default function TextSection({ item }: { item: FeaturesData }) {
  return (
    <>
      <div className="w-full text-2xl mt-12 md:text-5xl flex flex-col text-shadow-custom-purple">
        <h1 className="font-[600] flex text-shadow-landing text-[#FFFFFF]">
          {item.title}
        </h1>
        {/* <h1 className="font-[600] md:hidden text-shadow-landing text-[#FFFFFF]">
					{item.title2}
				</h1> */}
        <h2 className="font-[600] flex  text-shadow-landing  text-landing-primary">
          {" "}
          {item.higlight}
        </h2>
        {/* <h2 className="font-[600]  text-shadow-landing md:hidden text-primary">
					{" "}
					{item.higlight2}
				</h2> */}
        <p className=" flex  text-left text-base mb-10 md:text-large text-[#BDBDBD]  lg:pr-44 xl:w-auto  lg:text-justify mt-6 ">
          {item.text}
        </p>
        {/* <p className="text-base text-[#BDBDBD] md:text-large md:hidden">
					{item.text2}
				</p> */}
      </div>
    </>
  );
}
