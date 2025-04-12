import React, { forwardRef, type FC, type RefObject } from "react";

import CopyButton from "@/components/shared/CopyButton";
import Loading from "@/components/shared/Loading";
import RenderIf from "@/components/shared/RenderIf";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import styles from "./styles.module.css";

interface TextFiledProps extends React.ComponentPropsWithoutRef<"textarea"> {
  onChangeText: (val: string) => void;
  value: string;
  className?: string;
  maxLength?: number;
  isLoading?: boolean;
}

/**
 * TextBox component is a forwardRef component that renders a styled textarea with additional features.
 * It includes a copy button and a loading indicator, and it manages the state of the textarea.
 *
 * @param props - The properties object.
 * @param {function} props.onChangeText - The function to handle changes in the textarea.
 * @param {string} props.value - The value of the textarea.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {number} [props.maxLength=4000] - The maximum length of the textarea value.
 * @param {boolean} [props.isLoading] - The loading state to show a loading indicator when true.
 * @param {object} [props.otherProps] - Additional properties to pass to the textarea element.
 * @param {RefObject<HTMLTextAreaElement>} ref - The ref object for the textarea element.
 *
 * @returns JSX.Element The rendered TextBox component.
 */
const TextBox = forwardRef<HTMLTextAreaElement, TextFiledProps>(
  (
    {
      onChangeText,
      value,
      className,
      maxLength = 4000,
      isLoading,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <div className="col w-full gap-1">
        <div
          className={cn(
            styles.borderGradiant,
            "bg-muted-light col w-full h-[260px] p-4 pb-7 rounded overflow-hidden z-10 relative",
            className,
          )}
        >
          <textarea
            dir={value ? "auto" : "ltr"}
            ref={ref}
            className={cn(
              "size-full resize-none bg-transparent placeholder:text-label-light outline-none border-none ",
            )}
            value={value}
            maxLength={4000}
            onChange={e => onChangeText(e.target.value)}
            {...otherProps}
          />
          <div className="absolute row bottom-0 inset-x-0 px-2 pb-1">
            <RenderIf isTrue={!!value}>
              <CopyButton text={value} />
            </RenderIf>
            <RenderIf isTrue={!!isLoading}>
              <Loading rootClass="ms-auto" />
            </RenderIf>
          </div>
        </div>
        <span className="text-xs text-label-light w-full text-start">
          {value?.length || 0}/{maxLength}
        </span>
      </div>
    );
  },
);

interface IProps {
  inputValue: string;
  inputOnChange: (val: string) => void;
  outputValue: string;
  onChangeText: (val: string) => void;
  outputRef: RefObject<HTMLTextAreaElement | null>;
  isLoading: boolean;
}

/**
 * Fields component is responsible for rendering two text boxes side by side.
 * It uses the TextBox component for input and output fields and manages their state for humanize page.
 *
 * @param props - The properties object.
 * @param {string} props.inputValue - The value of the input text box.
 * @param {function} props.inputOnChange - The function to handle changes in the input text box.
 * @param {string} props.outputValue - The value of the output text box.
 * @param {function} props.onChangeText - The function to handle changes in the output text box.
 * @param {RefObject<HTMLTextAreaElement | null>} props.outputRef - The ref object for the output text box.
 * @param {boolean} props.isLoading - The loading state to disable text boxes when true.
 *
 * @returns JSX.Element The rendered Fields component.
 */
const Fields: FC<IProps> = ({
  inputOnChange,
  inputValue,
  onChangeText,
  outputValue,
  outputRef,
  isLoading,
}) => {
  const {
    page: { humanize: dictionary },
  } = useGetDictionary();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextBox
        value={inputValue}
        onChangeText={inputOnChange}
        placeholder={dictionary.textarea_placeholder}
        className={styles.leftField}
        disabled={isLoading}
      />
      <TextBox
        value={outputValue}
        onChangeText={onChangeText}
        className={styles.rightField}
        ref={outputRef}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Fields;
