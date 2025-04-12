"use client";

const SimpleTextArea = ({
  maxLength,
  placeholder,
  errors,
  onChange,
  value,
  labale,
}: {
  placeholder: string;
  onChange: () => void;
  value: string;
  errors: any;
  maxLength: number;
  labale: string;
}) => {
  return (
    <>
      <div className=" text-white w-full flex flex-col  ">
        <h1 className=" text-large font-[400]  ">{labale}</h1>
        <textarea
          className="mb-0 w-full resize-none text-base rounded-lg border bg-glass-dark py-16 pl-3 placeholder:text-landing-muted pr-16 pt-2 outline-none ring-0 first-line:pl-4 border-none "
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <p className="text-danger text-small ">{errors?.message}</p>
        <span className="mt-0.5 ps-1 text-label-light">
          {value ? value.length : 0}/{maxLength}
        </span>
      </div>
    </>
  );
};

export default SimpleTextArea;
