import RelatedNewsCard from "./RelatedNewsCard";

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
export default function RealetedNews({ data }: Prop) {
  return (
    <div className="flex flex-col  bg-glass-dark rounded-lg text-base overflow-hidden text-white">
      {data.map((item, index) => (
        <RelatedNewsCard
          key={"relatednews-" + index}
          title={item.title}
          desc={item.desc}
          src={item.src}
          date={item.date}
          link={item.link}
          refLink={item.refLink}
        />
      ))}
    </div>
  );
}
