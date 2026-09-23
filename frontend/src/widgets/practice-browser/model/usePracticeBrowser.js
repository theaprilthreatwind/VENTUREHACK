"use client";

import { useMemo, useState } from "react";
import { useSubjectsOverview } from "@/entities/subject";
import {
  countQuestions,
  countSelection,
  getTopicById,
  toggleInSet,
  toggleTopicsForSubject,
} from "./selection.mjs";

export function usePracticeBrowser() {
  const { subjects, isLoading, error } = useSubjectsOverview();

  const [selectedTopics, setSelectedTopics] = useState(() => new Set());
  const [closedSubjects, setClosedSubjects] = useState(() => new Set());
  const [difficulty, setDifficulty] = useState(null);
  const [status, setStatus] = useState(null);
  const [repeat, setRepeat] = useState(null);

  const topicById = useMemo(() => getTopicById(subjects), [subjects]);

  const stats = useMemo(() => countSelection(subjects, selectedTopics), [
    subjects,
    selectedTopics,
  ]);

  // Предметы по умолчанию развёрнуты; closedSubjects хранит свёрнутые.
  const isSubjectOpen = (id) => !closedSubjects.has(id);

  const toggleTopic = (id) => setSelectedTopics((prev) => toggleInSet(prev, id));

  const toggleSubject = (subject) =>
    setSelectedTopics((prev) => toggleTopicsForSubject(prev, subject));

  const toggleSubjectOpen = (id) =>
    setClosedSubjects((prev) => toggleInSet(prev, id));

  const resetFilters = () => {
    setSelectedTopics(new Set());
    setDifficulty(null);
    setStatus(null);
    setRepeat(null);
    setClosedSubjects(new Set());
  };

  return {
    subjects,
    isLoading,
    error,
    selectedTopics,
    isSubjectOpen,
    difficulty,
    status,
    repeat,
    stats,
    setDifficulty,
    setStatus,
    setRepeat,
    toggleTopic,
    toggleSubject,
    toggleSubjectOpen,
    resetFilters,
    countQuestions: (ids) => countQuestions(subjects, ids),
  };
}
