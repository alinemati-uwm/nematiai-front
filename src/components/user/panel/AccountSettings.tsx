"use client";

import { useRef, useState, type ChangeEvent } from "react";

// import ChangeUsernameDialog from "./ChangeUsernameDialog";
// import ChangeEmailDialog from "./ChangeEmailDialog";
import { DeleteAlertDialog, SettingItem } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
// import { useSession } from "next-auth/react";
import { UserAvatar } from "@/components/user";
import ChangeNameNoModal from "@/components/user/panel/ChangeNameNoModal";
import { useGetDictionary } from "@/hooks";
import useChangeUserProfilePicture from "@/refactor_lib/hooks/mutations/useChangeUserProfilePicture";
import useDeactivateUserAccount from "@/refactor_lib/hooks/mutations/useDeactivateUserAccount";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import extractErrorMessage from "@/refactor_lib/utils/extractErrorMessage";
import { logout } from "@/refactor_lib/utils/logout";

import MainChangePassword from "./MainChangePassword";

/**
 * AccountSettings component show the account settings on user panel
 * @constructor
 * @return {JSX.Element} - JSX.Element
 */
function AccountSettings() {
  const {
    components: {
      user: {
        panel: {
          first_name,
          last_name,
          change_firstname_title,
          change_lastname_title,
          account_danger_title,
          delete_account_description,
          user_info,
          account_privacy,
          current_password_label,
          enter_current_password_placeholder,
          new_password_placeholder,
          confirm_new_passowrd_label,
          confirm_new_passowrd_placeholder,
          new_password_label,
          change_password,
        },
      },
    },
    common: commonLang,
  } = useGetDictionary();
  // for handle when click on upload button open file dialog
  const uploadInputRef = useRef<HTMLInputElement>(null);

  //store uploaded image
  const [, setSelectedFile] = useState<File | null>(null);
  //get user info
  // const { data: userData } = useGetUserInfo();
  const { data: userData } = useGetMe();

  const { mutateAsync: changeUserProfilePicture } =
    useChangeUserProfilePicture();

  //use deActive service
  const { mutateAsync: deactivateUserAccount } = useDeactivateUserAccount();

  const { toaster, closeToastAfterTimeout } = useToaster();

  //handle upload image
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      toaster({
        toastProps: { type: "promise", message: "Changing profile picture..." },
        disableAutoClose: true,
      });
      setSelectedFile(file);
      changeUserProfilePicture({ file })
        .then(() => {
          toaster({
            toastProps: {
              type: "success",
              message: "Profile picture changed successfully!",
            },
          });
        })
        .catch(err => {
          const errMessage = extractErrorMessage(
            err,
            "Error while changing profile picture",
          );
          toaster({ toastProps: { type: "error", message: errMessage } });
        })
        .finally(() => {
          closeToastAfterTimeout({ useDefaultCloseDuration: true });
        });
    }
  };

  return (
    <div className="col h-full w-full px-4 lg:px-0 lg:overflow-hidden  overflow-scroll">
      <div className="mt-3 mb-2 flex h-full w-full lg:px-6  flex-col gap-3  ">
        <div className="flex  w-full flex-col ">
          {/*profile and usename*/}
          <div className="flex w-full  flex-col gap-6 lg:h-[80px] pb-4  lg:flex-row lg:justify-between lg:items-center ">
            <div className="flex justify-center  h-full  items-center ">
              <SettingItem
                className="relative lg:h-auto w-full lg:w-[141px] border-0 lg:mx-0 "
                title="none"
              >
                <div className="w-full flex flex-col  lg:flex-row lg:justify-start lg:items-start justify-center items-center">
                  <UserAvatar
                    className=" relative h-[71px]  overflow-visible w-[71px] "
                    imageSrc={userData?.profile_image}
                    name={userData?.username}
                  >
                    <div
                      className=" absolute bg-muted -bottom-1 -right-1 flex justify-center items-center px-2 cursor-pointer h-7 w-7 rounded"
                      onClick={() => uploadInputRef.current?.click()}
                    >
                      <AppIcon
                        icon="iconamoon:edit-light"
                        className="text-label"
                        width={16}
                        height={16}
                      />
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={uploadInputRef}
                      onChange={handleFileChange}
                    />
                  </UserAvatar>

                  <div className="px-5 mt-5 flex flex-col justify-center lg:justify-start lg:items-start items-center gap-1 ">
                    <AppTypo variant="headingXXS" className="text-label">
                      @{userData?.username}
                    </AppTypo>
                    <AppTypo variant="small" className="text-label-light">
                      {userData?.email}
                    </AppTypo>
                  </div>
                </div>
              </SettingItem>
            </div>
            {/* <div>
							<LanguageSettings />
						</div> */}
          </div>
          <div>
            <AppTypo variant="headingXXS" className="text-label-light">
              {user_info}
            </AppTypo>
            <hr className="lg:mt-1" />
          </div>
        </div>
        <div className="flex flex-col gap-3  ">
          <div className="w-full flex-col lg:flex gap-4  lg:flex-row">
            <div className="flex w-full flex-col text-label gap-label-space lg:w-1/2">
              <AppTypo variant="small" className="ml-1 text-small">
                {first_name} :
              </AppTypo>
              <div>
                {/*<SettingItem*/}
                {/*  className="border-0 h-full w-full  "*/}
                {/*  title={"none"}*/}
                {/*  Action={<ChangeNameSetting changeField='first_name' />}*/}
                {/*>*/}
                {/*  <p className="text-small  text-label-light">{userData?.first_name ? userData?.first_name : userPanelDictionary.change_firstname_title}</p>*/}
                {/*</SettingItem>*/}
                <ChangeNameNoModal
                  name={
                    userData?.first_name
                      ? userData?.first_name
                      : change_firstname_title
                  }
                  changeField="first_name"
                />
              </div>
            </div>
            <div className="flex w-full flex-col  mt-4 lg:mt-0 lg:w-1/2 gap-label-space ">
              <AppTypo variant="small" className="ml-1 text-small ">
                {last_name} :
              </AppTypo>
              <div>
                {/*<SettingItem*/}
                {/*  className="border-0 h-full w-full  "*/}
                {/*  title={"none"}*/}
                {/*  Action={<ChangeNameSetting changeField='last_name' />}*/}
                {/*>*/}
                {/*  <p className="text-small  text-label-light">{userData?.last_name ? userData?.last_name : userPanelDictionary.change_lastname_title}</p>*/}
                {/*</SettingItem>*/}
                <ChangeNameNoModal
                  name={
                    userData?.last_name
                      ? userData?.last_name
                      : change_lastname_title
                  }
                  changeField="last_name"
                />
              </div>
            </div>
          </div>

          <div>
            <AppTypo variant="headingXXS" className="text-label-light">
              {account_privacy}
            </AppTypo>
            <hr className="lg:mt-1" />
          </div>
          <MainChangePassword
            label={{
              current_password_label,
              confirm_new_passowrd_label,
              new_password_label,
            }}
            placeholder={{
              enter_current_password_placeholder,
              new_password_placeholder,
              confirm_new_passowrd_placeholder,
            }}
            changePassword={change_password}
          />
        </div>

        {/*danger settings*/}
        <div className=" w-full flex-col  text-label-light pb-4 lg:pb-1">
          <h4 className="flex items-center gap-1 text-small font-bold">
            <AppTypo variant="headingXXS" className="text-label-light py-1">
              {account_danger_title}
            </AppTypo>
          </h4>
          <hr className="my-1" />
          <div>
            {/*delete account*/}
            <SettingItem
              className="flex w-full flex-col gap-2 lg:flex-row lg:gap-0"
              discription={commonLang.delete_label}
              title="none"
              Action={
                <DeleteAlertDialog
                  title="Delete Account"
                  description="Are you sure you want to delete your account?"
                  handleSubmit={() => {
                    toaster({
                      toastProps: {
                        type: "promise",
                        message: "Deleting your account...",
                      },
                      disableAutoClose: true,
                    });
                    // @ts-expect-error mutation without variables
                    deactivateUserAccount()
                      .then(() => {
                        toaster({
                          toastProps: {
                            type: "success",
                            message: "Deleted your account successfully.",
                          },
                        });
                        logout();
                      })
                      .catch(err => {
                        const errMessage = extractErrorMessage(
                          err,
                          "Error while deleting your account!",
                        );
                        toaster({
                          toastProps: {
                            type: "error",
                            message: errMessage,
                          },
                        });
                      })
                      .finally(() => {
                        closeToastAfterTimeout({
                          useDefaultCloseDuration: true,
                        });
                      });
                  }}
                />
              }
            >
              <p className="text-small  text-label-light pe-1">
                {delete_account_description}
              </p>
            </SettingItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
