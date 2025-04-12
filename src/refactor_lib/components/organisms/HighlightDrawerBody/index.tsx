import { useEffect, useMemo, useState } from "react";

import { produce } from "immer";

import {
  HIGHLIGHT_OPTIONS,
  HIGHLIGHT_PLATFORMS,
} from "@/refactor_lib/constants/highlight";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import HighlightDrawerHeader from "../../molecules/HighlightDrawerHeader";
import HighlightItem from "../../molecules/HighlightItem";

interface HighlightDrawerBodyProps {
  onCloseDrawer: () => void;
}

const HighlightDrawerBody: React.FC<HighlightDrawerBodyProps> = props => {
  const { onCloseDrawer } = props;

  const [shouldGenerate, setShouldGenerate] = useState(false);

  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [highlightErrors, setHighlightErrors] = useState<string[]>([]);

  const { toaster } = useToaster();

  useEffect(() => {
    if (highlightErrors.length >= 5) {
      toaster({
        toastProps: {
          type: "error",
          message: "Error happened while generating highlights!",
        },
      });
      setHighlightErrors([]);
    }
  }, [highlightErrors.length]);

  const addHighlightError = (highlightType: string) => {
    setHighlightErrors(prev => [...new Set([...prev, highlightType])]);
  };

  const removeHighlightError = (highlightType: string) => {
    setHighlightErrors(
      produce(draft => {
        const index = draft.indexOf(highlightType);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      }),
    );
  };

  const onClickGenerateSelectedHighlight = () => {
    setHighlightErrors([]);
    setShouldGenerate(true);
  };

  const resetShouldGenerate = () => {
    setShouldGenerate(false);
  };

  // if highlighType exists remove it else add it
  const handleSelectHighLightForGeneration = (highlightType: string) => {
    if (selectedHighlights.includes(highlightType)) {
      const indexOfSelectedHighlight =
        selectedHighlights.indexOf(highlightType);

      // remove selected highlight
      if (indexOfSelectedHighlight !== -1) {
        setSelectedHighlights(
          produce(draft => {
            draft.splice(indexOfSelectedHighlight, 1);
          }),
        );
      }
    } else {
      setSelectedHighlights(prev => [...prev, highlightType]);
    }
  };

  // is all highlights selected for generation
  const isAllSelected = useMemo(() => {
    const allHighlightsCount =
      HIGHLIGHT_OPTIONS.length + HIGHLIGHT_PLATFORMS.length;

    return allHighlightsCount === selectedHighlights.length;
  }, [selectedHighlights.length]);

  // is some highlights selected for generation
  const isSomeSelected = useMemo(() => {
    return Boolean(!isAllSelected && selectedHighlights.length);
  }, [isAllSelected, selectedHighlights.length]);

  // is any highlight selected
  const isAnySelected = useMemo(() => {
    return selectedHighlights.length >= 1;
  }, [selectedHighlights.length]);

  // is none highlight selected
  const isNoneSelected = useMemo(() => {
    return selectedHighlights.length === 0;
  }, [selectedHighlights.length]);

  return (
    <div className="grid grid-cols-1 divide-y">
      <HighlightDrawerHeader
        onCloseDrawer={() => {
          onCloseDrawer();
        }}
        isSomeSelected={isSomeSelected}
        onClickGenerate={onClickGenerateSelectedHighlight}
      />
      <div className="grid gap-2 p-3">
        <div className="grid gap-2">
          {HIGHLIGHT_OPTIONS.map(({ title, type }) => (
            <HighlightItem
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              highlightType={type}
              isChecked={selectedHighlights.includes(type)}
              isPlatformTypeHighlight={false}
              onCheck={handleSelectHighLightForGeneration}
              optionTitle={title}
              key={type}
              isAnySelected={isAnySelected}
              shouldGenerate={shouldGenerate}
              resetShouldGenerate={resetShouldGenerate}
              isNoneSelected={isNoneSelected}
              addHighlightError={addHighlightError}
              removeHighlightError={removeHighlightError}
            />
          ))}
          <span className="mt-2 text-base text-label-light">Social Media</span>
          {HIGHLIGHT_PLATFORMS.map(({ Icon, title, type }) => (
            <HighlightItem
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              highlightType={type}
              isChecked={selectedHighlights.includes(type)}
              isPlatformTypeHighlight
              onCheck={handleSelectHighLightForGeneration}
              optionTitle={title}
              key={type}
              isAnySelected={isAnySelected}
              icon={Icon}
              shouldGenerate={shouldGenerate}
              resetShouldGenerate={resetShouldGenerate}
              isNoneSelected={isNoneSelected}
              addHighlightError={addHighlightError}
              removeHighlightError={removeHighlightError}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightDrawerBody;
