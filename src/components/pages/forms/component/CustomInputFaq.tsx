import { type FieldError, type RefCallBack } from "react-hook-form";

export default function CustomInputFaq({
  type = "text",
  label,
  placeholder = "",
  onBlur,
  onChange,
  disabled,
  ref,
  value,
  classname,
  error,
}: {
  type: string;
  label: string;
  error?: FieldError;
  placeholder: string;
  onBlur: () => void;
  onChange: () => void;
  disabled?: boolean;
  ref: RefCallBack;
  value: string;
  classname?: string;
}) {
  return (
    <div
      className={
        classname ? classname : "md:w-1/2 text-landing-muted flex flex-col "
      }
    >
      <label htmlFor="" className="text-large text-landing-muted">
        {label ? label : ""}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full py-2 faqInput  px-4 bg-transparent border    rounded-sm outline-none mt-2 ${error ? "mb-0 border-danger placeholder-landing-mutedDark" : "mb-6 md:mb-3 placeholder-landing-mutedDark border-landing-mutedDark"}   text-landing-muted`}
        value={value}
        onChange={onChange}
      />
      <p className="text-danger text-small">{error?.message}</p>
    </div>
  );
}
