/**
 * Варианты фильтров практики. Это UI-подписи к enum-значениям backend
 * (`Difficulty`, `AnswerStatus`), а не данные — поэтому константы живут на фронте.
 */
export const difficultyOptions = [
  { value: "EASY", label: "Легко" },
  { value: "MEDIUM", label: "Средне" },
  { value: "HARD", label: "Сложно" },
];

export const answerStatusOptions = [
  { value: "CORRECT", label: "Верно" },
  { value: "INCORRECT", label: "Неверно" },
  { value: "NOT_ANSWERED", label: "Без ответа" },
];

export const repeatOptions = [
  { value: "YES", label: "Да" },
  { value: "NO", label: "Нет" },
];
