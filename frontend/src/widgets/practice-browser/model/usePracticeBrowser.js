"use client";

import { useMemo, useState } from "react";
import { useSubjectsOverview } from "@/entities/subject";

function toggleInSet(prev, id) {
  const next = new Set(prev);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function usePracticeBrowser() {
  const { subjects, isLoading, error } = useSubjectsOverview();

  const [selectedTopics, setSelectedTopics] = useState(() => new Set());
  const [closedSubjects, setClosedSubjects] = useState(() => new Set());
  const [difficulty, setDifficulty] = useState(null);
  const [status, setStatus] = useState(null);
  const [repeat, setRepeat] = useState(null);

  const topicById = useMemo(() => {
    const map = new Map();
    subjects.forEach((subject) =>
      subject.topics.forEach((topic) => map.set(topic.id, topic))
    );
    return map;
  }, [subjects]);

  const stats = useMemo(() => {
    let topics = 0;
    let questions = 0;
    subjects.forEach((subject) =>
      subject.topics.forEach((topic) => {
        if (selectedTopics.has(topic.id)) {
          topics += 1;
          questions += topic.questionCount;
        }
      })
    );
    return { topics, questions };
  }, [subjects, selectedTopics]);

  // Предметы по умолчанию развёрнуты; closedSubjects хранит свёрнутые.
  const isSubjectOpen = (id) => !closedSubjects.has(id);

  const toggleTopic = (id) => setSelectedTopics((prev) => toggleInSet(prev, id));

  const toggleSubject = (subject) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      const allSelected = subject.topics.every((topic) => next.has(topic.id));
      subject.topics.forEach((topic) =>
        allSelected ? next.delete(topic.id) : next.add(topic.id)
      );
      return next;
    });
  };

  const toggleSubjectOpen = (id) =>
    setClosedSubjects((prev) => toggleInSet(prev, id));

  const resetFilters = () => {
    setSelectedTopics(new Set());
    setDifficulty(null);
    setStatus(null);
    setRepeat(null);
    setClosedSubjects(new Set());
  };

  const countQuestions = (ids) =>
    [...ids].reduce((sum, id) => sum + (topicById.get(id)?.questionCount ?? 0), 0);

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
    countQuestions,
  };
}
