"use client";

import { useEffect, useRef, useState } from "react";

export function useTextToSpeech(text: string, volume: number = 1) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>();
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const startTimeRef = useRef(0);
  const passedTimeRef = useRef(0);
  const utterance = new SpeechSynthesisUtterance(text);
  const language = "pt-BR";
  const availableVoices = voices?.filter(({ lang }) => lang === language);
  const activeVoice = voices?.find(
    ({ name }) => name.includes("Google") || availableVoices?.[0],
  );

  useEffect(() => {
    const speechSynth = window.speechSynthesis.getVoices();
    if (Array.isArray(speechSynth) && speechSynth.length > 0) {
      setVoices(speechSynth);
      return;
    }
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        const speechSynth = window.speechSynthesis.getVoices();
        setVoices(speechSynth);
      };
    }
  }, [text]);

  useEffect(() => {
    const letters = text.replace(/\s+/g, "").length;
    const averageLettersPerMinute = 860; // Average speaking rate in letters per minute
    const estimatedTotalTime = (letters / averageLettersPerMinute) * 60;
    setTotalTime(estimatedTotalTime);
  }, [text]);

  const handlePlaySpeak = () => {
    setIsSpeaking(true);
    setIsPaused(false);
    setCurrentTime(0);
    startTimeRef.current = Date.now();
    utterance.onboundary = event => {
      if (event.name === "word") {
        setCurrentTime(
          (Date.now() - startTimeRef.current) / 1000 + passedTimeRef.current,
        );
      }
    };
    utterance.volume = volume; // Set initial volume
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(true);
      setCurrentTime(0);
      passedTimeRef.current = 0;
    };
    speechSynthesis.speak(utterance);
  };

  const handleStopSpeak = () => {
    setIsSpeaking(false);
    setIsPaused(true);
    setCurrentTime(0);
    speechSynthesis.cancel();
    passedTimeRef.current = 0;
  };

  const handlePauseSpeak = () => {
    setIsPaused(true);
    speechSynthesis.pause();
  };

  const handleResumeSpeak = () => {
    setIsPaused(false);
    speechSynthesis.resume();
    passedTimeRef.current = currentTime;
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    return () => {
      handleStopSpeak();
    };
  }, []);

  return {
    isSpeaking,
    handlePlaySpeak,
    handleStopSpeak,
    isPaused,
    handlePauseSpeak,
    handleResumeSpeak,
    totalTime,
    currentTime,
  };
}
