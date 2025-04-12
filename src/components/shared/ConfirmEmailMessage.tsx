"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

interface IProps {
  handleBack: () => void;
  email: string;
  resendEmail: () => void;
  rootClassName?: string;
  isForgotPas?: boolean;
}

/**
 * Component to display a confirmation message for email actions.
 *
 * @param {Object} props - The properties for the component.
 * @param {function} props.handleBack - Function to handle the back button click.
 * @param {string} props.email - The email address to display.
 * @param {function} props.resendEmail - Function to handle resending the email.
 * @param {string} [props.rootClassName] - Additional class names for the root element.
 * @param {boolean} [props.isForgotPas=false] - Flag to indicate if the message is for a forgotten password.
 */
function ConfirmEmailMessage({
  handleBack,
  email,
  resendEmail,
  rootClassName,
  isForgotPas = false,
}: IProps) {
  const {
    components: { confirm_email: dictionary },
  } = useGetDictionary();

  return (
    <div
      className={cn(
        "centered-col z-50 flex h-screen lg:h-full w-full gap-8 p-3",
        rootClassName,
      )}
    >
      <div className="col relative h-fit w-full">
        <h1 className="text-center text-xl font-bold">{dictionary.title}</h1>
        <p className="text-center text-label-light">
          {dictionary.description_part1}{" "}
          <span className="text-primary">{email}</span>{" "}
          {dictionary.description_part2}{" "}
          {isForgotPas
            ? dictionary.forgot_complete_message
            : dictionary.signup_complete_message}
        </p>

        <div className="centered-row mt-5 gap-2 border-t p-2">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="font-normal text-label-light">
            {dictionary.link_message}
          </p>
          <Button
            variant="link"
            className="fit p-0"
            onClick={() => resendEmail()}
          >
            {dictionary.send_button_label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailMessage;
