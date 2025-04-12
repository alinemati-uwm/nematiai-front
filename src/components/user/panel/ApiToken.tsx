import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const ApiToken = () => {
  return (
    <div className="w-full h-full overflow-x-hidden ">
      <div className=" mx-6 my-3 flex flex-col gap-5 overflow-x-hidden ">
        <div className="text-small font-[400] leading-tight">
          Tokens you have generated that can be used to access the{" "}
          <Link href="" className="text-primary">
            nerdstudio.ai
          </Link>{" "}
          Open API. Personal API access tokens can perform authorized
          permissions on accessible data under the current account.
        </div>
        <div className="w-full  lg:w-[505px] lg:h-[250px] bg-holder-dark rounded-lg ">
          <div className="mx-5 my-4 flex flex-col gap-3">
            <p className="text-label-light text-large font-[600] leading-tight">
              New Api Access token
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-small leading-tight font-[400] text-label-light">
                Name
              </p>
              <Input
                placeholder="whats is this token for?"
                className="  py-4 "
              />
            </div>

            <div className="flex flex-col lg:flex-row  gap-3 ">
              <div className="flex flex-col gap-1">
                <p className="text-small leading-tight font-[400] text-label-light ">
                  Expiration
                </p>
                <Input
                  placeholder="2024-05-26"
                  className="  py-4  w-full max-w-full lg:w-[179px] lg:max-w-[179px]"
                />
              </div>
              <div className="mt-auto mb-2 flex gap-1">
                <Checkbox />
                <p className="text-small font-[400] leading-tight">
                  No Experience
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center  lg:justify-end mt-auto ml-auto">
              <Button className="h-8 w-full lg:w-[210px] text-base font-[400]">
                Save and generate token{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full sm:justify-between border-b pb-3  text-small md:text-base flex-wrap gap-3">
          <div className="flex gap-3 sm:gap-10">
            <p className="font-[400] leading-tight text-label-light"> Name</p>
            <p className="font-[400] leading-tight text-label-light">
              {" "}
              Expiration
            </p>
            <p className="font-[400] leading-tight text-label-light">
              {" "}
              Created
            </p>
          </div>
          <div className="flex gap-3 sm:gap-10">
            <p className="font-[400] leading-tight text-label-light">
              {" "}
              Last used
            </p>
            <p className="font-[400] leading-tight text-label-light"> Action</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApiToken;
