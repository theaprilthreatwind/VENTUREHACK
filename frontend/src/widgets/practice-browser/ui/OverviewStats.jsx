import { Timer } from "lucide-react";
import { userProfile } from "@/entities/user";
import { formatNumberEn } from "@/shared/lib";
import { ProgressRing } from "./ProgressRing";

export function OverviewStats() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <section className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Progress</p>
        <div className="mt-4">
          <ProgressRing value={userProfile.progress} />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500">
          Answered: {userProfile.answered} out of {formatNumberEn(userProfile.totalQuestions)}
        </p>
      </section>

      <section className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Time</p>
        <div className="mt-4 flex items-center gap-2">
          <Timer className="h-6 w-6 text-slate-300" />
          <span className="text-5xl font-extrabold tabular-nums tracking-tight text-slate-900">
            {userProfile.totalTime}
          </span>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500">
          For questions matching selected filters
        </p>
      </section>
    </div>
  );
}
