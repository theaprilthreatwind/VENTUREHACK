/**
 * Чистая логика выбора тем для банка вопросов / создания сессии.
 * Без React-хуков и без импортов — её можно тестировать обычным Node.
 *
 * @typedef {import("@/shared/api").SubjectOverview} SubjectOverview
 */

/**
 * @param {Set<number>} set
 * @param {number} id
 * @returns {Set<number>} новый Set с переключённым id
 */
export function toggleInSet(set, id) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/**
 * Select-all / unselect-all по предмету.
 * Если отмечены ВСЕ темы предмета — снимаем их, иначе помечаем все.
 *
 * @param {Set<number>} selectedTopics
 * @param {SubjectOverview} subject
 * @returns {Set<number>}
 */
export function toggleTopicsForSubject(selectedTopics, subject) {
  const next = new Set(selectedTopics);
  const allSelected = subject.topics.every((topic) => next.has(topic.id));
  subject.topics.forEach((topic) =>
    allSelected ? next.delete(topic.id) : next.add(topic.id)
  );
  return next;
}

/**
 * Состояние родительского чекбокса предмета.
 * "checked" — все темы, "partial" — часть, "none" — ни одной.
 *
 * @param {SubjectOverview} subject
 * @param {Set<number>} selectedTopics
 * @returns {"checked" | "partial" | "none"}
 */
export function getSubjectState(subject, selectedTopics) {
  const total = subject.topics.length;
  const selected = subject.topics.filter((topic) => selectedTopics.has(topic.id)).length;
  if (total > 0 && selected === total) return "checked";
  if (selected > 0) return "partial";
  return "none";
}

/**
 * Собирает тему по id из всех предметов (для пересчёта количества).
 *
 * @param {SubjectOverview[]} subjects
 * @returns {Map<number, {questionCount: number}>}
 */
export function getTopicById(subjects) {
  const map = new Map();
  subjects.forEach((subject) =>
    subject.topics.forEach((topic) => map.set(topic.id, topic))
  );
  return map;
}

/**
 * Суммарное количество вопросов по списку id тем.
 *
 * @param {SubjectOverview[]} subjects
 * @param {Iterable<number>} topicIds
 * @returns {number}
 */
export function countQuestions(subjects, topicIds) {
  const topicById = getTopicById(subjects);
  return [...topicIds].reduce(
    (sum, id) => sum + (topicById.get(id)?.questionCount ?? 0),
    0
  );
}

/**
 * Итог для плавающей панели: число выделенных тем и вопросов.
 * Подсчёт идёт по уникальным id тем (Set), поэтому дубликаты тем
 * между предметами не «задваивают» количество вопросов.
 *
 * @param {SubjectOverview[]} subjects
 * @param {Set<number>} selectedTopics
 * @returns {{ topics: number, questions: number }}
 */
export function countSelection(subjects, selectedTopics) {
  const topicById = getTopicById(subjects);
  let topics = 0;
  let questions = 0;
  selectedTopics.forEach((id) => {
    const topic = topicById.get(id);
    if (topic) {
      topics += 1;
      questions += topic.questionCount;
    }
  });
  return { topics, questions };
}