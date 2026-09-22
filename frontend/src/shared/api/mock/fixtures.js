/**
 * Mock-данные, повторяющие форму ответов backend API (см. apiService.js).
 * Слой shared не может импортировать entities, поэтому фикстуры самодостаточны.
 */

/** @type {import("../apiService").SubjectOverview[]} */
export const subjectsOverview = [
  {
    id: 1,
    title: "Математическая грамотность",
    subject: "COMPULSORY",
    totalQuestions: 1925,
    topics: [
      { id: 101, title: "Algebra", questionCount: 616 },
      { id: 102, title: "Advanced Math", questionCount: 770 },
      { id: 103, title: "Problem-Solving and Data Analysis", questionCount: 539 },
    ],
  },
  {
    id: 2,
    title: "Грамотность чтения",
    subject: "COMPULSORY",
    totalQuestions: 2250,
    topics: [
      { id: 201, title: "Information and Ideas", questionCount: 620 },
      { id: 202, title: "Craft and Structure", questionCount: 610 },
      { id: 203, title: "Expression of Ideas", questionCount: 590 },
      { id: 204, title: "Standard English Conventions", questionCount: 430 },
    ],
  },
  {
    id: 3,
    title: "История Казахстана",
    subject: "COMPULSORY",
    totalQuestions: 1530,
    topics: [
      { id: 301, title: "Древний Казахстан", questionCount: 450 },
      { id: 302, title: "Средневековый Казахстан", questionCount: 520 },
      { id: 303, title: "Казахстан в Новое время", questionCount: 560 },
    ],
  },
];

/** @type {import("../apiService").User[]} */
export const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password",
    username: "Бейбарыс",
    token: "mock-token-1",
  },
  {
    id: 2,
    email: "aigerim@example.kz",
    password: "password",
    username: "Айгерим",
    token: "mock-token-2",
  },
];
