import { ShieldCheck, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export function BrandBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <Zap className="h-6 w-6 text-sky-300" />
        </span>
        <div>
          <p className="text-lg font-extrabold tracking-tight">ЕНТdigit</p>
          <p className="text-xs font-medium text-blue-100/70">Первая цифровая школа ЕНТ</p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-white/15">
          <Sparkles className="h-3.5 w-3.5" />
          69 000+ часов практики уже пройдено
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-5xl">
          Твой путь к{" "}
          <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
            140 баллам
          </span>{" "}
          на ЕНТ
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-blue-100/80">
          Присоединяйся к абитуриентам Казахстана: решай реальные задания, следи за
          прогрессом и поступай в вуз мечты.
        </p>

        <div className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-sm font-bold">
              А
            </span>
            <div>
              <p className="text-sm leading-relaxed text-white/90">
                «С 78 баллов на пробнике выросла до 132 за четыре месяца подготовки.
                Теперь ЕНТ — не страшно»
              </p>
              <p className="mt-2 text-xs font-semibold text-sky-200">
                Айгерим, 11 класс • Алматы
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <TrendingUp className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">94%</p>
          <p className="mt-1 text-xs text-blue-100/70">сдают на 100+ баллов</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <Users className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">26 000+</p>
          <p className="mt-1 text-xs text-blue-100/70">абитуриентов в проекте</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <ShieldCheck className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">7 000+</p>
          <p className="mt-1 text-xs text-blue-100/70">вопросов ЕНТ в базе</p>
        </div>
      </div>
    </div>
  );
}
