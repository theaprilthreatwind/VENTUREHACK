import { Check, Minus } from "lucide-react";

export function CheckboxBox({ state }) {
  if (state === "checked") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
        <Check className="h-3.5 w-3.5 text-white" />
      </span>
    );
  }
  if (state === "partial") {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded border-2 border-blue-600 bg-blue-50 dark:bg-blue-950">
        <Minus className="h-3 w-3 text-blue-600 dark:text-blue-400" />
      </span>
    );
  }
  return (
    <span className="h-5 w-5 rounded border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800" />
  );
}
