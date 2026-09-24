"use client";

/**
 * Клиентский слой AI-Тьютора. Все запросы идут на наш же Route Handler
 * `/api/ai-tutor`, который уже проксирует их к Google Gemini API
 * (ключ хранится только на сервере, клиент его не видит).
 */

async function postAiTutor(payload, signal) {
  const response = await fetch("/api/ai-tutor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error ?? `AI-тьютор вернул статус ${response.status}.`);
  }

  return data;
}

/**
 * Режим 1: сгенерировать дневной план по истории ошибок.
 *
 * @param {{ completedTopics?: string[], failedTopics?: string[],
 *   targetScore?: string, examDate?: string }} params
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<Array<{ id, subject, topic, reason, priority }>>}
 */
export async function generateDailyPlan(params = {}, { signal } = {}) {
  const data = await postAiTutor(
    {
      action: "generate_daily_plan",
      completedTopics: params.completedTopics ?? [],
      failedTopics: params.failedTopics ?? [],
      targetScore: params.targetScore ?? null,
      examDate: params.examDate ?? null,
    },
    signal
  );
  return Array.isArray(data?.topics) ? data.topics : [];
}

/**
 * Режим 2а: получить вопросы мини-теста по теме.
 *
 * @param {{ subject: string, topic: string }} params
 * @returns {Promise<Array<{ id, text, options, correctIndex, explanation }>>}
 */
export async function generatePracticeQuestions({ subject, topic }, { signal } = {}) {
  const data = await postAiTutor(
    {
      action: "generate_practice_and_explain",
      subject,
      topic,
    },
    signal
  );
  return Array.isArray(data?.questions) ? data.questions : [];
}

/**
 * Режим 2б: разобрать ошибочные ответы мини-теста.
 *
 * @param {{
 *   subject: string, topic: string, score: number,
 *   questions: Array<{ id, text, options, correctIndex }>,
 *   wrongQuestions: Array<{ question, userAnswerIndex }>,
 * }} params
 * @returns {Promise<{ assessments: Array<{ questionId, correctIndex,
 *   explanation, stepByStep, tip }>, summary?: string }>}
 */
export async function explainPracticeAnswers(params, { signal } = {}) {
  return postAiTutor(
    {
      action: "generate_practice_and_explain",
      subject: params.subject,
      topic: params.topic,
      score: params.score,
      questions: params.questions,
      wrongQuestions: params.wrongQuestions,
    },
    signal
  );
}