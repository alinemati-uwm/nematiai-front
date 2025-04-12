import React, { useEffect, useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQueryClient } from "@tanstack/react-query";

import { useMutateFavoriteCategories } from "@/components/pages/explore/news-actions";
import { newsKeys } from "@/components/pages/explore/query-keys";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import { type ExploreNewsData } from "../../../newsTypes";

function ExploreSearchSetting({
  categoryList,
}: {
  categoryList?: ExploreNewsData["getNewsCategories"];
}) {
  const [open, setOpen] = useState(false);
  const {
    page: {
      explore: { select_your_favorite_explore },
    },
    common: { cancel, select },
  } = useGetDictionary();
  const [categoryId, setCategoryId] = useState<number[]>([]);
  const { isPending, mutate } = useMutateFavoriteCategories();

  const { toaster } = useToaster();
  const { showError } = useErrorToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (categoryList) {
      const favoriteList = categoryList.filter(
        item => item.is_favorited === true,
      );

      setCategoryId(favoriteList.map(item => item.id));
    }
  }, [open]);

  const handleSelect = (itemId: number) => {
    if (categoryId.includes(itemId)) {
      const newArray = categoryId.filter(item => item !== itemId);
      setCategoryId(newArray);
    } else {
      setCategoryId([...categoryId, itemId]);
    }
  };
  const handleSend = () => {
    mutate(
      { category_ids: categoryId },
      {
        onSuccess: data => {
          toaster({
            toastProps: {
              type: "success",
              message: data.data.message,
            },
          });
          queryClient.refetchQueries({
            queryKey: newsKeys.categories,
          });
          queryClient.refetchQueries({
            queryKey: newsKeys.userNews(),
          });
        },
        onError: data => {
          showError(data?.message);
        },
      },
    );
  };

  return (
    <>
      <AppIcon
        icon="majesticons:settings-cog-line"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        width={14}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col max-w-auto max-w-[95%] w-[330px] gap-y-12 p-6">
          <VisuallyHidden>
            <DialogTitle>Explore settings</DialogTitle>
          </VisuallyHidden>
          <AppTypo variant="headingS" className="m-auto">
            {select_your_favorite_explore}
          </AppTypo>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {categoryList?.map((el, key) => (
              <div
                onClick={() => handleSelect(el.id)}
                key={key}
                className={`py-2 px-3 cursor-pointer hover:bg-primary-lighter rounded bg-muted border ${categoryId.includes(el.id) ? "border-primary-light text-primary" : "border-transparent"}`}
              >
                {el.name}
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-between gap-x-2">
            <Button onClick={() => setOpen(false)} variant="outline">
              {cancel}
            </Button>
            <Button
              isPending={isPending}
              disabled={isPending}
              onClick={() => handleSend()}
              className="w-full"
            >
              {select}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExploreSearchSetting;
