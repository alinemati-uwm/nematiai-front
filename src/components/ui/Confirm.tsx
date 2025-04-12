"use client";

import { useEffect, useState } from "react";

import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";

/**
 * change password dialog used in user panel account settings panel
 * get current and new password and change user password
 * @constructor
 */

interface IProps {
  children?: React.ReactNode;
  onAccept?: () => void;
  title: string;
  btnTitle: string;
  message: string;
  reversColorBtn?: boolean;
  open?: boolean;
  loading?: boolean;
  className?: string;
  setOpen?: (val: boolean) => void;
}

function Confirm({
  children,
  onAccept,
  title,
  btnTitle,
  message,
  className = "",
  loading = false,
  open = false,
  setOpen = () => {},
  reversColorBtn = false,
}: IProps) {
  const {
    common: { close },
  } = useGetDictionary();

  const [isModalOpen, setIsModalOpen] = useState(open);

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className={"w-full " + className} asChild>
        <div onClick={() => setIsModalOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent className="col max-h-[100dvh] max-w-sm  bg-popover p-4">
        <DialogHeader className="mb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="p-0">{message}</p>
        <div className="flex g-2 justify-end ">
          <Button
            className={
              " w-[20%] " +
              (!reversColorBtn
                ? " bg-primary-lighter text-primary hover:text-primary "
                : " ")
            }
            onClick={() => {
              setIsModalOpen(false);
              setOpen(false);
            }}
          >
            {" "}
            {close}
          </Button>
          <Button
            onClick={onAccept}
            className={
              "ml-2 w-[20%]" +
              (reversColorBtn
                ? "  bg-primary-lighter text-primary hover:text-white pp"
                : " ")
            }
          >
            {" "}
            {loading ? (
              <Loading rootClass="-ms-1 me-1 " svgClass="w-4 h-4" />
            ) : (
              btnTitle
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Confirm;
