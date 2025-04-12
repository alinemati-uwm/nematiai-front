"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Features() {
  const router = useRouter();
  useEffect(() => {
    router.push("/features/chatbot");
  }, []);
  return;
}
