<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — AI Assistant Rules for the Frontend

> **Scope:** the `frontend/` directory. Backend has its own rules.
> **Priority:** explicit human instruction → this file → assistant default habits. If a rule conflicts with the task, ask the human first; never silently revert it.
> **`frontend/CLAUDE.md` references this file** (`@AGENTS.md`), so the rules are shared by all AI tools.

---

## 1. Tech Stack & Architecture

### 1.1 Stack

| Area | What we use | What this project does NOT have (do not add) |
|---|---|---|
| UI framework | Next.js 16.3 (App Router, `src/app`), React 19.2 | Pages Router, Vue, TypeScript |
| Language | JavaScript (ES2022+) + JSDoc for types | `.ts/.tsx`, `prop-types` |
| State | Local only: `useState`, `useMemo`, `useEffect`, custom hooks, `useLocalStorage` (`useSyncExternalStore`) | Redux, Zustand, MobX, React Query/SWR |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`), theme tokens in `src/app/globals.css` | CSS modules, styled-components, SCSS |
| Icons | `lucide-react` | other icon packs |
| Validation | Hand-written validators (`features/auth/model/validation.js`); server-side — Jakarta Validation | formik, react-hook-form, zod, yup |
| UI kit | `@/shared/ui`: `Modal`, `Field`, `TextInput`, `Select` | MUI, Ant, copied shadcn |
| HTTP | `@/shared/api` (`apiService` / `mockApiService`) | axios, direct `fetch` in components |
| Linting | ESLint 9 + `eslint-config-next/core-web-vitals`; `npm run lint` | Prettier (not set up yet) |

### 1.2 Architecture: Feature-Sliced Design (FSD)

Layers and import direction — downward only, through a slice's public API:

```
src/app → src/views → src/widgets → src/features → src/entities → src/shared
```

**Hard rules:**

- A slice may import only from lower layers. A slice must not import another slice on the same layer directly — only through a shared lower layer.
- Import only from a slice's public API: `@/features/auth`, `@/entities/subject`. Deep imports (`@/features/auth/ui/LoginForm`) are forbidden. Exception: relative imports inside the slice itself (`../model/...`, `./TopicRow`).
- `src/app` — routing only: `page.jsx` / `layout.jsx` are 3–10 lines and re-export a view. No markup, no logic, no data fetching.
- `src/views` — page-level composition of widgets/features. No business logic, no API calls.
- `widgets` — large self-contained UI blocks (sidebar, header, practice browser).
- `features` — user scenarios (auth, starting a session, target score).
- `entities` — domain entities and their data (`user`, `subject`, `session`).
- `shared` — domain-agnostic foundation (UI primitives, API client, config, lib).
- A slice = a folder inside a layer; segments: `ui/` (rendering), `model/` (hooks, state, logic), `api/` (feature-specific requests), `lib/`, `config/`.
- Every slice must have `index.js` — its public API.

### 1.3 Where Things Live

| Artifact | Location | Forbidden |
|---|---|---|
| Reusable UI primitive (button, input, modal) | `src/shared/ui/<Name>/` + `index.js` | duplicating it inside features |
| Domain component | `features/<slice>/ui/`, `widgets/<slice>/ui/`, `entities/<slice>/ui/` | placing it in `app/` or `views/` |
| Hook with state and logic | `model/` of its slice; shared one — `shared/lib/hooks/` | writing logic directly in JSX |
| API request | `src/shared/api/apiService.js` + export from `src/shared/api/index.js`; feature-specific — `features/<slice>/api/` | `fetch`/`axios` inside components or hooks |
| Constants / filter options | `config/` of the slice or `shared/config/` | hardcoding domain data in UI |
| Mock data | `src/shared/api/mock/fixtures.js` + `mockApiService.js` | fake data baked into components |

### 1.4 Data: Mock-First and the Contract

- Every request goes through `@/shared/api`; the UI never knows whether it is mock or real backend.
- A new endpoint = a function in `apiService.js` **and** a matching one in `mockApiService.js` **and** an export from `shared/api/index.js`. Signatures must match exactly.
- Extend the contract and the mock first, then the UI. The source of truth is `docs/openapi.yaml` (backend); discrepancies are a backend task, not a local workaround.
- Switch modes via `NEXT_PUBLIC_USE_MOCKS` (see 1.5).

### 1.5 Commands

| Command | Purpose |
|---|---|
| `npm run dev:mock` | Development against mocks (default mode for FE) |
| `npm run dev` | Development against the real backend (forces `NEXT_PUBLIC_USE_MOCKS=false`) |
| `npm run lint` | ESLint |
| `npm run build` | Production build (Turbopack) |

---

## 2. Code Rules

### 2.1 Naming

| Entity | Style | Example |
|---|---|---|
| Component, component file | PascalCase | `PracticeBrowser.jsx` → `export function PracticeBrowser` |
| Hook, hook file | `use` + camelCase | `usePracticeBrowser.js` → `usePracticeBrowser` |
| Function / variable | camelCase | `countQuestions`, `selectedTopics` |
| Booleans | `is/has/can/should` | `isOpen`, `canStart`, `hasError` |
| Handler inside a component | `handle*` | `handleSubmit`, `handleToggleTopic` |
| Callback prop | `on*` | `onStart`, `onChange` |
| Module constant | UPPER_SNAKE_CASE | `MAX_SCORE`, `STORAGE_KEYS` |
| JSDoc type | PascalCase | `@typedef {Object} SubjectOverview` |

- One component/hook per file; the file name equals the entity name.
- **Project language convention:** identifiers are English; UI copy, comments and JSDoc are Russian (matching the existing codebase).

### 2.2 Formatting & Syntax

- Components and hooks are declarations with **named exports**: `export function Name() {}`. `default export` is allowed only where Next.js requires it: `page.jsx`, `layout.jsx`, `error.jsx`, `loading.jsx`, `not-found.jsx`, `route.js`. Existing files that already use `default export` (`Header`, `Sidebar`, `Modal`) must not be rewritten just for style.
- Handlers and callbacks inside a component are arrow functions: `const handleSubmit = async (event) => { ... }`.
- Helper functions outside a component are `function` declarations.
- No classes, `React.FC`, or `forwardRef` (React 19: `ref` is a regular prop).
- 2-space indent, double quotes, semicolons, trailing commas. JSX files are `.jsx`; pure modules are `.js`.
- Prefer early returns over nested `if`s. No `console.log` in shipped code.
- Async data always has states: `isLoading`, `error`, empty response.

### 2.3 Imports

Strict group order, one blank line between groups:

1. React and Next.js: `react`, `next/navigation`, `next/link`.
2. External libraries: `lucide-react`.
3. Project absolute aliases: `@/shared/...`, `@/entities/...`, `@/features/...`.
4. Relative imports within the current slice: `../model/useX`, `./TopicRow`.

```js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

import { startPractice } from "@/shared/api";
import { useCurrentUser } from "@/entities/user";
import { usePracticeBrowser } from "../model/usePracticeBrowser";
import { FilterPanel } from "./FilterPanel";
```

- `"use client"` goes on the first line, strictly before imports, and **only** where hooks, events or browser APIs are needed. Do not spread the directive across a whole layout — put it on the interactive leaf.
- Never import internals of other slices, `node_modules` paths, or `.next/`.

### 2.4 React 19 & Next.js 16 — Required Patterns

These rules override the assistant's training data:

- `params` and `searchParams` are **Promises**. In a Server Component: `const { attemptId } = await params`. In a Client Component: `const { attemptId } = use(params)` (`use` from `react`).
- Route protection/redirects live in `src/proxy.js` (in Next 16, middleware was renamed to proxy): `export function proxy(request)`, `nodejs` runtime only, no `edge`. For simple redirects consider `redirects` in `next.config` first.
- Route errors use `error.jsx` in the segment (a Client Component) with `{ error, retry }` props; recover with `retry()`, not `reset`. Root level — `global-error.jsx`; 404 — `not-found.jsx`.
- Routing: only `next/navigation` (`useRouter`, `usePathname`, `redirect`). No `next/router`, `getServerSideProps`, `getStaticProps`.
- Navigation: `<Link href>` from `next/link`.
- `fetch` is not cached by default — do not rely on the old behavior.
- Turbopack is the default bundler; do not add a custom webpack config.
- Server Actions (`"use server"`) are not used in this project — do not introduce them without an explicit request.

### 2.5 Styling

- Tailwind utilities in `className` only; conditional classes via template strings, as in existing components.
- Colors come from the project palette (`slate`, `blue`, `#131926`, `app-*` tokens). Do not introduce new hex colors.
- Class order: layout → spacing → size → typography → color → states (`hover:`, `disabled:`).
- Radii `rounded-xl/2xl/3xl`; card pattern `rounded-* border border-slate-200 bg-white shadow-sm` (reuse the patterns from `SubjectCard`, `CountdownCard`).
- Responsiveness is mandatory: mobile-first, verify at `sm`/`lg`.

---

## 3. AI Hard Rules (Do's and Don'ts)

### 3.1 FORBIDDEN

1. **Rewriting working components from scratch for a minor edit.** Make the minimal diff: keep props, structure, styles and behavior. A full replacement is allowed only on an explicit human request.
2. **Installing/updating npm packages** (`npm install`, editing `package.json`, importing an unfamiliar library) without an explicit human request. No library — solve it with React/Tailwind or ask.
3. **Changing versions of Next.js/React/ESLint/Tailwind or their configs** (`next.config.mjs`, `jsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`) without an explicit request.
4. **Making HTTP requests directly** (`fetch`, `XMLHttpRequest`, axios) in components or hooks — only via `@/shared/api`.
5. **Hardcoding domain data** (subjects, topics, questions, users) in the UI — only API or mock fixtures.
6. **Breaking a slice's public API**: removing/renaming `index.js` exports or changing hook signatures/component props without approval.
7. **Adding TypeScript, CSS modules, styled-components, global state managers, or GraphQL.**
8. **Introducing new global styles** in `globals.css` without necessity — fine-grained Tailwind utilities are preferred.
9. **Leaving commented-out code or `console.log`** in shipped changes.
10. **Editing `node_modules/`, `.next/`, or `package-lock.json` by hand.**

### 3.2 REQUIRED

1. **Use existing UI primitives**: modal — `Modal` from `@/shared/ui`, fields — `Field` + `TextInput`, select — `Select`. Create a new shared primitive only when no analogue exists, and place it in `src/shared/ui/<Name>/`.
2. **Error handling for every asynchronous operation:**
   - `try/catch/finally` in hooks and handlers; the `error` state is returned to the caller;
   - the user sees a clear Russian message (`role="alert"`), never a stack trace;
   - route-level errors — `error.jsx` with `retry()`, 404 — `not-found.jsx`;
   - forms — the existing pattern: local validation + server error next to the form (see `AuthPage`).
   - Toasts do not exist in this project: do **not** add a toast library; use inline messages. If a shared notification component appears, use it.
3. **Loading/error/empty states** for every request or list (reference: `PracticeBrowser`, `useSubjectsOverview`).
4. **Respect FSD import direction** and slice public APIs.
5. **`"use client"` deliberately**, only on interactive components.
6. **Accessibility**: `aria-label` on icon-only buttons, `htmlFor` on labels, `aria-invalid` on fields with errors, keep focus styles.
7. **Run `npm run lint`** before finishing; do not suppress warnings without a reason.
8. **Consistency with existing code**: before editing, look at neighboring files of the same slice and follow their pattern.
9. **Russian UI copy** and error messages; English identifiers.

### 3.3 Checklist Before Finishing a Task

- [ ] Minimal diff; working code was not rewritten.
- [ ] No new dependencies.
- [ ] Imports are grouped and respect FSD layers; no deep imports.
- [ ] Loading/error/empty states exist; errors are handled and shown to the user.
- [ ] Mobile layout is intact; accessibility preserved.
- [ ] `npm run lint` passes.
- [ ] Verified against mocks (`npm run dev:mock`); against the real API too, if available.

---

## 4. Reference Component (Gold Standard)

Example — the attempt result feature. Slice structure:

```
src/features/session-result/
├── index.js                      # slice public API
├── model/
│   └── useSessionResult.js       # loading, states, errors
└── ui/
    └── SessionResultCard.jsx     # rendering, styles, accessibility
```

### 4.1 `model/useSessionResult.js`

```js
"use client";

import { useCallback, useEffect, useState } from "react";

import { getPracticeResult } from "@/shared/api";

/**
 * Загружает итог попытки по её идентификатору.
 *
 * @param {number|string} attemptId
 * @returns {{
 *   result: { totalQuestions: number, correctAnswers: number, startedAt: string, finishedAt: string } | null,
 *   isLoading: boolean,
 *   error: string,
 *   reload: () => void,
 * }}
 */
export function useSessionResult(attemptId) {
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!attemptId) {
      setResult(null);
      setError("Не передан идентификатор попытки");
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getPracticeResult(attemptId, { signal: controller.signal });
        setResult(data);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setResult(null);
        setError(requestError.message ?? "Не удалось загрузить результат");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [attemptId, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  return { result, isLoading, error, reload };
}
```

### 4.2 `ui/SessionResultCard.jsx`

```jsx
"use client";

import { AlertCircle, CheckCircle2, Loader2, RotateCcw, Target } from "lucide-react";

import { formatNumber } from "@/shared/lib";
import { useSessionResult } from "../model/useSessionResult";

/**
 * Карточка итогов попытки: загрузка, ошибка, пустой ответ, результат.
 *
 * @param {{
 *   attemptId: number|string,
 *   onRestart?: () => void,
 * }} props
 */
export function SessionResultCard({ attemptId, onRestart }) {
  const { result, isLoading, error, reload } = useSessionResult(attemptId);

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Загружаем результат…
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm"
      >
        <AlertCircle className="mx-auto h-8 w-8 text-red-500" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-red-700">{error}</p>
        <button
          type="button"
          onClick={reload}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        Результат пока недоступен.
      </div>
    );
  }

  const percent =
    result.totalQuestions > 0
      ? Math.round((result.correctAnswers / result.totalQuestions) * 100)
      : 0;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Target className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-base font-bold text-slate-900">Результат сессии</h3>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#f8fafc] p-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Вопросов
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900">
            {formatNumber(result.totalQuestions)}
          </p>
        </div>
        <div className="rounded-2xl bg-[#f8fafc] p-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Верно
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-3xl font-black text-emerald-600">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            {formatNumber(result.correctAnswers)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Успешность: <span className="font-bold text-slate-900">{percent}%</span>
      </p>

      <p className="mt-2 text-center text-xs text-slate-400">
        {new Date(result.startedAt).toLocaleString("ru-RU")} —{" "}
        {new Date(result.finishedAt).toLocaleString("ru-RU")}
      </p>

      {onRestart && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl bg-[#131926] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Пройти ещё раз
          </button>
        </div>
      )}
    </article>
  );
}
```

### 4.3 `index.js`

```js
export { SessionResultCard } from "./ui/SessionResultCard";
```

### 4.4 Why This Is the Gold Standard

- **FSD:** `model/` owns data and state, `ui/` owns rendering; the public API is a single export from `index.js`.
- **Data flows only through `@/shared/api`** — the component knows nothing about `fetch` or mocks.
- **All four states covered:** loading, error (with retry), empty, success.
- **Human-readable error handling**: a clear message, `role="alert"` / `role="status"`, and a retry action.
- **`AbortController`** cancels the request on unmount — no state updates after death.
- **Project style:** named exports, JSDoc typing, arrow handlers, import order, Tailwind tokens, `aria-*` attributes.

> `getPracticeResult` is an example of a new contract function: while it does not exist in `apiService.js`, add it to `apiService.js` and `mockApiService.js` at the same time (see 1.4), then use it in the UI.
