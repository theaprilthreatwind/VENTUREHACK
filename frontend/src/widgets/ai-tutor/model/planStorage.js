"use client";

import { STORAGE_KEYS } from "@/shared/config";

/**
 * Работа с localStorage для AI-Тьютора:
 *  - дневной план кэшируется под ключом `entuz_ai_daily_plan_YYYY-MM-DD`;
 *  - выполненные темы и темы с ошибками хранятся отдельно и учитываются
 *    при генерации следующего плана.
 */

export const TOPIC_SEPARATOR = "::";

/** Текущая локальная дата в виде YYYY-MM-DD. */
export function getTodayDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function getDailyPlanKey(date = getTodayDate()) {
  return `${STORAGE_KEYS.aiDailyPlanPrefix}${date}`;
}

export function topicKey(topic) {
  return `${topic?.subject ?? ""}${TOPIC_SEPARATOR}${topic?.topic ?? ""}`;
}

export function parseJsonList(raw) {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function parseJsonObject(raw) {
  if (!raw) return {};
  try {
    const value = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

export function upsertTopicInList(list, topic) {
  const key = topicKey(topic);
  const next = list.filter(
    (item) => topicKey(item) !== key
  );
  next.push({
    subject: topic?.subject ?? "",
    topic: topic?.topic ?? "",
    accuracy: topic?.accuracy ?? 0,
  });
  return next;
}

export function removeTopicFromList(list, topic) {
  const key = topicKey(topic);
  return list.filter((item) => topicKey(item) !== key);
}