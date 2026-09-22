"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CalendarClock } from "lucide-react";
import { Modal } from "@/shared/ui";
import { userProfile } from "@/entities/user";
import { useLocalStorage, setLocalStorageItem } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

const EXAM_DATE_KEY = STORAGE_KEYS.examDate;

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target) - new Date());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function CountdownCard() {
  const examDate = useLocalStorage(EXAM_DATE_KEY, userProfile.examDate);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(examDate));
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(examDate)), 1000);
    return () => clearInterval(timer);
  }, [examDate]);

  const openModal = () => {
    setDraft(examDate.slice(0, 10));
    setOpen(true);
  };

  const saveDate = () => {
    if (!draft) return;
    setLocalStorageItem(EXAM_DATE_KEY, draft);
    setOpen(false);
  };

  const blocks = [
    { label: "ДНЕЙ", value: String(timeLeft.days) },
    { label: "ЧАСОВ", value: pad(timeLeft.hours) },
    { label: "МИНУТ", value: pad(timeLeft.minutes) },
    { label: "СЕКУНД", value: pad(timeLeft.seconds) },
  ];

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <CalendarClock className="h-5 w-5 text-blue-600" />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">Обратный отсчет до экзамена</h2>
          </div>
          <CalendarDays className="hidden h-5 w-5 text-slate-300 sm:block" />
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3">
          {blocks.map((block) => (
            <div
              key={block.label}
              className="flex min-w-0 flex-col items-center rounded-xl bg-slate-100/80 py-5"
            >
              <span className="text-2xl font-extrabold tabular-nums text-slate-400 sm:text-4xl">
                {block.value}
              </span>
              <span className="mt-1 text-[11px] font-semibold tracking-wider text-slate-400">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Целевая дата: {new Date(examDate).toLocaleDateString("ru-RU")}
        </p>

        <button
          type="button"
          onClick={openModal}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Изменить дату
        </button>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Дата экзамена ЕНТ">
        <label htmlFor="exam-date" className="block text-sm font-medium text-slate-700">
          Когда состоится ЕНТ?
        </label>
        <input
          id="exam-date"
          type="date"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
        <p className="mt-2 text-xs text-slate-400">
          Обратный отсчет обновится сразу после сохранения
        </p>
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
            onClick={saveDate}
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