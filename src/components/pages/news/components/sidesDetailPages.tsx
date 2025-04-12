// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import EditableDiv from "@/components/ui/InputDiv";
// import { useGetDictionary } from "@/hooks";
// import ButtonsGroupe from "./buttonsGroupe";
import MainDetailPage from "./mainDetailPage";

interface Prop {
  news:
    | {
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
        likes_count: number;
        dislikes_count: number;
        is_read: false;
        is_liked: false;
      }
    | undefined;
}
export default function SidesDetailsPages({ news }: Prop) {
  // const [close, setClose] = useState(false);
  // const inputRef = useRef(null);

  return (
    <div className="flex flex-col h-auto items-center mb-5 px-4 lg:px-0 lg:flex-row lg:justify-center justify-start  mt-20 md:mb-6">
      {/* <div className="lg:h-full  hidden lg:flex lg:w-1/12  lg:flex-col lg:justify-center  items-center gap-4 ">
				<ButtonsGroupe
					isLiked={news?.is_liked}
					id={news?.id}
					setClose={setClose}
					close={close}
				/>
			</div> */}
      <MainDetailPage
        image={news?.images}
        id={news?.id}
        is_liked={news?.is_liked}
        published_date={news?.published_date}
        publisher={news?.publisher}
        source_url={news?.source_url}
        summarize_text={news?.summarize_text}
        title={news?.title}
        views_count={news?.views_count}
      />

      {/* <div
				className={`${!close && "w-[430px] "} w-0 hidden lg:flex lg:h-screen duration-500 z-[2000]`}
			>
				<div
					className={`h-[95%] z-40 flex flex-wrap flex-col  duration-500 fixed  top-0 w-full bg-[#140F21] rounded border-l p-4 border-primary `}
				>
					<div className=" flex flex-col gap-4 w-[25%] ">
						<div onClick={() => setClose(true)}>
							<AppIcon  icon="ic:twotone-close" className="h-full w-full z-10 absolute opacity-0 hover:opacity-100 duration-75" />
						</div>
						<p className="">
							By proceeding, a public profile will be created and you are
							agreeing to our Community Guidelines, Terms of Service and Privacy
							& Cookies.
						</p>
						<div className="w-full flex  items-center gap-2 ">
							<div className="w-8 h-7">
								<Image
									src={"/images/artist.png"}
									alt=""
									width={200}
									height={200}
									className="w-full h-full rounded-full"
								/>
							</div>
							<div className="w-[90%] flex justify-between relative items-center  ">
								<div
									contentEditable
									ref={inputRef}
									className="border p-2 w-full border-[#D9D9D9] rounded-sm pr-10 outline-none"
								></div>
								<div className=" absolute bg-[#D9D9D9] right-3 rounded-full cursor-pointer duration-300 lg:hover:bg-primary-dark">
									<Icons.arrowRight className="text-white w-6 h-6 p-1  " />
								</div>
							</div>
						</div>
						<div className="border-t border-[#D9D9D9] "></div>
						<div className="flex w-full h-[184px] gap-2 bg-glass-dark rounded p-2">
							<div className="h-full  w-[10%] items-end flex flex-col justify-between">
								<div className="w-8 h-8 mt-2">
									<Image
										src={"/images/artist.png"}
										alt=""
										width={200}
										height={200}
										className="w-full h-full rounded-full"
									/>
								</div>
							</div>
							<div className="h-auto w-[90%] ">
								<div className="flex justify-between w-full items-center  h-[20%] ">
									<div className="flex justify-center items-center gap-2">
										<p className="font-bold">Elun Musk</p>
										<p className="text-small text-[#B9BAC0]">13min</p>
									</div>
									<div>
										<div className="w-5 h-5 border flex justify-center items-center rounded-full">
											...
										</div>
									</div>
								</div>
								<div className="w-full h-auto  text-[#B9BAC0] ">
									<p>
										Office ipsum you must be muted. Data intersection
										first-order wheel asserts deck circle next to. Down scraps
										 
									</p>
								</div>
								<div className="w-full h-[15%] flex border ">

								</div>
								<div>see more</div>
							</div>
						</div>
					</div>
				</div> */}
      {/* </div> */}
    </div>
  );
}
