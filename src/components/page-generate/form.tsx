import { type FC } from "react";

import Loading from "@/components/shared/Loading";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import type { ChildrenProps } from "@/services/types";

interface IProps {
  onSubmit: () => void;
  buttonTitle: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const PageGenerateForm: FC<ChildrenProps<IProps>> = ({
  onSubmit,
  children,
  buttonTitle,
  disabled,
  isLoading,
}) => {
  return (
    <form
      className="w-full col gap-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
      <div className="w-48 mx-auto">
        <Button size="xl" type="submit" disabled={disabled}>
          <RenderIf isTrue={!!isLoading}>
            <Loading rootClass="me-2" svgClass="stroke-white" />
          </RenderIf>
          {buttonTitle}
        </Button>
      </div>
    </form>
  );
};

export default PageGenerateForm;
