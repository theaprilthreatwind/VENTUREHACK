"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Trophy,
} from "lucide-react";
import { finishPractice, saveAnswer } from "@/shared/api";
import { storageGet, storageRemove } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/* ──────────────────────────────────────────────────────────── */
/*  Утилита: нормализация ответа бэкенда                        */
/* ──────────────────────────────────────────────────────────── */

/**
 * Бэкенд может вернуть вопросы под разными ключами и варианты под разными ключами.
 * Нормализуем всё к { id, text, options: [{id, text}] }
 */
function normalizeSession(raw) {
  if (!raw) return null;

  const attemptId = raw.attemptId ?? raw.attempt_id ?? raw.id;

  const rawQuestions =
    raw.questions ??
    raw.questionList ??
    raw.questionsList ??
    raw.items ??
    raw.data ??
    [];

  const questions = Array.isArray(rawQuestions)
    ? rawQuestions.map((q) => ({
        id: q.id ?? q.questionId,
        // Бэкенд возвращает поле 'title' (Question.java строка 26)
        text: q.title ?? q.text ?? q.question ?? q.questionText ?? q.content ?? "",
        difficulty: q.difficulty ?? q.level ?? null,
        options: normalizeOptions(
          q.options ?? q.answers ?? q.variants ?? q.choices ?? q.answerOptions ?? []
        ),
      }))
    : [];

  return { attemptId, questions, createdAt: raw.createdAt };
}

function normalizeOptions(opts) {
  if (!Array.isArray(opts)) return [];
  return opts.map((o) => ({
    id: o.id ?? o.optionId,
    // Option.text — правильное поле
    text: o.text ?? o.title ?? o.content ?? o.answer ?? o.answerText ?? String(o),
    // Jackson сериализует boolean isCorrect -> "correct" (без "is")
    isCorrect: o.correct ?? o.isCorrect ?? false,
  }));
}


/* ──────────────────────────────────────────────────────────── */
/*  Вспомогательные компоненты                                  */
/* ──────────────────────────────────────────────────────────── */

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Сессия не найдена</h1>
        <p className="mt-2 text-sm text-slate-500">
          Сначала соберите набор вопросов в банке.
        </p>
        <Link
          href="/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          К банку вопросов
        </Link>
      </div>
    </div>
  );
}

function EmptyQuestions({ attemptId, onFinish, isFinishing }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Trophy className="mx-auto h-10 w-10 text-amber-400" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Сессия #{attemptId}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Вопросы не пришли от сервера. Проверьте консоль браузера (F12 → Console) — там должен быть лог <code className="rounded bg-slate-100 px-1 text-xs">[startPractice] raw response</code>.
        </p>
        <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-left text-xs text-amber-700">
          <p className="font-semibold">Что проверить в консоли:</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            <li>Есть ли поле <code>questions</code> / <code>questionList</code>?</li>
            <li>Какой ключ у вариантов ответа?</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onFinish}
            disabled={isFinishing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {isFinishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trophy className="h-4 w-4" />}
            Завершить тест
          </button>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к выбору
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Форматирует секунды в MM:SS */
function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function ProgressBar({ current, total, elapsed }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="mb-6">
      <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Вопрос {current} из {total}</span>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span className="tabular-nums font-semibold text-slate-600">{formatTime(elapsed)}</span>
          <span className="ml-2">{pct}%</span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-[#131926] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OptionButton({ option, state, onClick }) {
  const base = "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all";
  const styles = {
    // Не выбран — кликабелен
    idle: `${base} border-slate-200 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50 cursor-pointer`,
    // Выбран текущим пользователем
    selected: `${base} border-[#131926] bg-[#131926] text-white shadow-md cursor-pointer`,
    // Идёт сохранение — заблокирован
    saving: `${base} border-slate-300 bg-slate-100 text-slate-500 cursor-wait`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === "saving"}
      className={styles[state] ?? styles.idle}
    >
      {option.text || `Вариант ${option.id}`}
    </button>
  );
}

function ResultsScreen({ stats }) {
  const pct =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
            <Trophy className="h-8 w-8 text-amber-500" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">Тест завершён!</h1>
          <div className="mt-6">
            <span className="text-6xl font-black text-[#131926]">{pct}%</span>
            <p className="mt-1 text-sm text-slate-500">правильных ответов</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Всего</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{stats.totalQuestions}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Верно</p>
              <p className="mt-1 text-3xl font-black text-emerald-600">{stats.correctAnswers}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Время</p>
              <p className="mt-1 text-2xl font-black text-slate-700 tabular-nums">
                {stats.elapsedSeconds != null ? formatTime(stats.elapsedSeconds) : "—"}
              </p>
            </div>
          </div>
          {stats.startedAt && (
            <p className="mt-4 text-xs text-slate-400">
              {new Date(stats.startedAt).toLocaleString("ru-RU")} —{" "}
              {new Date(stats.finishedAt).toLocaleString("ru-RU")}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#131926] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Новая сессия
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Главный компонент                                           */
/* ──────────────────────────────────────────────────────────── */

export function ActiveSessionPage() {
  // null = ещё не гидрировались, undefined = гидрировались, сессии нет
  const [session, setSession] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [stats, setStats] = useState(null);
  const [isFinishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState("");

  // ── Таймер ──
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Читаем localStorage ТОЛЬКО на клиенте — после гидрации
  useEffect(() => {
    const raw = storageGet(STORAGE_KEYS.session, null);
    // eslint-disable-next-line no-console
    console.log("[ActiveSessionPage] stored session:", JSON.stringify(raw, null, 2));
    setSession(normalizeSession(raw));
    setHydrated(true);
  }, []);

  // Запускаем таймер только когда сессия загружена и вопросы есть
  useEffect(() => {
    if (!hydrated || !session?.attemptId || !session?.questions?.length) return;
    timerRef.current = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [hydrated, session?.attemptId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── До гидрации — нейтральный skeleton (одинаков на SSR и клиенте) ──
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 h-8 animate-pulse rounded-full bg-slate-200" />
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  }

  // ── Нет сессии вообще ──
  if (!session?.attemptId) {
    return <NotFound />;
  }

  const { attemptId, questions } = session;

  // ── Завершить тест (нужен даже при пустых вопросах) ──
  const handleFinish = async () => {
    clearInterval(timerRef.current); // останавливаем таймер
    setFinishError("");
    setFinishing(true);
    try {
      const result = await finishPractice(attemptId);
      storageRemove(STORAGE_KEYS.session);
      // Добавляем время прохождения в результат если бэкенд не возвращает
      setStats({ ...result, elapsedSeconds: elapsed });
    } catch (err) {
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000); // возобновляем при ошибке
      setFinishError(err?.message ?? "Не удалось завершить тест. Попробуйте снова.");
    } finally {
      setFinishing(false);
    }
  };

  // ── Экран результатов ──
  if (stats) return <ResultsScreen stats={stats} />;

  // ── Вопросы не пришли — показываем диагностику ──
  if (!questions || questions.length === 0) {
    return (
      <EmptyQuestions
        attemptId={attemptId}
        onFinish={handleFinish}
        isFinishing={isFinishing}
      />
    );
  }

  // ── Нормальный флоу с вопросами ──
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const currentAnswer = answers[currentQuestion.id];

  const handleSelectOption = async (optionId) => {
    // Если уже выбран этот же вариант — ничего не делаем
    if (answers[currentQuestion.id] === optionId) return;
    // Если идёт сохранение — ждём
    if (savingId === currentQuestion.id) return;

    // Оптимистично обновляем UI сразу (быстрая реакция)
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    setSavingId(currentQuestion.id);

    try {
      await saveAnswer({ attemptId, questionId: currentQuestion.id, optionId });
    } catch {
      // Ответ уже записан локально — не блокируем пользователя
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} elapsed={elapsed} />

      {/* Карточка вопроса */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {currentQuestion.difficulty && (
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
              currentQuestion.difficulty === "EASY"
                ? "bg-emerald-100 text-emerald-700"
                : currentQuestion.difficulty === "MEDIUM"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {currentQuestion.difficulty === "EASY"
              ? "Лёгкий"
              : currentQuestion.difficulty === "MEDIUM"
              ? "Средний"
              : "Сложный"}
          </span>
        )}

        <h2 className="text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
          {currentQuestion.text || "Текст вопроса не загружен"}
        </h2>

        <div className="mt-6 space-y-3">
          {currentQuestion.options.length > 0 ? (
            currentQuestion.options.map((option) => {
              let state = "idle";
              if (savingId === currentQuestion.id) state = "saving";
              else if (currentAnswer === option.id) state = "selected";
              return (
                <OptionButton
                  key={option.id}
                  option={option}
                  state={state}
                  onClick={() => handleSelectOption(option.id)}
                />
              );
            })
          ) : (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Варианты ответа не загружены. Проверьте структуру ответа в консоли (F12).
            </p>
          )}
        </div>
      </div>

      {/* Навигация */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад
        </button>

        <span className="text-xs font-medium text-slate-400">
          Отвечено: {answeredCount} / {totalQuestions}
        </span>

        {isLast ? (
          <button
            type="button"
            onClick={handleFinish}
            disabled={isFinishing}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-60"
          >
            {isFinishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trophy className="h-4 w-4" />}
            {isFinishing ? "Завершаем..." : "Завершить тест"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
            className="inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Далее
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {finishError && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {finishError}
        </p>
      )}

      {/* Нумерованные кнопки вопросов */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {questions.map((q, i) => (
          <button
            key={q.id ?? i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
              i === currentIndex
                ? "bg-[#131926] text-white"
                : answers[q.id] !== undefined
                ? "bg-emerald-100 text-emerald-700"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/practice" className="text-sm font-medium text-slate-400 hover:text-slate-700">
          ← Вернуться к выбору тем
        </Link>
      </div>
    </div>
  );
}
