import { MinimalButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";

interface HighlightDrawerHeaderProps {
  onCloseDrawer: () => void;
  isSomeSelected: boolean;
  onClickGenerate: () => void;
}

const getButtonText = (isSomeSelected: boolean) => {
  if (isSomeSelected) return "Generate selection";
  return "Generate all";
};

const HighlightDrawerHeader: React.FC<HighlightDrawerHeaderProps> = props => {
  const { onCloseDrawer, isSomeSelected, onClickGenerate } = props;

  return (
    <div className="flex justify-between p-3">
      <Button variant="ghost" onClick={onClickGenerate}>
        <AppIcon icon="tabler:wand" className="h-4 w-4" />
        {getButtonText(isSomeSelected)}
      </Button>

      <MinimalButton
        icon="ic:round-close"
        onClick={onCloseDrawer}
      ></MinimalButton>
    </div>
  );
};

export default HighlightDrawerHeader;
