"use client";

import { useState } from "react";

import Image from "next/image";
import { useForm } from "react-hook-form";

import { useGetDictionary } from "@/hooks";
import useSendDataJoinUs, {
  type InputData,
} from "@/services/static-pages/join-us";

import Footer from "../Landing/layout/Footer";
import Navbar from "../Landing/layout/Navbar";
import FormsBtn from "./component/FomsBtn";
import Inputs from "./component/Inputs";

const Forms = () => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InputData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      company: "",
      phone: "",
      education: "",
      resume: undefined,
      experience: "",
      telegram_id: "",
      university: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useSendDataJoinUs(setIsSubmitting, reset);
  const onSubmit = async (data: InputData) => {
    setIsSubmitting(true);
    await mutateAsync(data);
  };
  const {
    page: {
      forms: {
        Careers_Job,
        Upload_Your_Resume,
        Just_upload_file_format,
        Send_your_information,
      },
    },
  } = useGetDictionary();
  const [selectFile, isSelectFile] = useState("");
  return (
    <div className=" md:w-auto h-auto  lg:h-auto  bg-gradient-to-tr relative flex justify-center items-center  from-[#3C147580] from-25%   via-[#08020f80] via-55% to-[#3C147580] ">
      <div>
        <Navbar />
      </div>
      <div className=" w-screen h-auto  mt-[90px] lg:pt-[0] pb-4 lg:pb-0">
        <div className="lg:flex lg:justify-center lg:flex-row-reverse h-full">
          <div className="px-12 lg:w-1/2  md:flex md:items-center md:justify-center  ">
            <Image
              src="/images/form/image_21.webp"
              className=" md:max-w-[490px] lg:max-w-[700px]"
              width={500}
              height={200}
              alt="roadmap of fill out form "
              priority
            />
          </div>
          <div className="lg:w-2/3">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className=" px-4 mt-6 lg:px-20 md:mt-28  text-[#747474]  "
            >
              <h2 className="md:hidden text-2xl font-bold mb-6">
                {Careers_Job}
              </h2>

              {/* inputs section */}
              <Inputs control={control} errors={errors} />
              {/* inputs section */}

              <div className=" flex flex-col md:flex-row items-end pt-2  ">
                <div className=" md:w-[90%] text-right">
                  <h6 className="text-small text-white  mt-5  mb-1">
                    {Upload_Your_Resume}
                  </h6>
                  <p className="text-small text-[#B9BAC0]">
                    {selectFile ? selectFile : Just_upload_file_format}
                  </p>
                </div>
                <div className="">
                  <div
                    className={`${errors.resume ? " border-danger text-danger" : " border-landing-primary text-landing-primary"} border w-[172.1px] h-8 overflow-hidden relative rounded-md ml-3 flex justify-center items-center  hover:bg-landing-primary mt-4 hover:text-black duration-300`}
                  >
                    <input
                      className="py-2 px-5 cursor-pointer absolute bottom-0 right-0 z-10 opacity-0"
                      accept=".pdf , .zip , .docx"
                      type="file"
                      {...register("resume", {
                        required: "File is requierd",
                      })}
                      onChange={e => isSelectFile(e.target.value)}
                    />
                    <span className=" text-small cursor-pointer">
                      {Upload_Your_Resume.charAt(0).toUpperCase() +
                        Upload_Your_Resume.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-danger flex justify-end text-small  relative right-10 top-1">
                {errors.resume?.message}
              </p>
              <div className=" flex justify-end pb-3 ">
                <FormsBtn
                  error={errors.resume}
                  pending={isSubmitting}
                  submited={isSubmitSuccessful}
                  Send_your_information={Send_your_information}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Forms;
