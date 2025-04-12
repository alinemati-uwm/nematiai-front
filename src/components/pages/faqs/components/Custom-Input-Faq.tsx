export const CustumInputFaq = ({
  type = "text",
  placeholder = "",
  labale,
  errors,
  ...props
}: {
  type: string;
  errors: any;
  placeholder: string;
  labale: string;
}) => {
  return (
    <div className=" text-white w-full   flex flex-col ">
      <h1 className=" text-large font-[400] mb-3 ">{labale}</h1>
      <input
        className=" w-full rounded-lg text-base h-12 bg-glass-dark lg:bg-[#1F0A5833] lg:placeholder-landing-muted py-3 pl-3 pr-16 outline-none ring-0 focus:border-primary "
        {...props}
        type={type}
        placeholder={placeholder}
      />
      <p className="text-danger text-small ">{errors?.message}</p>
    </div>
  );
};
