export const CustumInput = ({
  type = "text",
  placeholder = "",
  labale,
  errors,
  ...props
}: {
  type: string;
  placeholder: string;
  labale: string;
  errors: any;
}) => {
  return (
    <div className=" text-white w-full   flex flex-col  ">
      <p className=" text-base font-[400] mb-3 ">{labale}</p>
      <input
        className=" w-full rounded-lg text-base h-12 bg-glass-dark placeholder:text-landing-muted py-3 pl-3 pr-16 outline-none ring-0 focus:border-primary "
        {...props}
        type={type}
        placeholder={placeholder}
      />
      <p className="text-danger text-small ">{errors?.message}</p>
    </div>
  );
};
