export const matches = (skill, difficulty, status, repeat) =>
  (!difficulty || skill.difficulty === difficulty) &&
  (!status || skill.status === status) &&
  (!repeat || skill.repeat === repeat);

export const collectSkillIds = (subject) =>
  subject.domains.flatMap((domain) => domain.skills.map((skill) => skill.id));

export const filterSkills = (skills, difficulty, status, repeat) =>
  skills.filter((skill) => matches(skill, difficulty, status, repeat));

export const firstDomains = (subjects) =>
  new Set(subjects.map((subject) => subject.domains[0]?.id).filter(Boolean));
