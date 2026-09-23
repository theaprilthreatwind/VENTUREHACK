import { test } from "node:test";
import assert from "node:assert/strict";
import {
  toggleInSet,
  toggleTopicsForSubject,
  getSubjectState,
  countSelection,
  countQuestions,
  getTopicById,
} from "../src/widgets/practice-browser/model/selection.mjs";

const subjects = [
  {
    id: 1,
    title: "Математическая грамотность",
    subject: "COMPULSORY",
    totalQuestions: 10,
    topics: [
      { id: 101, title: "Algebra", questionCount: 3 },
      { id: 102, title: "Advanced Math", questionCount: 7 },
    ],
  },
  {
    id: 2,
    title: "История Казахстана",
    subject: "COMPULSORY",
    totalQuestions: 5,
    topics: [{ id: 201, title: "Древний Казахстан", questionCount: 5 }],
  },
];

const math = subjects[0];

test("toggleInSet: добавляет и удаляет id", () => {
  assert.equal(toggleInSet(new Set(), 101).has(101), true);
  const s = toggleInSet(toggleInSet(new Set(), 101), 101);
  assert.equal(s.has(101), false);
  assert.equal(s.size, 0);
});

test("toggleInSet: не мутирует исходный Set", () => {
  const original = new Set([101]);
  const next = toggleInSet(original, 102);
  assert.equal(original.has(102), false, "исходный set не должен меняться");
  assert.equal(next.has(102), true);
});

test("toggleTopicsForSubject: выбор предмета помечает все его темы", () => {
  const next = toggleTopicsForSubject(new Set(), math);
  assert.deepEqual([...next].sort(), [101, 102]);
});

test("toggleTopicsForSubject: повторный клик снимает все темы", () => {
  const next = toggleTopicsForSubject(toggleTopicsForSubject(new Set(), math), math);
  assert.equal(next.size, 0);
});

test("toggleTopicsForSubject: вручную отмеченные чужие темы сохраняются", () => {
  const next = toggleTopicsForSubject(new Set([201]), math);
  assert.equal(next.has(201), true, "тема другого предмета не должна сниматься");
  assert.deepEqual([...next].sort(), [101, 102, 201]);
});

test("getSubjectState: none при пустой выборке", () => {
  assert.equal(getSubjectState(math, new Set()), "none");
});

test("getSubjectState: partial при частично отмеченных темах", () => {
  assert.equal(getSubjectState(math, new Set([101])), "partial");
});

test("getSubjectState: checked когда отмечены все темы", () => {
  assert.equal(getSubjectState(math, new Set([101, 102])), "checked");
});

test("getSubjectState: empty topics => none, без ошибок", () => {
  const empty = { id: 9, topics: [] };
  assert.equal(getSubjectState(empty, new Set()), "none");
});

test("countSelection: считает темы и вопросы по уникальным id", () => {
  const stats = countSelection(subjects, new Set([101, 201]));
  assert.deepEqual(stats, { topics: 2, questions: 8 });
});

test("countSelection: пустая выборка => 0", () => {
  assert.deepEqual(countSelection(subjects, new Set()), { topics: 0, questions: 0 });
});

test("countSelection: не задваивает дубликаты тем между предметами", () => {
  const dup = [
    { id: 1, topics: [{ id: 101, questionCount: 3 }] },
    { id: 2, topics: [{ id: 101, questionCount: 3 }] },
  ];
  assert.deepEqual(countSelection(dup, new Set([101])), { topics: 1, questions: 3 });
});

test("countSelection: неизвестные id игнорируются", () => {
  assert.deepEqual(countSelection(subjects, new Set([999])), { topics: 0, questions: 0 });
});

test("countQuestions: суммирует вопросы выбранных тем", () => {
  assert.equal(countQuestions(subjects, [101, 201]), 8);
  assert.equal(countQuestions(subjects, []), 0);
});

test("countQuestions: неизвестный id даёт 0", () => {
  assert.equal(countQuestions(subjects, [999]), 0);
});

test("getTopicById: мапа по id тем", () => {
  const byId = getTopicById(subjects);
  assert.equal(byId.get(101).questionCount, 3);
  assert.equal(byId.get(201).questionCount, 5);
  assert.equal(byId.has(404), false);
});