import { PracticeBrowser } from "@/widgets/practice-browser";

export function PracticePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-40 pt-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Банк вопросов</h1>
        <p className="mt-1 text-sm text-slate-500">
          Выберите темы и запустите персональную тренировочную сессию
        </p>
      </div>

      <PracticeBrowser />
    </div>
  );
}
