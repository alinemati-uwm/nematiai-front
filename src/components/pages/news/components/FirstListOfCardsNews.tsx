import Card from "./FirsCardNews";

interface Prop {
  news?: {
    id: string;
    description: string;
    summarize_text: string;
    images: string;
    published_date: string;
    publisher: string;
    source_url: string;
    title: string;
    topic: {
      title: string;
      slug: string;
    };
    url: string;
    type: string;
    related: [
      {
        articleTitle: string;
        url: string;
        source: string;
        time: string;
        snippet: string;
      },
    ];
    location: number;
    keywords: string;
    views_count: number;
    is_read: boolean;
  }[];
}
export default function FirstListOfCardsNews({ news }: Prop) {
  return (
    <div className="w-full h-auto  flex flex-wrap gap-4 px-2 lg:px-0">
      {news?.map((item, index) => (
        <Card
          key={item.id}
          id={item.id}
          image={item.images}
          count={index + 1}
          topic={item.topic}
          title={item.title}
        />
      ))}
    </div>
  );
}
