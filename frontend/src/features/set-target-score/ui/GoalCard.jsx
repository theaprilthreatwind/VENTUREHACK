"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Modal } from "@/shared/ui";
import { useLocalStorage, setLocalStorageItem } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

const TARGET_KEY = STORAGE_KEYS.targetScore;
const MIN_SCORE = 1;
const MAX_SCORE = 140;

export default function GoalCard() {
  const rawTarget = useLocalStorage(TARGET_KEY, "");
  const parsed = Number.parseInt(rawTarget, 10);
  const target = Number.isNaN(parsed)
    ? null
    : Math.min(MAX_SCORE, Math.max(MIN_SCORE, parsed));

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const openModal = () => {
    setDraft(target === null ? "" : String(target));
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
      <article className="flex min-h-[330px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
            <TrendingUp className="h-5 w-5" />
          </span>
          <h3 className="text-base font-bold text-slate-900">Ваша цель по баллам</h3>
        </div>

        <div className="my-auto py-3 text-center">
          <p className="mb-1 text-xs font-medium text-slate-500">Текущая цель</p>
          <h4 className="text-6xl font-black tracking-tight text-slate-900">
            {target ?? "—"}
          </h4>
          <p className="mt-2 text-xs text-slate-500">
            Хранится локально в вашем браузере.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={openModal}
            className="rounded-xl bg-[#131926] px-7 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800"
          >
            Изменить
          </button>
        </div>
      </article>

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
          onChange={(event) => setDraft(event.target.value)}
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
            className="rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Сохранить
          </button>
        </div>
      </Modal>
    </>
  );
}
