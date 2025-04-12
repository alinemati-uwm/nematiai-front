import { type Landing } from "@/services/static-pages/landing";

import FaqSection from "./FaqSection";
import { FormSectionFaq } from "./Form-Section-Faq";

interface Prop {
  ask_your_question: string;

  frequently_asked_questions: string;

  data: Landing;
}
const MainComp = ({
  data,
  ask_your_question,

  frequently_asked_questions,
}: Prop) => {
  return (
    <div className="w-full h-full  pt-[110px]  ">
      <div className="mx-4 h-full lg:mx-16 gap-4  flex flex-col-reverse  lg:flex-row">
        <div className="w-full px-2 lg:px-8 lg:w-1/2 flex flex-col lg:bg-glass-dark rounded-lg pt-4 relative top-[-16px]">
          <p className="text-shadow-custom-purple text-2xl lg:text-3xl font-[700] leading-relaxed text-[#FFFFFF] text-center ">
            {ask_your_question}
          </p>
          <div className="w-full py-4  rounded-lg my-4">
            <FormSectionFaq />
          </div>
        </div>
        <div className="w-full lg:w-1/2  ">
          <p className="text-shadow-custom-purple text-2xl lg:text-3xl font-[700] leading-relaxed text-[#FFFFFF] text-center ">
            {frequently_asked_questions}
          </p>

          {data && data.faqs && <FaqSection faqs={data.faqs} />}
        </div>
      </div>
    </div>
  );
};
export default MainComp;
