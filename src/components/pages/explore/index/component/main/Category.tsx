import { useRouter } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppSwiper from "@/components/shared/AppSwiper";
import AppTypo from "@/components/ui/AppTypo";

import { type ExploreNewsData } from "../../newsTypes";

function ExploreCategory({
  categoryList,
  category,
}: {
  categoryList?: ExploreNewsData["getNewsCategories"];
  category: number;
}) {
	const router = useRouter();
	const handleRoute = (id: number) => {
		const newUrl = `/explore/?categoryId=${id}`;
		router.push(newUrl);
	};
	return (
		<div className="w-[370px]  sm:w-full ">
			<AppSwiper
				SwiperSlideProps={{ style: { width: "auto" } }}
				config={{
					spaceBetween: 15,
					slidesPerView: "auto",
				}}
			>
				<div className="flex gap-3">
					<div
						onClick={() => {
							handleRoute(998);
						}}
						className={`flex flex-row   cursor-pointer items-center gap-x-1 py-1 px-3 rounded hover:bg-primary-lighter ${category === 998 ? "bg-primary-lighter" : ""}`}
					>
						{/* <AppIcon icon={el.image} width={16} height={16} /> */}
						<AppTypo>Following</AppTypo>
					</div>
					<div
						onClick={() => {
							handleRoute(999);
						}}
						className={`flex flex-row   cursor-pointer items-center gap-x-1 py-1 px-3 rounded hover:bg-primary-lighter ${category === 999 ? "bg-primary-lighter" : ""}`}
					>
						{/* <AppIcon icon={el.image} width={16} height={16} /> */}
						<AppTypo>Favorites</AppTypo>
					</div>
				</div>
				{categoryList?.map(el => (
					<div
						key={el.id}
						onClick={() => {
							handleRoute(el.id);
						}}
						className={`flex flex-row   cursor-pointer items-center gap-x-1 py-1 px-3 rounded hover:bg-primary-lighter ${category === el.id ? "bg-primary-lighter" : ""}`}
					>
						<AppIcon icon={el.image} width={16} height={16} />
						<AppTypo>{el.name}</AppTypo>
					</div>
				))}
			</AppSwiper>
		</div>
	);
}

export default ExploreCategory;
