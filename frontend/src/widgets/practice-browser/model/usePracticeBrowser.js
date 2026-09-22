"use client";

import { useMemo, useState } from "react";
import { firstDomains, matches, subjects } from "@/entities/subject";

export function usePracticeBrowser() {
  const skillById = useMemo(() => {
    const map = new Map();
    subjects.forEach((subject) =>
      subject.domains.forEach((domain) =>
        domain.skills.forEach((skill) => map.set(skill.id, skill))
      )
    );
    return map;
  }, []);

  const [selectedSkills, setSelectedSkills] = useState(() => new Set());
  const [difficulty, setDifficulty] = useState(null);
  const [status, setStatus] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [openSubjects, setOpenSubjects] = useState(() => new Set(subjects.map((s) => s.id)));
  const [openDomains, setOpenDomains] = useState(() => firstDomains(subjects));

  const stats = useMemo(() => {
    let domains = 0;
    let questions = 0;
    subjects.forEach((subject) =>
      subject.domains.forEach((domain) => {
        const selected = domain.skills.filter(
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
    const visible = domain.skills.filter((skill) => matches(skill, difficulty, status, repeat));
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      const allSelected = visible.every((skill) => next.has(skill.id));
      visible.forEach((skill) => (allSelected ? next.delete(skill.id) : next.add(skill.id)));
      return next;
    });
  };

  const toggleSubject = (subject) => {
    const visible = subject.domains.flatMap((domain) =>
      domain.skills.filter((skill) => matches(skill, difficulty, status, repeat)).map((s) => s.id)
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
    setOpenDomains(firstDomains(subjects));
  };

  const countQuestions = (ids) =>
    [...ids].reduce((sum, id) => {
      const skill = skillById.get(id);
      return sum + (skill && matches(skill, difficulty, status, repeat) ? skill.questions : 0);
    }, 0);

  return {
    selectedSkills,
    difficulty,
    status,
    repeat,
    openSubjects,
    openDomains,
    stats,
    setDifficulty,
    setStatus,
    setRepeat,
    toggleSkill,
    toggleDomain,
    toggleSubject,
    toggleOpenSubject,
    toggleOpenDomain,
    resetFilters,
    countQuestions,
  };
}
