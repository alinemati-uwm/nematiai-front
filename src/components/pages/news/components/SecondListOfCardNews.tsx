import SecondCardNews from "./SecondCardNews";

interface Prop {
  data: {
    title: string;
    desc: string;
    src: string;
    date: string;
    refLink: string;
    link: string;
  }[];
}
export default function SecondListOfCardNews({ data }: Prop) {
  return (
    <div className=" w-full gap-4 h-[278px] rounded-lg flex">
      {data.map((item, index) => (
        <SecondCardNews
          key={"SecondListOfCardNews_" + index}
          title={item.title}
          desc={item.desc}
          src={item.src}
          date={item.date}
          refLink={item.refLink}
          link={item.link}
        />
      ))}
    </div>
  );
}
