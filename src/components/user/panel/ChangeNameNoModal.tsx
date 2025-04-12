import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useChangeUserInfo from "@/refactor_lib/hooks/mutations/useChangeUserInfo";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import extractErrorMessage from "@/refactor_lib/utils/extractErrorMessage";

interface Props {
  changeField: "first_name" | "last_name";
  name?: string;
}

const ChangeNameNoModal = ({ changeField, name }: Props) => {
  //determine if user is editing
  const [editing, setEditing] = useState(false);

  //name entered by the user
  const [enteredName, setEnteredName] = useState("");

  const {
    common: { save_label },
  } = useGetDictionary();

  //update info service
  const { mutateAsync: changeUserInfo, isPending } = useChangeUserInfo();

  const { toaster, closeToastAfterTimeout } = useToaster();

  //ref for focusing input field and click outside the input field
  const mainDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //detect click outside and close the editing filed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mainDivRef.current &&
        !mainDivRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
        setEnteredName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //focus the input filed after clicking the name field
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleSubmit = (fieldName: string, value: string) => {
    const fieldNameLabel = fieldName.replace("_", " ");
    const fieldNameLabelCapitalized =
      fieldNameLabel.charAt(0).toUpperCase() + fieldNameLabel.slice(1);

    toaster({
      toastProps: {
        type: "promise",
        message: `Changing ${fieldNameLabel}...`,
      },
      disableAutoClose: true,
    });

    changeUserInfo({ [fieldName]: value })
      .then(() => {
        toaster({
          toastProps: {
            type: "success",
            message: `${fieldNameLabelCapitalized} changed successfully.`,
          },
        });
        setEditing(false);
        setEnteredName("");
      })
      .catch(err => {
        const errMessage = extractErrorMessage(
          err,
          `Error while changing ${fieldNameLabel}!`,
        );

        toaster({
          toastProps: {
            type: "error",
            message: errMessage,
          },
        });
        setEditing(false);
      })
      .finally(() => {
        closeToastAfterTimeout({ useDefaultCloseDuration: true });
        setEditing(false);
      });
  };

  return (
    <div
      ref={mainDivRef}
      className="w-full relative !border-none !outline-none flex flex-row justify-between items-center"
    >
      <Input
        ref={inputRef}
        placeholder={editing ? "" : name ? name : ""}
        value={enteredName}
        onChange={e => setEnteredName(e.target.value)}
        className="pr-16"
        onClick={() => setEditing(true)}
      />
      {(editing || isPending) && (
        <Button
          size="sm"
          isPending={isPending}
          onClick={e => {
            e.stopPropagation();
            handleSubmit(changeField, enteredName);
          }}
          className="absolute right-[1.5px]  ml-10"
        >
          {save_label}
        </Button>
      )}
    </div>
  );
};

export default ChangeNameNoModal;
