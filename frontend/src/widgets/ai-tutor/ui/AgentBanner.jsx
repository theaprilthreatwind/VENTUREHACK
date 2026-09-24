import { Bot, Sparkles } from "lucide-react";

/**
 * Шапка AI-Агента: тёмный градиентный баннер со статусом онлайн.
 */
export function AgentBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#131926] via-[#16233f] to-[#1d4ed8] p-7 text-white shadow-xl sm:p-9">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
        aria-hidden="true"
      />
      <Sparkles
        className="pointer-events-none absolute right-9 top-9 h-16 w-16 text-white/10"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25 backdrop-blur">
          <Bot className="h-7 w-7" />
        </span>

        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              AI-Тьютор ЕНТ
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-300/40">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Онлайн • Готов к анализу
            </span>
          </p>
          <p className="mt-1.5 text-sm font-medium text-slate-300">
            Анализирую ваши слабые темы и подбираю персональный план на сегодня
          </p>
        </div>
      </div>
    </section>
  );
}