"use client";

import { useRef, useState } from "react";

import Lottie from "react-lottie";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

import {
  useGetStripeData,
  useGetStripeReceiptData,
} from "../../../services/static-pages/getStripeData";
import Close from "./gifs/Close.json";
import Successful from "./gifs/Successful.json";
import warning from "./gifs/Warning.json";
import useRouteHandler from "./useRouteHandler";

export default function Success({ uuid }: { uuid: string }) {
  const {
    common: {
      retry,
      time,
      total,
      price,
      plan,
      go_back_to_app,
      continue_to_payment,
    },
  } = useGetDictionary();
  const Success = {
    loop: true,
    autoplay: true,
    animationData: Successful,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const Faild = {
    loop: true,
    autoplay: true,
    animationData: Close,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const Warning = {
    loop: true,
    autoplay: true,
    animationData: warning,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const countRef = useRef(0);
  const [done, isDone] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const stripeData = useGetStripeData(uuid);
  const receipt = useGetStripeReceiptData(uuid);
  const { routeHandler } = useRouteHandler({
    stripeData,
    countRef,
    setIsPending,
    isDone,
  });

  return (
    <>
      <div className=" w-full h-screen  p-0 flex justify-center items-center bg-holder-lighter">
        {stripeData.isLoading ? (
          <div className=" w-full h-full flex justify-center items-center"></div>
        ) : (
          <>
            <div
              className={`lg:w-[902px] h-[65%] w-[90%] lg:h-[512px] ${stripeData.isError ? `${done ? "bg-warining-lighter" : "bg-danger-lighter"} ` : "bg-[#ECFDF3]"} ${stripeData.isLoading ? "bg-white" : ""} ${stripeData.isLoading ? (done ? "translate-y-0" : "translate-y-[1000px]") : "translate-y-0"}  duration-300 SuccessBox flex flex-col rounded items-center`}
            >
              <div className="w-full h-5/6 flex flex-col items-center lg:px-16 py-8 ">
                <div className=" w-full h-1/2  flex flex-col items-center ">
                  {stripeData.isError ? (
                    done ? (
                      <Lottie options={Warning} width={130} height={110} />
                    ) : (
                      <Lottie options={Faild} width={130} height={110} />
                    )
                  ) : (
                    <Lottie options={Success} width={140} height={120} />
                  )}
                  <h3
                    className={`${stripeData.isError ? (done ? "text-warning" : "text-danger-darker") : "text-success"} lg:text-large text-base w-full text-center font-bold`}
                  >
                    {stripeData.isError
                      ? done
                        ? "Try Failed"
                        : stripeData.error?.message
                      : " Your payment has been successful"}
                  </h3>
                </div>
                <div className="w-[70%]  flex flex-col gap-4 text-[#747474]">
                  <div className=" w-full flex justify-between">
                    <p>{stripeData.isError ? "Status:" : "Date:"}</p>
                    <p className="font-bold">
                      {stripeData.isError
                        ? done
                          ? "Failed "
                          : (stripeData?.error as any)?.response?.status
                        : receipt?.data.date.slice(0, 10)}
                    </p>
                  </div>
                  <div className=" w-full flex justify-between">
                    <p>{time}:</p>
                    <p className="font-bold">
                      {stripeData.isError
                        ? "-"
                        : receipt?.data.date.slice(11, 19)}
                    </p>
                  </div>
                  <div className=" w-full flex justify-between">
                    <p>{plan}:</p>
                    <p className="font-bold">
                      {stripeData.isError ? "-" : receipt?.data.plan.title}
                    </p>
                  </div>
                  <div className=" w-full flex justify-between">
                    <p>{price}:</p>
                    <p className="font-bold">
                      {stripeData.isError ? "-" : "$" + receipt?.data.price}
                    </p>
                  </div>

                  <div className=" w-full flex justify-between">
                    <p>{total}:</p>
                    <p
                      className={
                        stripeData.isError
                          ? "font-bold"
                          : "font-bold text-success"
                      }
                    >
                      {stripeData.isError ? "-" : "$" + receipt?.data.price}
                    </p>
                  </div>
                </div>
              </div>

              {stripeData.isError ? (
                <Button
                  disabled={isPending}
                  isPending={isPending}
                  variant="default"
                  className={`lg:w-[58%] h-10 w-[85%] cursor-pointer duration-300 flex justify-center  ${stripeData.isError ? `${done ? "bg-warning hover:bg-[#f0b400]" : "bg-danger hover:bg-danger-dark"} ` : "bg-success hover:bg-sucess-dark"} text-base text-white rounded-lg`}
                  onClick={routeHandler}
                >
                  {done
                    ? go_back_to_app!
                    : (stripeData?.error as any)?.response?.status !== 404
                      ? retry
                      : continue_to_payment}
                </Button>
              ) : (
                <Button
                  onClick={routeHandler}
                  disabled={isPending}
                  variant="default"
                  isPending={isPending}
                  className={`lg:w-[58%] w-[85%]  h-10 cursor-pointer duration-300 flex justify-center  ${stripeData.isError ? `${done ? "bg-warning hover:bg-[#f0b400]" : "bg-danger-dark "} ` : "bg-success hover:bg-sucess-dark"}  text-base text-white rounded-lg`}
                >
                  {continue_to_payment}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
