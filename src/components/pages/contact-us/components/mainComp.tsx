import Image from "next/image";

import { FormSectionContactUs } from "./form-section";

const MainComp = ({
  contact,
  us,
  Any_question,
}: {
  contact: string;
  us: string;
  Any_question: string;
}) => {
  return (
    <div className="items mt-16 md:py-10  h-auto space-y-10  md:pb-10 ">
      <div className="w-full space-y-1 pt-3 text-center">
        <h1 className="text-3xl font-bold text-shadow-custom-purple lg:text-4xl  text-[#FFFFFF]">
          {contact} <span className="text-landing-primary"> {us} </span>
        </h1>
        <p className="text-center text-large font-normal text-landing-muted">
          {Any_question}
        </p>
      </div>
      <div className="w-full  lg:h-[530px] px-6 lg:px-0   items-center justify-between rounded-lg bg-glass-dark  pb-10 lg:relative  lg:mx-[20vw]  lg:flex lg:w-auto lg:pb-0  ">
        <div className="w-full h-full  p-4 lg:p-0  lg:my-4 lg:w-1/2   ">
          <FormSectionContactUs />
        </div>
        <div className=" mt-4 items-center bg-gradient rounded-lg lg:rounded-none lg:bg-none  mx-4   px-5 py-5 lg:py-0  lg:h-full lg:w-1/2 lg:px-0">
          <Image
            width={520}
            height={500}
            quality={100}
            className=" object-cover w-[550px] h-[510px] hidden lg:flex relative bottom-2 "
            src="/images/contact/our_location_wi.png "
            alt="Nerd Studio company location"
            priority
          />
          <Image
            width={200}
            height={200}
            quality={100}
            layout="responsive"
            className=" w-full object-cover lg:hidden  max-h-[382px]"
            src="/images/contact/our_location_mob.png"
            alt="Nerd Studio company location"
            priority
          />
        </div>
      </div>
    </div>
  );
};
export default MainComp;
