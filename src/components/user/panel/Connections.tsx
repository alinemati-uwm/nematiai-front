import Lottie from "react-lottie";

import { useGetDictionary } from "@/hooks";

import comingSoon from "./comingSoonAnimation.json";

/**
 * Connections panel in user panel dialog
 * @constructor
 */
export default function Connections() {
  const { common } = useGetDictionary();
  const ComingSoon = {
    loop: true,
    autoplay: true,
    animationData: comingSoon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center  h-full w-full">
      <div className="">
        <Lottie options={ComingSoon} width={204} height={204} />
      </div>
    </div>
  );
}
