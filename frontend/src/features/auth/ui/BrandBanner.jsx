import { Zap } from "lucide-react";

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
        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-5xl">
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
      </div>
    </div>
  );
}
