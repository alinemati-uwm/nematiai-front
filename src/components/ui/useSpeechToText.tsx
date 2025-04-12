"use client";

// Import necessary modules and components
import { useEffect, useRef, useState, type JSX } from "react";

import { MinimalButton } from "@/components/shared";
import { useGetDictionary } from "@/hooks";

interface IProps {
  transcript: string;
  setTranscript: (v: string) => void;
  isChatbot?: boolean;
}

export type SpeechToText = {
  content: JSX.Element;
  startRecording: () => void;
  stopRecording: () => void;
  handleToggleRecording: () => void;
  isRecording: boolean;
  recordingComplete: boolean;
  isSpeechRecognitionSupported: boolean;
};

// Export the MicrophoneComponent function component
export function useSpeechToText({
  transcript = "",
  setTranscript,
  isChatbot,
}: IProps): SpeechToText {
  // State variables to manage recording status, completion,
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    useState(false);

  const { common } = useGetDictionary();

  // Function to check for SpeechRecognition support and update state
  useEffect(() => {
    const isSupported =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setIsSpeechRecognitionSupported(isSupported);
  }, []);
  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US"; // Adjust the language as needed

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      // Get the most recent result from the event
      const lastResult = event.results[event.results.length - 1];

      // Check if the result is final to avoid interim results
      if (lastResult.isFinal) {
        const newTranscript = lastResult[0].transcript.trim();

        // Update the state with the new transcript
        setTranscript(newTranscript);
      }
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return {
    content: isSpeechRecognitionSupported ? (
      <span className={isRecording ? "animate-blink-opacity" : "default"}>
        <MinimalButton
          selected={isRecording}
          icon={isRecording ? "ic:round-stop" : "lucide:mic"}
          title={isRecording ? common.stop : common.speech_to_text}
          color={isRecording ? "danger" : "default"}
          onMouseDown={e => {
            handleToggleRecording();
          }}
          size={isChatbot ? "default" : "xs"}
        />
      </span>
    ) : (
      <></>
    ),
    isSpeechRecognitionSupported,
    startRecording,
    stopRecording,
    handleToggleRecording,
    isRecording,
    recordingComplete,
  };
}
