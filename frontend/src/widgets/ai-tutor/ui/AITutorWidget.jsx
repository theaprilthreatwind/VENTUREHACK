"use client";

import { useEffect, useState } from "react";
import { useLocalStorage, setLocalStorageItem } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";
import { generateDailyPlan } from "@/features/ai-tutor";
import {
  getDailyPlanKey,
  getTodayDate,
  parseJsonList,
  removeTopicFromList,
  topicKey,
  upsertTopicInList,
} from "../model/planStorage";
import { AgentBanner } from "./AgentBanner";
import { DailyPlanCard } from "./DailyPlanCard";
import { TaskModal } from "./TaskModal";

/**
 * AI-Агент Подготовки к ЕНТ:
 *  - дневной план генерируется Gemini и кэшируется в localStorage
 *    под ключом `entuz_ai_daily_plan_YYYY-MM-DD`;
 *  - история выполненных тем и тем с ошибками учитывается при генерации;
 *  - по клику «Сделать задание» открывается мини-тест с разбором ошибок.
 */
export function AITutorWidget() {
  const [today] = useState(getTodayDate);
  const planKey = getDailyPlanKey(today);

  const cachedPlanRaw = useLocalStorage(planKey, "");
  const completedRaw = useLocalStorage(STORAGE_KEYS.aiCompletedTopics, "[]");
  const failedRaw = useLocalStorage(STORAGE_KEYS.aiFailedTopics, "[]");
  const targetScore = useLocalStorage(STORAGE_KEYS.targetScore, "");
  const examDate = useLocalStorage(STORAGE_KEYS.examDate, "");

  const cachedPlan = parseJsonList(cachedPlanRaw);
  const hasCachedPlan = cachedPlan.length > 0;

  const [plan, setPlan] = useState(null);
  const [fetchState, setFetchState] = useState("loading");
  const [planError, setPlanError] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  const displayPlan = plan ?? cachedPlan;
  const loading = displayPlan.length === 0 && fetchState === "loading";
  const error =
    displayPlan.length === 0 && fetchState === "error" ? planError : null;

  useEffect(() => {
    if (hasCachedPlan) return undefined;

    let isActive = true;
    generateDailyPlan({
      completedTopics: parseJsonList(completedRaw).map(topicKey),
      failedTopics: parseJsonList(failedRaw).map(topicKey),
      targetScore,
      examDate,
    })
      .then((topics) => {
        if (!isActive) return;
        setPlan(topics);
        setFetchState("done");
        setLocalStorageItem(planKey, JSON.stringify(topics));
      })
      .catch((err) => {
        if (!isActive) return;
        setPlanError(err);
        setFetchState("error");
      });

    return () => {
      isActive = false;
    };
  }, [hasCachedPlan, completedRaw, failedRaw, targetScore, examDate, planKey]);

  const reloadPlan = () => {
    setPlan(null);
    setPlanError(null);
    setFetchState("loading");
    setLocalStorageItem(planKey, "");
  };

  const completedKeys = new Set(parseJsonList(completedRaw).map(topicKey));

  const handleTaskFinished = (topic, score, total) => {
    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
    const result = {
      subject: topic.subject,
      topic: topic.topic,
      accuracy,
    };

    const completedTopics = parseJsonList(completedRaw);
    const alreadyDone = completedTopics.some((item) => topicKey(item) === topicKey(result));
    setLocalStorageItem(
      STORAGE_KEYS.aiCompletedTopics,
      JSON.stringify(alreadyDone ? completedTopics : [...completedTopics, result])
    );

    const failedTopics = parseJsonList(failedRaw);
    const nextFailed =
      accuracy >= 60
        ? removeTopicFromList(failedTopics, result)
        : upsertTopicInList(failedTopics, result);
    setLocalStorageItem(STORAGE_KEYS.aiFailedTopics, JSON.stringify(nextFailed));

    setActiveTopic(null);
  };

  return (
    <>
      <div className="space-y-6">
        <AgentBanner />
        <DailyPlanCard
          plan={displayPlan}
          loading={loading}
          error={error}
          completedKeys={completedKeys}
          onStartTopic={setActiveTopic}
          onReload={reloadPlan}
        />
      </div>

      {activeTopic && (
        <TaskModal
          key={topicKey(activeTopic)}
          topic={activeTopic}
          onClose={() => setActiveTopic(null)}
          onFinish={(score, total) => handleTaskFinished(activeTopic, score, total)}
        />
      )}
    </>
  );
}