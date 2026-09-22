import { userProfile } from "@/entities/user";
import { formatNumber } from "@/shared/lib";

export function OverviewStats() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ПРОГРЕСС
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-950">
              {userProfile.progress}
            </span>
            <span className="text-sm font-semibold text-slate-400">%</span>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Отвечено: {formatNumber(userProfile.answered)} из{" "}
          {formatNumber(userProfile.totalQuestions)}
        </p>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ВСЕГО ВРЕМЕНИ
          </span>
          <div className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            {userProfile.totalTime}
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          По вопросам, соответствующим фильтрам
        </p>
      </div>
    </section>
  );
}
