import CommentBox from "./children/CommentBox";
import TitleChildren from "./children/TitleChildren";

export default function SectionThreeParent() {
  return (
    <div className=" p-8 h-auto relative xl:bottom-56  bg-gradient-to-t  from-transparent via-warning-lighter to-transparent">
      <div className="w-full h-auto rounded p-6 bg-holder flex flex-col  gap-6 ">
        <TitleChildren />
        <CommentBox />
      </div>
    </div>
  );
}
