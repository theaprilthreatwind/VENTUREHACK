"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { startPractice } from "@/shared/api";
import { resolveText } from "@/shared/i18n";
import { useCurrentUser } from "@/entities/user";
import { saveSession } from "@/entities/session";
import { loadSessionQuestions } from "./questionMapper";

/**
 * Создаёт попытку на backend (`POST /api/practice-page/start`), догружает
 * вопросы по их id (`GET /api/questions/{id}`) и переходит к прохождению.
 *
 * Backend возвращает только `{ attemptId, questionIds }`, поэтому полные
 * вопросы собираются на клиенте и сохраняются в сессию — после этого экран
 * прохождения работает даже при обрыве сети. Без авторизованного
 * пользователя отправляет на /auth. Ошибки запроса не всплывают наружу —
 * показываются через `error`, чтобы пользователь видел понятное сообщение.
 */
export function useStartPracticeSession() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(/** @type {AbortController | null} */ (null));

  // Отменяем незавершённый запрос при размонтировании.
  useEffect(() => () => abortRef.current?.abort(), []);

  const start = async ({ topicIds, questionsCount, difficulties, answerStatus, isRepetition }) => {
    if (!user?.id) {
      router.push("/auth");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPending(true);
    setError("");
    try {
      const { attemptId, questionIds } = await startPractice(
        {
          userId: user.id,
          topicIds,
          questionsCount,
          difficulties,
          answerStatus,
          isRepetition,
        },
        { signal: controller.signal }
      );

      const questions = await loadSessionQuestions(questionIds, {
        signal: controller.signal,
      });

      if (questions.length === 0) {
        throw new Error(resolveText("errors.startSession"));
      }

      saveSession({ attemptId, questions });
      router.push("/practice/question");
    } catch (cause) {
      if (controller.signal.aborted) return;
      setError(cause?.message ?? resolveText("errors.startSession"));
    } finally {
      if (!controller.signal.aborted) setPending(false);
    }
  };

  return { start, isPending, error };
}
