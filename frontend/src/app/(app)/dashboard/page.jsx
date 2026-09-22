"use client";

import { userProfile, formatNumber } from "@/data/mockData";
import CountdownCard from "@/components/dashboard/CountdownCard";
import GoalCard from "@/components/dashboard/GoalCard";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <CountdownCard />
      <GoalCard />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Детальный прогресс</h2>
          <span className="text-sm font-medium text-slate-500">
            {userProfile.progress}%
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${userProfile.progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Отвечено: {formatNumber(userProfile.answered)} из{" "}
          {formatNumber(userProfile.totalQuestions)} вопросов • Время:{" "}
          {userProfile.totalTime}
        </p>
      </div>
    </div>
  );
}