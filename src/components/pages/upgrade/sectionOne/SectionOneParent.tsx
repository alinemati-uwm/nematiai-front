import IconsSection from "./iconsSection/IconsSection";
import TitleAndDescription from "./titleAndDescription/TitleAndDescription";
import UpgradeBoxSection from "./upgradeBoxSection/UpgradeBoxSection";

export default function SectionOneParent() {
  return (
    <div className="  h-auto w-full bg-transparent bg-gradient-to-bl from-primary-lighter from-20% to-transparent to-50%  ">
      <div className="p-8  h-full w-full flex flex-col items-center gap-8">
        <TitleAndDescription />
        <IconsSection />
        <UpgradeBoxSection />
      </div>
    </div>
  );
}
