import { Play } from "lucide-react";

export function SessionActionBar({ domains, questions, canStart, onStart }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-slate-800 bg-slate-900 px-6 py-3 text-white shadow-2xl sm:gap-6">
      <p className="text-sm font-semibold">
        SELECTION:{" "}
        <span className="text-white">
          {domains} {domains === 1 ? "Domain" : "Domains"}
        </span>{" "}
        • <span>{questions} Qs</span>
      </p>
      <button
        type="button"
        onClick={onStart}
        disabled={!canStart}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Play className="h-4 w-4" />
        Start Session
      </button>
    </div>
  );
}
