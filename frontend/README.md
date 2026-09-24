This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Architecture — Feature-Sliced Design (FSD)

The `src` folder follows [Feature-Sliced Design](https://feature-sliced.design/). Code is split into
layers, top to bottom. A layer may import only from layers **below** it, never above.

| Layer      | Folder          | Responsibility                                                       |
| ---------- | --------------- | -------------------------------------------------------------------- |
| app        | `src/app`       | Next.js App Router (routes, layouts, global styles, metadata).       |
| pages      | `src/views`     | Route-level composition. One slice per page.                         |
| widgets    | `src/widgets`   | Large self-contained UI blocks (app shell, practice browser).        |
| features     | `src/features`  | User interactions that deliver business value (auth, filters, start).|
| entities   | `src/entities`  | Business entities: user, subject, session (data + domain logic).     |
| shared     | `src/shared`    | Framework-agnostic primitives: UI kit, lib, config.                  |

> **Why `views` and not `pages`?**
> The FSD layer is called "pages", but Next.js reserves `src/pages/` for the legacy Pages Router and
> refuses to build when both routers match the same path. This project keeps the App Router in
> `src/app/` and therefore names the layer `src/views/`.

### Slices and segments

Each layer is made of **slices** (a folder per domain area, e.g. `features/auth`, `entities/subject`).
A slice is split into **segments**:

- `ui/` — components and hooks that render
- `model/` — state, hooks, domain logic
- `lib/` — helpers with no React
- `api/` — requests and side effects
- `config/` — constants local to the slice

Every slice exposes a **public API** through an `index.js`. Import from the slice, never from its
internals:

```js
// ✅
import { AuthPage } from "@/views/auth";
import { PracticeBrowser } from "@/widgets/practice-browser";

// ❌
import { LoginForm } from "@/views/auth/ui/LoginForm";
```

### Route files are thin

Files in `src/app` only wire routing to a page slice:

```js
import { PracticePage } from "@/views/practice";

export default function Page() {
  return <PracticePage />;
}
```

### Import direction

```
app → views → widgets → features → entities → shared
```

`src/app/(app)/layout.jsx` renders the shared shell from `@/widgets/sidebar` and `@/widgets/header`;
the root `src/app/layout.jsx` owns `<html>`, `<body>` and `globals.css`.

## Data source — backend

Все запросы идут через `@/shared/api`:

- `shared/api/apiService.js` — `fetch` к backend по `API_BASE_URL` (см. `shared/config/api.js`);
- `shared/api/index.js` — единая точка входа, реэкспортирует `apiService`.

Базовый адрес задаётся переменной `NEXT_PUBLIC_API_URL` (см. `.env.local`, шаблон —
`.env.example`). Next.js проксирует `/api/*` на этот адрес через `src/proxy.js`
(в Next 16 middleware называется proxy), поэтому браузер ходит на same-origin `/api/*`,
CORS не нужен, а токен уходит на backend заголовком `Authorization: Bearer`.

Потребители не знают, откуда пришли данные:

```js
import { getSubjectsOverview, startPractice } from "@/shared/api";

const subjects = await getSubjectsOverview();
const attemptId = await startPractice({ userId, topicIds: [1, 2], questionsCount: 20 });
```

> Mock-реализация (`mockApiService.js`, `mock/fixtures.js`) удалена — данные всегда приходят с
> backend. UI-код не содержит собственного каталога данных: он читает данные только через
> `@/shared/api` (`useSubjectsOverview`, `useCurrentUser` и т.д.).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Feature-Sliced Design](https://feature-sliced.design/) - the architecture used here.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
