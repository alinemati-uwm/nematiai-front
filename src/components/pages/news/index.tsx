import { type NewsTopic } from "@/refactor_lib/types/api/v1/NewsApiTypes";

import Footer from "../Landing/layout/Footer";
import Navbar from "../Landing/layout/Navbar";
import FirstListOfCardsNews from "./components/FirstListOfCardsNews";
import SliderPic from "./components/SliderPic";

// const RelatedNewsData = {
// 	first: [
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid Crash",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 	],
// 	second: [
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid Crash",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 	],
// };
// const SecondNewsData = {
// 	first: [
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 	],
// 	second: [
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 		{
// 			src: "/images/generateds/2.webp",
// 			title: "Hera Probes Asteroid ",
// 			desc: "ased on reports from the European Space Agency (ESA), the Hera spacecraft has been launched to investigate the aftermath of NASA's successful Double Asteroid Redirection Test (DART) mission, which intentionally crashed into the asteroid Dimorphos in 2022 to test planetary defense capabilities.",
// 			date: "August 18 , 2022",
// 			refLink: "News Reference",
// 			link: "https://nerdstudio.ai",
// 		},
// 	],
// };

const News = ({ data }: { data: NewsTopic["getAllNewsData"] }) => {
  const date = new Date();

  return (
    <div
      className={`w-full  ${data.news.length ? "h-auto" : "h-screen"} bg-gradient-to-r from-[#4c3488]  flex flex-col `}
    >
      <div>
        <Navbar />
      </div>
      {data.news.length ? (
        <>
          <div className="lg:w-[812px]  w-full h-full px-4 lg:px-0 gap-4 md:gap-0 mt-24 m-auto rounded relative flex flex-col ">
            <SliderPic news={data.news} />
            <div className="w-full text-white flex justify-between md:mb-4 px-2 md:px-0">
              <p>Technology News</p>
              <p>{date.toLocaleTimeString()}</p>
            </div>

            <FirstListOfCardsNews news={data.news} />

            {/* <div className="text-white mt-4">
					<p>Related News</p>
				</div> */}
            {/* <RealetedNews data={RelatedNewsData.first} />
				<SecondListOfCardNews data={SecondNewsData.first} />
				<RealetedNews data={RelatedNewsData.second} />
				<SecondListOfCardNews data={SecondNewsData.second} /> */}
          </div>
          <div className="text-white mt-10">
            {/* <Pagination paginate={data.max_pages} /> */}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-screen flex text-white justify-center items-center text-3xl">
            <p>There is no news</p>
          </div>
        </>
      )}
      <div className={data && "md:mt-24 mt-10"}>
        <Footer />
      </div>
    </div>
  );
};

export default News;
