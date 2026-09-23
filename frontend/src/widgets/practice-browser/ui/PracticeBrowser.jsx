"use client";

import {
  SessionActionBar,
  useStartPracticeSession,
} from "@/features/start-practice-session";
import { usePracticeBrowser } from "../model/usePracticeBrowser";
import { FilterPanel } from "./FilterPanel";
import { SubjectGroup } from "./SubjectGroup";

export function PracticeBrowser() {
  const browser = usePracticeBrowser();
  const startPracticeSession = useStartPracticeSession();

  const startSession = (topicIds) => {
    const ids = [...topicIds];
    startPracticeSession({
      topicIds: ids,
      questionsCount: browser.countQuestions(ids),
      difficulties: browser.difficulty ? [browser.difficulty] : ["EASY", "MEDIUM", "HARD"],
      answerStatus: browser.status ?? "ALL",
      isRepetition: browser.repeat === "YES",
    });
  };

  const compulsory = browser.subjects.filter((subject) => subject.subject === "COMPULSORY");
  const profile = browser.subjects.filter((subject) => subject.subject !== "COMPULSORY");

  const groupProps = {
    selectedTopics: browser.selectedTopics,
    isSubjectOpen: browser.isSubjectOpen,
    onToggleSubject: browser.toggleSubject,
    onToggleOpen: browser.toggleSubjectOpen,
    onToggleTopic: browser.toggleTopic,
    onQuickStart: startSession,
  };

  return (
    <>
      <FilterPanel
        difficulty={browser.difficulty}
        status={browser.status}
        repeat={browser.repeat}
        onDifficultyChange={browser.setDifficulty}
        onStatusChange={browser.setStatus}
        onRepeatChange={browser.setRepeat}
        onReset={browser.resetFilters}
      />

      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Обзор по предметам
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Разверните предмет, отметьте нужные темы и нажмите «Начать сессию», либо
            запустите отдельную тему сразу.
          </p>
        </div>

        {browser.isLoading && (
          <p className="text-sm text-slate-500">Загрузка предметов…</p>
        )}

        {browser.error && (
          <p className="text-sm text-red-500">
            Не удалось загрузить предметы: {browser.error.message}
          </p>
        )}

        {!browser.isLoading && !browser.error && (
          <div className="space-y-8">
            {compulsory.length > 0 && (
              <SubjectGroup
                title="Обязательные предметы"
                badge={`${compulsory.length} предмета`}
                hint=""
                subjects={compulsory}
                {...groupProps}
              />
            )}
            {profile.length > 0 && (
              <SubjectGroup
                title="Профильные предметы"
                badge="Выбор 2 предметов"
                hint="По выбранному направлению"
                subjects={profile}
                {...groupProps}
              />
            )}
          </div>
        )}
      </section>

      <SessionActionBar
        topics={browser.stats.topics}
        questions={browser.stats.questions}
        canStart={browser.stats.questions > 0}
        onStart={() => startSession(browser.selectedTopics)}
      />
    </>
  );
}
