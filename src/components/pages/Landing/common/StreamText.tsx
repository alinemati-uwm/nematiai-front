import React, { useEffect, useState } from "react";

const StreamText = ({
  text,
  streamIsOver,
}: {
  text: string;
  streamIsOver?: (v: boolean) => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const streamText = async () => {
      setDisplayedText(""); // Reset the displayed text when the text prop changes
      setShowCursor(true); // Reset the cursor state

      for (const char of text) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setDisplayedText(prev => prev + char);
      }

      setShowCursor(false);

      // Notify that the stream is over after text display is complete
      if (streamIsOver) {
        streamIsOver(true);
      }
    };

    streamText();

    // Clean-up function
    return () => {
      setDisplayedText("");
      setShowCursor(false);
      if (streamIsOver) {
        streamIsOver(false);
      }
    };
  }, [text, streamIsOver]); // Add streamIsOver as a dependency to the useEffect

  return (
    <div className="w-full flex flex-col gap-5 text-large leading-8 xl:text-large font-[400]  whitespace-pre-wrap text-white">
      <div>
        {displayedText}
        {showCursor && (
          <span className="inline-block w-3 animate-blink">|</span>
        )}
      </div>
    </div>
  );
};

export default StreamText;
