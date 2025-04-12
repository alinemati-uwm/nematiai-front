"use client";

import React, { useEffect, useState } from "react";

import UpgradeHeader from "@/components/layout/header/apps-header/Upgrade";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user";
import { useGetDictionary } from "@/hooks";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

import StatusPlanBadge from "./StatusPlanBadge";

/**
 * upgrade panel in user panel dialog
 * show current plan and upgrade options
 * @param setActiveMenu - set active menu in user panel
 * @constructor
 */
function Upgrade({ setActiveMenu }: { setActiveMenu?: (str: string) => void }) {
  const {
    components: {
      user: { panel: dictionary },
    },
  } = useGetDictionary();

  //get user info
  const { data: userData, isLoading: isLoadingActivePlane } = useGetMe();
  const [planIsActive, setPlanIsActive] = useState<boolean>(true);
  useEffect(() => {
    setPlanIsActive(userData?.subscription.status === "active");
  }, [userData]);

  let plan_credit = 0;
  if (!isLoadingActivePlane && userData?.subscription) {
    plan_credit =
      userData?.subscription?.daily_bonus + userData?.subscription.credit;
  }

  const formatToMonthDay = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="pt-4  flex  h-full w-full flex-col gap-5 overflow-hidden px-5 ">
      <div className="w-full flex justify-between items-center bg-primary-lighter p-3 rounded">
        <div className="flex gap-2">
          <AppIcon
            icon="mingcute:ai-fill"
            width={20}
            height={20}
            className=" text-gradient-gradientStart "
          />

          <p className="text-primary">{dictionary.upgrade_your_account}.</p>
        </div>
        <div>
          <UpgradeHeader />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full sm:flex-row sm:w-auto gap-2  flex-wrap">
        <div className="flex gap-2 items-center mb-4 md:mb-0 ">
          <UserAvatar
            className="h-12 w-12"
            imageSrc={userData?.profile_image || ""}
            name={userData ? userData.username : ""}
          />
          <div className="flex flex-col gap-y-1">
            <span className="text-base whitespace-nowrap">
              {userData && userData.email}
            </span>
            <div className="flex direction-normal">
              <StatusPlanBadge icon />
            </div>
          </div>
        </div>
        <div
          id="a"
          className="flex h-12 w-full text-label sm:w-auto items-center justify-between rounded border border-muted-dark px-3 text-small"
        >
          <span>{dictionary.personal_credit}</span>
          <span className="text-2xl text-primary pl-2">
            <strong>
              {!isLoadingActivePlane && userData?.subscription.total_credit}
            </strong>
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-custom border rounded px-4 py-4 text-small">
        {!isLoadingActivePlane && userData ? (
          <>
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between">
                <span>{dictionary.daily}</span>
                <span>
                  {userData?.subscription?.daily_bonus} {dictionary.available} /{" "}
                  {userData?.subscription.base_daily_bonus} {dictionary.total}
                </span>
              </div>
              <Progress
                value={
                  (100 * userData?.subscription?.daily_bonus) /
                  userData?.subscription.base_daily_bonus
                }
              />
            </div>

            <div
              className={`flex w-full flex-col gap-4 ${planIsActive ? "" : "opacity-30"}`}
            >
              <div className="flex w-full justify-between">
                <span>{dictionary.plan}</span>
                <span>
                  {userData?.subscription.credit} {dictionary.available} /{" "}
                  {userData?.subscription.base_credit} {dictionary.total}
                </span>
              </div>
              <Progress
                value={
                  (100 * userData?.subscription.credit) /
                  userData?.subscription.base_credit
                }
              />
            </div>
          </>
        ) : (
          <Skeleton className="h-[100px] w-full" />
        )}

        {userData ? (
          <div
            className={`flex ${planIsActive ? "text-[#c09730]" : " text-danger "} gap-x-1`}
          >
            <AppIcon icon="mingcute:warning-line" width={16} />
            <span>
              {planIsActive
                ? `Your subscription will end on ${formatToMonthDay(userData ? userData?.subscription.end_date.toString() : "")}`
                : "Your subscription period has ended. Renew your subscription to rejoin the world of endless possibilities"}
            </span>
          </div>
        ) : null}
      </div>
      <div className="col gap-3 rounded border p-4">
        <AppTypo variant="headingXXS">
          {dictionary.invite_user_header_description}
        </AppTypo>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-1">
          <p>
            {dictionary.invited_friends}:{" "}
            {userData?.subscription?.referral_bonus &&
            userData?.subscription?.referral_bonus > 20
              ? Math.min(Math.round(userData.subscription.referral_bonus / 20))
              : 0}
          </p>
          <p>
            {dictionary.referral_credit}:{" "}
            {userData?.subscription.referral_bonus}
          </p>
          <Button
            onClick={() => setActiveMenu && setActiveMenu("referral")}
            variant="outline"
            className="row gap-1"
          >
            <AppIcon
              icon="ic:baseline-person-add-alt"
              className="text-label"
              width={14}
            />
            {dictionary.invite_now}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
