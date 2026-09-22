"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { Modal } from "@/shared/ui";
import { userProfile } from "@/entities/user";
import { useLocalStorage, setLocalStorageItem } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

const TARGET_KEY = STORAGE_KEYS.targetScore;
const MIN_SCORE = 1;
const MAX_SCORE = 140;

export default function GoalCard() {
  const rawTarget = useLocalStorage(TARGET_KEY, String(userProfile.targetScore));
  const parsed = Number.parseInt(rawTarget, 10);
  const target = Number.isNaN(parsed) ? userProfile.targetScore : Math.min(MAX_SCORE, Math.max(MIN_SCORE, parsed));

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const openModal = () => {
    setDraft(String(target));
    setOpen(true);
  };

  const saveGoal = () => {
    const value = Number.parseInt(draft, 10);
    if (Number.isNaN(value)) return;
    setLocalStorageItem(TARGET_KEY, String(Math.min(MAX_SCORE, Math.max(MIN_SCORE, value))));
    setOpen(false);
  };

  return (
    <>
      <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Target className="h-5 w-5 text-emerald-600" />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">Ваша цель по баллам</h2>
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-slate-500">Текущая цель</p>
        <p className="mt-2 text-7xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-8xl">
          {target}
        </p>
        <p className="mt-4 text-sm text-slate-400">Отображается на странице результатов</p>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={openModal}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Изменить
          </button>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Цель по баллам ЕНТ">
        <label htmlFor="target-score" className="block text-sm font-medium text-slate-700">
          Сколько баллов хотите набрать?
        </label>
        <input
          id="target-score"
          type="number"
          min={MIN_SCORE}
          max={MAX_SCORE}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
        <p className="mt-2 text-xs text-slate-400">Максимальный балл ЕНТ — {MAX_SCORE}</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={saveGoal}
            disabled={!draft}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Сохранить
          </button>
        </div>
      </Modal>
    </>
  );
}