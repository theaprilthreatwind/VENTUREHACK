"use client";

import { subjects } from "@/entities/subject";
import {
  SessionActionBar,
  useStartPracticeSession,
} from "@/features/start-practice-session";
import { usePracticeBrowser } from "../model/usePracticeBrowser";
import { FilterPanel } from "./FilterPanel";
import { OverviewStats } from "./OverviewStats";
import { SubjectCard } from "./SubjectCard";

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

  const canStart = browser.stats.questions > 0;

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

      <div className="mt-5 space-y-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            selectedSkills={browser.selectedSkills}
            difficulty={browser.difficulty}
            status={browser.status}
            repeat={browser.repeat}
            openSubjects={browser.openSubjects}
            openDomains={browser.openDomains}
            onToggleSubject={() => browser.toggleSubject(subject)}
            onToggleSubjectOpen={() => browser.toggleOpenSubject(subject.id)}
            onToggleDomain={browser.toggleDomain}
            onToggleDomainOpen={browser.toggleOpenDomain}
            onToggleSkill={browser.toggleSkill}
            onQuickStart={startSession}
          />
        ))}
      </div>

      <SessionActionBar
        domains={browser.stats.domains}
        questions={browser.stats.questions}
        canStart={canStart}
        onStart={() => startSession(browser.selectedSkills)}
      />
    </>
  );
}
