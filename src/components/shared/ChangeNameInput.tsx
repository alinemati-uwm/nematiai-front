"use client";

import React, { useEffect, useState, type ChangeEvent, type FC } from "react";

import { cn } from "@udecode/cn";
import { useOnClickOutside } from "usehooks-ts";

import Loading from "@/components/shared/Loading";
import { MinimalButton } from "@/components/shared/MinimalButtton";
import RenderIf from "@/components/shared/RenderIf";
import { Show } from "@/components/shared/Show";
import { Input } from "@/components/ui/input";

interface IProps extends React.ComponentPropsWithoutRef<"input"> {
  rootClassName?: string;
  isSubmittingEdit?: boolean;
  showEdit: boolean;
  onSave: (newName: string) => Promise<void>;
  value: string;
}

/**
 * ChangeDocName component allows editing and saving a document name.
 *
 * @param props - The component props.
 * @param {string} props.value - The current value of the document name.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.rootClassName] - Optional additional class name for the root element.
 * @param {string} [props.className] - Optional additional class name for the input element.
 * @param {boolean} [props.isSubmittingEdit] - Indicates if the edit is being submitted.
 * @param {boolean} props.showEdit - Indicates if the edit option should be shown.
 * @param {function} props.onSave - The function to call when saving the new document name.
 * @param {object} [props.otherProps] - Additional props to pass to the input element.
 *
 * @returns JSX.Element The rendered ChangeDocName component.
 */
const ChangeNameInput: FC<IProps> = ({
  value,
  onChange,
  rootClassName,
  className,
  isSubmittingEdit,
  showEdit,
  onSave,
  ...otherProps
}) => {
  // State to manage the editing state and the editing value
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(value);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  //set the editing value to the current value when the value changes
  useEffect(() => {
    setEditingValue(value);
  }, [value]);

  /**
   * Handles the click event to toggle editing state and save the new value.
   */
  const handleClick = async () => {
    // If editing, save the new value
    if (isEditing) {
      await onSave(editingValue.toString());
      setIsEditing(false);
    } else {
      // If not editing, enable editing
      setIsEditing(true);
      inputRef.current?.focus();
    }
  };

  /**
   * Handles the change event for the input element.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // If editing, update the editing value
    //else, call the onChange function for input value changes
    if (showEdit && isEditing) {
      setEditingValue(e.target.value);
    } else {
      onChange?.(e);
    }
  };

  // Hook to handle clicks outside the input field to disable editing
  //@ts-ignore
  useOnClickOutside(rootRef, () => {
    setEditingValue(value);
    setIsEditing(false);
  });

  return (
    <div className={cn("fit relative", rootClassName)} ref={rootRef}>
      <Input
        ref={inputRef}
        className={cn(
          "w-48 pe-8 ps-2 text-xs",
          !isEditing && "!select-none cursor-default",
          className,
        )}
        value={isEditing ? editingValue : value}
        onChange={handleChange}
        {...otherProps}
        readOnly={showEdit && !isEditing}
        onFocus={e => {
          if (!isEditing) {
            e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
          }
        }}
      />
      <RenderIf
        isTrue={
          showEdit && ((isEditing && value !== editingValue) || !isEditing)
        }
      >
        <div className="absolute end-2 top-1/2 -translate-y-1/2">
          <Show>
            <Show.When isTrue={!!isSubmittingEdit}>
              <Loading svgClass="" />
            </Show.When>
            <Show.Else>
              <MinimalButton
                icon={isEditing ? "material-symbols:check-rounded" : "bx:edit"}
                disabled={isSubmittingEdit}
                onClick={handleClick}
                size="xs"
              />
            </Show.Else>
          </Show>
        </div>
      </RenderIf>
    </div>
  );
};
export default ChangeNameInput;
