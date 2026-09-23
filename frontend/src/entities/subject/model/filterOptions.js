/**
 * Варианты фильтров практики. Это UI-подписи к enum-значениям backend
 * (`Difficulty`, `AnswerStatus`), поэтому константы живут на фронте,
 * а тексты задаются ключами словаря i18n (поле `labelKey`).
 */
export const difficultyOptions = [
  { value: "EASY", labelKey: "practice.filterEasy" },
  { value: "MEDIUM", labelKey: "practice.filterMedium" },
  { value: "HARD", labelKey: "practice.filterHard" },
];

export const answerStatusOptions = [
  { value: "CORRECT", labelKey: "practice.filterCorrect" },
  { value: "INCORRECT", labelKey: "practice.filterIncorrect" },
  { value: "NOT_ANSWERED", labelKey: "practice.filterNotAnswered" },
];

export const repeatOptions = [
  { value: "YES", labelKey: "practice.filterYes" },
  { value: "NO", labelKey: "practice.filterNo" },
];