"use client";

import { subjects } from "@/entities/subject";
import {
  SessionActionBar,
  useStartPracticeSession,
} from "@/features/start-practice-session";
import { usePracticeBrowser } from "../model/usePracticeBrowser";
import { FilterPanel } from "./FilterPanel";
import { OverviewStats } from "./OverviewStats";
import { SubjectGroup } from "./SubjectGroup";

export function PracticeBrowser() {
  const browser = usePracticeBrowser();
  const startPracticeSession = useStartPracticeSession();

  const startSession = (ids) => {
    const topics = [...ids];
    startPracticeSession({
      topics,
      difficulty: browser.difficulty,
      status: browser.status,
      repeat: browser.repeat,
      totalQuestions: browser.countQuestions(topics),
    });
  };

  const compulsory = subjects.filter((subject) => subject.category !== "profile");
  const profile = subjects.filter((subject) => subject.category === "profile");

  const groupProps = {
    selectedSkills: browser.selectedSkills,
    difficulty: browser.difficulty,
    status: browser.status,
    repeat: browser.repeat,
    openSubjects: browser.openSubjects,
    openDomains: browser.openDomains,
    onToggleSubject: browser.toggleSubject,
    onToggleSubjectOpen: browser.toggleOpenSubject,
    onToggleDomain: browser.toggleDomain,
    onToggleDomainOpen: browser.toggleOpenDomain,
    onToggleSkill: browser.toggleSkill,
    onQuickStart: startSession,
  };

  return (
    <>
      <OverviewStats />

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
            Разверните предмет для выбора разделов и навыков. Отметьте нужные элементы и
            нажмите «Начать сессию» внизу, либо запустите отдельную тему сразу.
          </p>
        </div>

        <div className="space-y-8">
          <SubjectGroup
            title="Обязательные предметы"
            badge={`${compulsory.length} предмета`}
            hint="Сдаются всеми абитуриентами"
            subjects={compulsory}
            {...groupProps}
          />
          <SubjectGroup
            title="Профильные предметы"
            badge="Выбор 2 предметов"
            hint="По выбранному направлению"
            subjects={profile}
            {...groupProps}
          />
        </div>
      </section>

      <SessionActionBar
        domains={browser.stats.domains}
        questions={browser.stats.questions}
        canStart={browser.stats.questions > 0}
        onStart={() => startSession(browser.selectedSkills)}
      />
    </>
  );
}
