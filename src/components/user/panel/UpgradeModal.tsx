import { useEffect, useState } from "react";
import * as React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useErrorToast from "@/hooks/useErrorToast";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";
import { useSubscribe } from "@/services/subscription";
import { type PlanItem } from "@/services/types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  plan: PlanItem;
  showYearly: boolean;
}

const UpgradeModal = ({ setOpen, open, plan, showYearly }: Props) => {
  const {
    common: {
      upgrade_plan,
      upgrade_to_annual,
      price,
      total,
      payment_options,
      due_today,
      cancel,
      continue_to_payment,
      description_of_how_to_pay,
      coming_soon,
    },
  } = useGetDictionary();
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();

  const router = useRouter();

  //selected method for payment
  const [selected, setSelected] = useState<"ether" | "paypal">("paypal");

  //use payment subscription
  const { mutate, isPending, isSuccess, isError, data, error } = useSubscribe();

  //show toast
  const { showError } = useErrorToast();

  useEffect(() => {
    if (isError) {
      showError(error?.response.data.detail);
    }
  }, [isError]);

  //handle redirect after successful request
  useEffect(() => {
    if (selected === "paypal" && isSuccess) {
      window.open(data?.url, "_blank");
    }
    if (selected === "ether" && isSuccess) {
      window.open(data?.url, "_blank");
    }
  }, [isSuccess]);

  //handle payment continue
  const handlePayment = () => {
    if (selected === "ether") {
      mutate({
        plan_id: plan.id,
        payment_type: "credit_card",
      });
    }
    if (selected === "paypal") {
      mutate({
        plan_id: plan.id,
        payment_type: "credit_card",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:w-[602px] w-[90%] h-auto max-h-[95%] flex flex-col bg-holder-lighter rounded-lg p-0 outline-none">
        <VisuallyHidden>
          <DialogTitle>Upgrade</DialogTitle>
        </VisuallyHidden>
        <div className="mx-4 my-4 flex flex-col gap-2">
          <p className="text-large font-[600]">{upgrade_plan}</p>
          <p className="text-base font-[400] text-label-light">
            {description_of_how_to_pay}
          </p>
          <div className="w-full h-[114px] bg-gradiant rounded-lg ">
            <div className="mx-3 my-3 flex flex-col gap-3">
              <p className="text-gradiant text-large font-[600]  text-primary">
                {upgrade_to_annual}
              </p>
              <div className="w-full justify-between flex">
                <p className="text-base font-[400]  capitalize text-label-light">
                  {price}
                </p>
                <p className="text-base font-[600] ">${plan.price} / mo</p>
              </div>
              <div className="w-full justify-between flex">
                <p className="text-base font-[400]  text-label-light ">
                  {total}
                </p>
                <p className="text-base font-[600] ">
                  ${showYearly ? Math.round(plan.price * 12) : plan.price}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full border-t border-b">
            <div className="my-4 flex flex-col gap-4">
              <p className="text-large font-[600]">{payment_options}</p>
              <div className="flex gap-6 ">
                <Image
                  src="/images/userPanel/paypal.svg"
                  onClick={() => setSelected("paypal")}
                  className={cn(
                    "border rounded-lg transition-all cursor-pointer",
                    selected === "paypal" && "border-4 border-primary ",
                  )}
                  width={94}
                  height={94}
                  alt="paypal"
                />
                <div className="relative">
                  <Image
                    src="/images/userPanel/etherium.png"
                    width={94}
                    height={94}
                    alt="etherium"
                    className={cn(
                      selected === "ether" &&
                        "border-4  rounded-lg border-primary",
                      "transition-all ",
                    )}
                  />
                  <div className="absolute flex justify-center text-small p-1 text-primary-lighter rounded-es-custom rounded-ee-custom bg-success bottom-0 left-0 w-full">
                    {coming_soon}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <p className="text-base text-label-light">{due_today}</p>
            <p className="text-base  font-[600] text-primary">
              ${plan.price} / mo
            </p>
          </div>
          <div className="flex w-full justify-end gap-4 mt-4">
            <Button
              onClick={() => setOpen(false)}
              className="w-[120px] h-10 rounded-lg bg-transparent border-2 hover:bg-muted-dark hover:text-white text-base leading-tight text-label-light"
            >
              {cancel}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                handlePayment();
              }}
              className="w-[120px] h-10 rounded-lg text-base text-white  justify-center"
            >
              {isPending && (
                <Loading
                  rootClass=""
                  svgClass="w-6 h-6 !stroke-primary-lighter"
                />
              )}
              {!isPending && <>{continue_to_payment}</>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
