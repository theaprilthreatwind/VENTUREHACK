"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  Loader2,
  Sparkles,
  Target,
  X,
  XCircle,
} from "lucide-react";
import { generatePracticeQuestions, explainPracticeAnswers } from "@/features/ai-tutor";

const OPTION_LETTERS = ["А", "Б", "В", "Г"];

function Spinner({ label }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

function ModalShell({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="custom-scrollbar overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function TaskModal({ topic, onClose, onFinish }) {
  const [phase, setPhase] = useState("loading");
  const [loadingError, setLoadingError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState(null);

  useEffect(() => {
    if (!topic) return undefined;

    let isActive = true;
    generatePracticeQuestions({ subject: topic.subject, topic: topic.topic })
      .then((items) => {
        if (!isActive) return;
        setQuestions(items);
        setSelected(Array(items.length).fill(null));
        setPhase("quiz");
        setLoadingError(null);
      })
      .catch((err) => {
        if (isActive) setLoadingError(err);
      });

    return () => {
      isActive = false;
    };
  }, [topic]);

  const current = questions[currentIndex] ?? null;
  const isLast = currentIndex === questions.length - 1;
  const currentSelection = selected[currentIndex];

  const answeredCount = useMemo(
    () => selected.filter((value) => value !== null).length,
    [selected]
  );

  const chooseOption = (index) => {
    if (!current) return;
    setSelected((prev) => {
      const next = [...prev];
      next[currentIndex] = index;
      return next;
    });
  };

  const goNext = () => {
    if (isLast) {
      handleSubmit();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    const total = questions.length;
    const correct = questions.reduce(
      (acc, question, index) => acc + (selected[index] === question.correctIndex ? 1 : 0),
      0
    );
    setScore(correct);
    setPhase("analysis");

    const wrongQuestions = questions
      .map((question, index) => ({ question, index }))
      .filter(({ question, index }) => selected[index] !== question.correctIndex)
      .map(({ question, index }) => ({ question, userAnswerIndex: selected[index] }));

    if (wrongQuestions.length === 0) {
      setAssessments([]);
      return;
    }

    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const data = await explainPracticeAnswers({
        subject: topic.subject,
        topic: topic.topic,
        score: correct,
        questions,
        wrongQuestions,
      });
      setAssessments(Array.isArray(data?.assessments) ? data.assessments : []);
    } catch (err) {
      setAnalyzeError(err?.message ?? "Не удалось получить разбор ошибок.");
    } finally {
      setAnalyzing(false);
    }
  };

  const analysisByQuestionId = useMemo(() => {
    const map = new Map();
    assessments.forEach((item) => {
      if (item?.questionId) map.set(item.questionId, item);
    });
    return map;
  }, [assessments]);

  if (!topic) return null;

  return (
    <ModalShell
      title={topic.topic}
      subtitle={`${topic.subject} • Мини-тест на 3 вопроса`}
      onClose={onClose}
    >
      {phase === "loading" && !loadingError && <Spinner label="Генерирую вопросы по теме…" />}

      {phase === "loading" && loadingError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-rose-500" />
          <p className="mt-3 text-sm font-semibold text-rose-700">
            Не удалось загрузить вопросы
          </p>
          <p className="mt-1 text-xs text-rose-600">
            {loadingError.message}. Проверьте, что задан GEMINI_API_KEY на сервере.
          </p>
        </div>
      )}

      {phase === "quiz" && questions.length > 0 && (
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ListChecks className="h-4 w-4" />
              Вопрос {currentIndex + 1} из {questions.length}
            </div>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
<div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold leading-relaxed text-slate-900">
              {current.text}
            </p>
          </div>

          <ul className="mt-4 space-y-2.5">
            {current.options.map((option, index) => {
              const isSelected = currentSelection === index;
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => chooseOption(index)}
                    className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {OPTION_LETTERS[index]}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={goNext}
              disabled={currentSelection === null}
              className="inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? "Завершить тест" : "Следующий вопрос"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {phase === "analysis" && (
        <div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#131926] to-[#1d4ed8] p-6 text-center text-white shadow-lg">
            <Target className="mx-auto h-9 w-9 text-blue-200" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-blue-200">
              Результат мини-теста
            </p>
            <p className="mt-1 text-4xl font-black tracking-tight">
              Балл: {score}/{questions.length}
            </p>
            <p className="mt-2 text-sm font-medium text-blue-100">
              {score === questions.length
                ? "Идеально! Ошибок нет — тема усвоена."
                : "Разбираю ошибки и подбираю советы от AI…"}
            </p>
          </div>

          {analyzing && <Spinner label="AI разбирает ваши ошибки…" />}

          {analyzeError && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">Не удалось получить разбор</p>
              <p className="mt-1 text-xs text-amber-700">{analyzeError}</p>
            </div>
          )}

          {!analyzing && !analyzeError && score < questions.length && assessments.length === 0 && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500">
              Пока нет готового разбора. Загляните в справочник по теме и попробуйте ещё раз.
            </div>
          )}

          {!analyzing && !analyzeError && assessments.length > 0 && (
            <div className="mt-4 space-y-3">
              {questions.map((question, questionIndex) => {
                const assessment = analysisByQuestionId.get(String(question.id));
                const userAnswer = selected[questionIndex];
                const isCorrect = userAnswer === question.correctIndex;

                return (
                  <div
                    key={question.id}
                    className={`rounded-2xl border p-5 ${
                      isCorrect
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-rose-200 bg-rose-50/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                          Вопрос {questionIndex + 1}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900">
                          {question.text}
                        </p>

                        {isCorrect ? (
                          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Верно: {OPTION_LETTERS[question.correctIndex]} • {question.options[question.correctIndex]}
                          </p>
                        ) : (
                          <div className="mt-2 space-y-1.5 text-xs">
                            <p className="text-rose-700">
                              Ваш ответ: {OPTION_LETTERS[userAnswer]} •{" "}
                              {question.options[userAnswer] ?? "—"}
                            </p>
                            <p className="font-semibold text-emerald-700">
                              Правильно: {OPTION_LETTERS[question.correctIndex]} •{" "}
                              {question.options[question.correctIndex]}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {assessment && (
                      <div className="mt-4 space-y-3 rounded-xl bg-white/80 p-4 text-sm ring-1 ring-inset ring-slate-200">
                        <div>
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            Почему так
                          </p>
                          <p className="mt-1 leading-relaxed text-slate-700">
                            {assessment.explanation}
                          </p>
                        </div>
                        {assessment.stepByStep && (
                          <div>
                            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                              <ListChecks className="h-3.5 w-3.5 text-blue-600" />
                              Пошаговое решение
                            </p>
                            <p className="mt-1 whitespace-pre-line leading-relaxed text-slate-700">
                              {assessment.stepByStep}
                            </p>
                          </div>
                        )}
                        {assessment.tip && (
                          <div className="rounded-xl bg-amber-50 p-3">
                            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-700">
                              <Lightbulb className="h-3.5 w-3.5" />
                              Совет для ЕНТ
                            </p>
                            <p className="mt-1 leading-relaxed text-amber-800">
                              {assessment.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!assessment && !isCorrect && (
                      <div className="mt-4 text-xs text-rose-600">
                        {question.explanation || "Краткое пояснение ещё готовится."}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!analyzing && !analyzeError && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => onFinish(score, questions.length)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                Завершить и вернуться к плану
              </button>
            </div>
          )}
        </div>
      )}
    </ModalShell>
  );
}