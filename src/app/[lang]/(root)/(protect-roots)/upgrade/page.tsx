import dynamic from "next/dynamic";

const Upggrade = dynamic(() => import("@/components/pages/upgrade"));

export default function UpgradePage() {
  return <Upggrade />;
}
