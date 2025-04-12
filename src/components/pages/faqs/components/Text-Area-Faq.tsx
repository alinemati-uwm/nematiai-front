"use client";

const TextAreaFaq = ({
  maxLength,
  placeholder,
  labale,
  errors,
  onChange,
  value,
}: {
  placeholder: string;
  errors: any;
  onChange: () => void;
  value: string;
  maxLength: number;
  labale: string;
}) => {
  return (
    <>
      <div className=" text-white w-full flex flex-col ">
        <h1 className=" text-large font-[400] mb-3">{labale}</h1>
        <textarea
          className="mb-0 w-full text-base rounded border bg-glass-dark lg:bg-[#1F0A5833] lg:placeholder-[#B9BAC0] p-4 pb-20 outline-none ring-0 first-line:pl-4 border-none "
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <p className="text-danger text-small ">{errors?.message}</p>
        <span className="mt-0.5 ps-1 text-label-light">
          {value ? value.length : 0}/{maxLength}
        </span>
      </div>
    </>
  );
};

export default TextAreaFaq;
