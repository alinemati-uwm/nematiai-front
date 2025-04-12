import { useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Input } from "@/components/ui/input";

interface IProps {
  label: string;
  placeholder: string;
  props: any;
  passData: string;
}

export default function ChangePasswordInput({
  label,
  placeholder,
  props,
}: IProps) {
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(true);
  return (
    <div className="flex w-full  flex-col gap-label-space">
      <AppTypo variant="small">{label} :</AppTypo>
      <div className="flex justify-between items-center">
        <div className="w-full lg:w-[340px] relative">
          <Input
            placeholder={editing ? "" : placeholder}
            {...props}
            type={show ? "password" : "text"}
            onFocus={() => setEditing(true)}
            onBlur={() => {
              setTimeout(() => {
                setEditing(false);
              }, 1);
            }}
          />
          <AppIcon
            onClick={e => setShow(!show)}
            className="absolute right-4 bottom-2 cursor-pointer"
            icon={show ? "tabler:eye-closed" : "tabler:eye"}
          />
        </div>
      </div>
    </div>
  );
}
