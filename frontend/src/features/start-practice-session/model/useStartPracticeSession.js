"use client";

import { useRouter } from "next/navigation";
import { savePracticeSession } from "@/entities/session";

export function useStartPracticeSession() {
  const router = useRouter();

  return (payload) => {
    savePracticeSession(payload);
    router.push("/test/active");
  };
}
