export default function TitleAndDescription({
  main_title,
  head_title,
}: {
  main_title: string;
  head_title: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-3   lg:gap-8 mt-10 lg:mt-0 ">
        <h1 className="w-full lg:text-8xl text-left  text-2xl text-white font-bold">
          {head_title}
        </h1>
        <p className="text-landing-muted text-left leading-6 lg:text-justify w-full h-full lg:mb-5 md:text-large text-base  md:leading-7">
          {main_title}
        </p>
      </div>
    </>
  );
}
