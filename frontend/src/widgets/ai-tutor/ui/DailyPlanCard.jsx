"use client";

import { AlertTriangle, CheckCircle2, ListChecks, Play, RefreshCw } from "lucide-react";

function reasonBadge(reason = "") {
  const text = reason.toLowerCase();
  if (text.includes("ошибк")) {
    return {
      label: "Частые ошибки",
      className: "bg-rose-50 text-rose-700 ring-rose-200",
    };
  }
  if (text.includes("повтор") || text.includes("закреп") || text.includes("повторить")) {
    return {
      label: "На повторение",
      className: "bg-sky-50 text-sky-700 ring-sky-200",
    };
  }
  if (text.includes("не про") || text.includes("нов") || text.includes("старт")) {
    return {
      label: "Не пройден",
      className: "bg-amber-50 text-amber-700 ring-amber-200",
    };
  }
  return {
    label: "Рекомендовано AI",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  };
}

function priorityBadge(priority) {
  if (priority === "high") {
    return {
      label: "Высокий приоритет",
      className: "bg-orange-50 text-orange-700 ring-orange-200",
    };
  }
  return {
    label: "Средний приоритет",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  };
}

function SkeletonRows({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex-1 space-y-2.5">
            <div className="h-2.5 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="flex gap-2">
              <div className="h-5 w-28 animate-pulse rounded-full bg-slate-100" />
              <div className="h-5 w-32 animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="h-10 w-40 animate-pulse rounded-xl bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export function DailyPlanCard({ plan, loading, error, completedKeys, onStartTopic, onReload }) {
  const completedCount = (plan ?? []).filter((topic) =>
    completedKeys.has(`${topic.subject}::${topic.topic}`)
  ).length;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#131926] text-white">
            <ListChecks className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">План задач на сегодня</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Подобран AI-тьютором под ваши слабые темы
            </p>
          </div>
        </div>

        {!loading && !error && plan?.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              Выполнено {completedCount} из {plan.length}
            </span>
            <button
              type="button"
              onClick={onReload}
              aria-label="Обновить план"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {loading && !error && <SkeletonRows />}

      {error && !plan && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-rose-500" />
          <p className="mt-3 text-sm font-semibold text-rose-700">
            Не удалось сгенерировать план
          </p>
          <p className="mt-1 max-w-md text-xs text-rose-600">{error.message}</p>
          <button
            type="button"
            onClick={onReload}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <RefreshCw className="h-4 w-4" />
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && !error && plan?.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
          AI-тьютор пока не нашёл подходящие темы. Обновите план позже.
        </div>
      )}

      {!loading && !error && plan?.length > 0 && (
        <ul className="space-y-3">
          {plan.map((topic) => {
            const key = `${topic.subject}::${topic.topic}`;
            const isDone = completedKeys.has(key);
            const reason = reasonBadge(topic.reason);
            const priority = priorityBadge(topic.priority);

            if (isDone) {
              return (
                <li
                  key={key}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      {topic.subject}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-bold text-emerald-900">
                      {topic.topic}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Выполнено
                  </span>
                </li>
              );
            }

            return (
              <li
                key={key}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {topic.subject}
                    </p>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${reason.className}`}>
                      {reason.label}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${priority.className}`}>
                      {priority.label}
                    </span>
                  </div>
                  <h4 className="mt-1.5 truncate text-base font-bold text-slate-900">
                    {topic.topic}
                  </h4>
                  {topic.reason && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{topic.reason}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onStartTopic(topic)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
                >
                  <Play className="h-4 w-4" />
                  Сделать задание
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}