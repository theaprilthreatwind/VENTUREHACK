"use client";

import { useRouter } from "next/navigation";
import { startPractice } from "@/shared/api";
import { useCurrentUser } from "@/entities/user";
import { saveAttempt } from "@/entities/session";

/**
 * Создаёт попытку на backend (`POST /api/practice_page/start`) и переходит
 * к прохождению. Без авторизованного пользователя отправляет на /auth.
 */
export function useStartPracticeSession() {
  const router = useRouter();
  const { user } = useCurrentUser();

  return async ({ topicIds, questionsCount, difficulties, answerStatus, isRepetition }) => {
    if (!user?.id) {
      router.push("/auth");
      return;
    }

    const attemptId = await startPractice({
      userId: user.id,
      topicIds,
      questionsCount,
      difficulties,
      answerStatus,
      isRepetition,
    });

    saveAttempt(attemptId);
    router.push("/pactice/question");
  };
}
