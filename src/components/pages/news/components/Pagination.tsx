"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

import AppIcon from "@/components/shared/AppIcon";

import { newsKeys } from "../../explore/query-keys";

export default function Pagination({
  paginate,
  searchParam,
  category,
}: {
  paginate?: number;
  category: number;
  searchParam: number | null;
}) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const handelChangePage = (data: { selected: number }) => {
    const pageNumber = data.selected + 1;
    queryClient.invalidateQueries({
      queryKey: newsKeys.getNews(category, +searchParam!),
    });
    const newUrl = `/explore?page=${pageNumber}&categoryId=${category}`;
    router.push(newUrl);
  };

  if (!paginate || paginate <= 1) return null;
  return (
    <>
      <ReactPaginate
        pageCount={paginate!}
        forcePage={+searchParam! - 1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        previousLabel={
          paginate! > 1 ? (
            <AppIcon
              icon="material-symbols:keyboard-arrow-left"
              style={{ width: "28px", height: "28px" }}
            />
          ) : null
        }
        nextLabel={
          paginate! > 1 ? (
            <AppIcon
              icon="material-symbols:keyboard-arrow-right"
              style={{ width: "28px", height: "28px" }}
            />
          ) : null
        }
        breakLabel="..."
        containerClassName="flex gap-4 justify-center items-center"
        pageClassName="bg-primary-lighter rounded-sm w-10 flex justify-center "
        nextClassName=""
        previousClassName=""
        pageLinkClassName="w-full py-1 flex justify-center items-center"
        nextLinkClassName=""
        previousLinkClassName=""
        breakClassName=""
        breakLinkClassName=""
        activeLinkClassName="bg-primary-light text-label-lighter rounded-sm"
        onPageChange={handelChangePage}
      />
    </>
  );
}
