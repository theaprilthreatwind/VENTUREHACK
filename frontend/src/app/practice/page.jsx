"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Minus, Play, RotateCcw, Timer } from "lucide-react";
import {
  subjects,
  difficulties,
  answerStatuses,
  repeatOptions,
  userProfile,
  formatNumberEn,
} from "@/data/mockData";

const matches = (skill, difficulty, status, repeat) =>
  (!difficulty || skill.difficulty === difficulty) &&
  (!status || skill.status === status) &&
  (!repeat || skill.repeat === repeat);

const difficultyChipStyles = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-600",
};

const firstDomains = () => new Set(subjects.map((s) => s.domains[0]?.id).filter(Boolean));

function SegmentedControl({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="flex rounded-xl bg-slate-100 p-1">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(active ? null : option)}
              aria-pressed={active}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                active ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckboxBox({ state }) {
  if (state === "checked") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
        <Check className="h-3.5 w-3.5 text-white" />
      </span>
    );
  }
  if (state === "partial") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded border-2 border-blue-600 bg-blue-50">
        <Minus className="h-3 w-3 text-blue-600" />
      </span>
    );
  }
  return <span className="h-5 w-5 rounded border-2 border-slate-300 bg-white" />;
}

function ProgressRing({ value }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-extrabold tracking-tight text-slate-900">{value}%</span>
      </div>
    </div>
  );
}

function SkillRow({ skill, selected, onToggle, onQuickStart }) {
  const label = `select-${skill.id}`;
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white">
      <input
        id={label}
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        className="h-4 w-4 shrink-0 rounded accent-blue-600"
      />
      <label htmlFor={label} className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
        <span className="truncate text-sm font-medium text-slate-700">{skill.name}</span>
        <span className="ml-auto shrink-0 text-xs tabular-nums text-slate-400">
          {skill.questions} Qs
        </span>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
            difficultyChipStyles[skill.difficulty]
          }`}
        >
          {skill.difficulty}
        </span>
      </label>
      <button
        type="button"
        aria-label={`Быстрый старт: ${skill.name}`}
        onClick={onQuickStart}
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
      >
        <Play className="h-4 w-4" />
      </button>
    </div>
  );
}

function DomainBlock({
  domain,
  selectedSkills,
  visibleSkills,
  open,
  onToggleOpen,
  onToggleDomain,
  onToggleSkill,
  onQuickStartDomain,
}) {
  const selected = visibleSkills.filter((s) => selectedSkills.has(s.id));
  const state =
    visibleSkills.length === selected.length && visibleSkills.length > 0
      ? "checked"
      : selected.length > 0
        ? "partial"
        : "none";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleDomain}
          aria-label="Выбрать раздел целиком"
          className="rounded-lg p-1 transition-colors hover:bg-white"
        >
          <CheckboxBox state={state} />
        </button>
        <button
          type="button"
          onClick={onToggleOpen}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <span className="text-sm font-semibold text-slate-800">{domain.name}</span>
          <span className="text-xs tabular-nums text-slate-400">{domain.questions} questions</span>
          <ChevronDown
            className={`ml-auto h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        <button
          type="button"
          aria-label={`Быстрый старт: ${domain.name}`}
          onClick={onQuickStartDomain}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
        >
          <Play className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="mt-1 space-y-0.5 border-t border-slate-100 pt-2">
          {visibleSkills.map((skill) => (
            <SkillRow
              key={skill.id}
              skill={skill}
              selected={selectedSkills.has(skill.id)}
              onToggle={() => onToggleSkill(skill.id)}
              onQuickStart={() => onQuickStart([skill.id])}
            />
          ))}
          {visibleSkills.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-slate-400">
              No topics match the current filters
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SubjectCard({
  subject,
  selectedSkills,
  difficulty,
  status,
  repeat,
  openSubjects,
  openDomains,
  onToggleSubject,
  onToggleSubjectOpen,
  onToggleDomain,
  onToggleDomainOpen,
  onToggleSkill,
  onQuickStart,
}) {
  const allSkillIds = subject.domains.flatMap((d) => d.skills.map((s) => s.id));
  const visibleSkillIds = subject.domains.flatMap((d) =>
    d.skills.filter((s) => matches(s, difficulty, status, repeat)).map((s) => s.id)
  );
  const selectedVisible = visibleSkillIds.filter((id) => selectedSkills.has(id));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={onToggleSubject}
          aria-label="Выбрать предмет целиком"
          className="shrink-0 rounded-lg p-1 transition-colors hover:bg-slate-100"
        >
          <CheckboxBox
            state={
              visibleSkillIds.length > 0 && visibleSkillIds.every((id) => selectedSkills.has(id))
                ? "checked"
                : selectedVisible.length > 0
                  ? "partial"
                  : "none"
            }
          />
        </button>
        <button
          type="button"
          onClick={onToggleSubjectOpen}
          aria-expanded={openSubjects.has(subject.id)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">{subject.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {subject.shortName} • {formatNumberEn(subject.totalQuestions)} questions
            </p>
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
              openSubjects.has(subject.id) ? "rotate-180" : ""
            }`}
          />
        </button>
        <button
          type="button"
          aria-label={`Быстрый старт: ${subject.name}`}
          onClick={() => onQuickStart(subject, allSkillIds)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <Play className="h-4 w-4" />
          Start
        </button>
      </div>

      {openSubjects.has(subject.id) && (
        <div className="space-y-3 border-t border-slate-100 p-3 sm:p-4">
          {subject.domains.map((domain) => {
            const visibleSkills = domain.skills.filter((s) => matches(s, difficulty, status, repeat));
            return (
              <DomainBlock
                key={domain.id}
                domain={domain}
                selectedSkills={selectedSkills}
                visibleSkills={visibleSkills}
                open={openDomains.has(domain.id)}
                onToggleOpen={() => onToggleDomainOpen(domain.id)}
                onToggleDomain={() => onToggleDomain(domain)}
                onToggleSkill={onToggleSkill}
                onQuickStartDomain={() => onQuickStart(domain, domain.skills.map((s) => s.id))}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function PracticePage() {
  const router = useRouter();

  const skillById = useMemo(() => {
    const map = new Map();
    subjects.forEach((s) =>
      s.domains.forEach((d) => d.skills.forEach((skill) => map.set(skill.id, skill)))
    );
    return map;
  }, []);

  const [selectedSkills, setSelectedSkills] = useState(() => new Set());
  const [difficulty, setDifficulty] = useState(null);
  const [status, setStatus] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [openSubjects, setOpenSubjects] = useState(() => new Set(subjects.map((s) => s.id)));
  const [openDomains, setOpenDomains] = useState(() => firstDomains());

  const stats = useMemo(() => {
    let domains = 0;
    let questions = 0;
    subjects.forEach((s) =>
      s.domains.forEach((d) => {
        const selected = d.skills.filter(
          (skill) => selectedSkills.has(skill.id) && matches(skill, difficulty, status, repeat)
        );
        if (selected.length > 0) domains += 1;
        questions += selected.reduce((sum, skill) => sum + skill.questions, 0);
      })
    );
    return { domains, questions };
  }, [selectedSkills, difficulty, status, repeat]);

  const toggleSkill = (id) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleDomain = (domain) => {
    const visible = domain.skills.filter((s) => matches(s, difficulty, status, repeat));
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      const allSelected = visible.every((s) => next.has(s.id));
      visible.forEach((s) => (allSelected ? next.delete(s.id) : next.add(s.id)));
      return next;
    });
  };

  const toggleSubject = (subject) => {
    const visible = subject.domains.flatMap((d) =>
      d.skills.filter((s) => matches(s, difficulty, status, repeat)).map((s) => s.id)
    );
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      const allSelected = visible.every((id) => next.has(id));
      visible.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  const toggleOpenSubject = (id) => {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleOpenDomain = (id) => {
    setOpenDomains((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedSkills(new Set());
    setDifficulty(null);
    setStatus(null);
    setRepeat(null);
    setOpenSubjects(new Set(subjects.map((s) => s.id)));
    setOpenDomains(firstDomains());
  };

  const startSession = (ids) => {
    const topics = [...ids];
    const totalQuestions = topics.reduce((sum, id) => {
      const skill = skillById.get(id);
      return sum + (skill && matches(skill, difficulty, status, repeat) ? skill.questions : 0);
    }, 0);

    localStorage.setItem(
      "entuz_session",
      JSON.stringify({
        topics,
        difficulty,
        status,
        repeat,
        totalQuestions,
        createdAt: new Date().toISOString(),
      })
    );
    router.push("/test/active");
  };

  const canStart = stats.questions > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40 pt-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Банк вопросов</h1>
        <p className="mt-1 text-sm text-slate-500">
          Выберите темы и запустите персональную тренировочную сессию
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <section className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Progress</p>
          <div className="mt-4">
            <ProgressRing value={userProfile.progress} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Answered: {userProfile.answered} out of {formatNumberEn(userProfile.totalQuestions)}
          </p>
        </section>

        <section className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Time</p>
          <div className="mt-4 flex items-center gap-2">
            <Timer className="h-6 w-6 text-slate-300" />
            <span className="text-5xl font-extrabold tabular-nums tracking-tight text-slate-900">
              {userProfile.totalTime}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            For questions matching selected filters
          </p>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Set Filters</h2>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </button>
        </div>
        <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-3">
          <SegmentedControl
            label="Difficulty"
            value={difficulty}
            options={difficulties}
            onChange={setDifficulty}
          />
          <SegmentedControl
            label="Answer Status"
            value={status}
            options={answerStatuses}
            onChange={setStatus}
          />
          <SegmentedControl
            label="Marked for Review"
            value={repeat}
            options={repeatOptions}
            onChange={setRepeat}
          />
        </div>
      </section>

      <div className="mt-5 space-y-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            selectedSkills={selectedSkills}
            difficulty={difficulty}
            status={status}
            repeat={repeat}
            openSubjects={openSubjects}
            openDomains={openDomains}
            onToggleSubject={() => toggleSubject(subject)}
            onToggleSubjectOpen={() => toggleOpenSubject(subject.id)}
            onToggleDomain={toggleDomain}
            onToggleDomainOpen={toggleOpenDomain}
            onToggleSkill={toggleSkill}
            onQuickStart={(_scope, ids) => startSession(ids)}
          />
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-slate-800 bg-slate-900 px-6 py-3 text-white shadow-2xl sm:gap-6">
        <p className="text-sm font-semibold">
          SELECTION:{" "}
          <span className="text-white">
            {stats.domains} {stats.domains === 1 ? "Domain" : "Domains"}
          </span>{" "}
          • <span>{stats.questions} Qs</span>
        </p>
        <button
          type="button"
          onClick={() => startSession([...selectedSkills])}
          disabled={!canStart}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-4 w-4" />
          Start Session
        </button>
      </div>
    </div>
  );
}