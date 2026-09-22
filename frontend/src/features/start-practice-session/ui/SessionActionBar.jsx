import { Play } from "lucide-react";

function pluralizeDomains(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "раздел";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "раздела";
  return "разделов";
}

export function SessionActionBar({ domains, questions, canStart, onStart }) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 justify-center">
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-slate-300/80 bg-white/95 px-6 py-2.5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-slate-800">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            ВЫБРАНО: {domains} {pluralizeDomains(domains)} • {questions} вопр.
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-xs font-bold tracking-tight text-white shadow-md transition-all hover:bg-black hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Начать сессию</span>
        </button>
      </div>
    </div>
  );
}
