import { NextResponse } from "next/server";

/**
 * Проксирует /api/* на backend.
 *
 * Два зачем:
 * 1. Бесплатные ngrok-туннели без заголовка `ngrok-skip-browser-warning`
 *    отдают interstitial вместо ответа API.
 * 2. Same-origin: браузер не уходит на сторонний домен, CORS не нужен.
 *
 * Адрес backend задаётся ТОЛЬКО через `NEXT_PUBLIC_API_URL` — молчаливого
 * fallback на dev-туннель нет, иначе прод-сборка без env утечёт данные
 * на чужой сервер. Если переменная не задана, возвращаем понятную 500.
 */
function getBackendUrl() {
  const value = process.env.NEXT_PUBLIC_API_URL;
  return value ? value.replace(/\/+$/, "") : "";
}

export async function proxy(request) {
  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    return NextResponse.json(
      {
        error: "Backend не настроен",
        description:
          "Не задана переменная окружения NEXT_PUBLIC_API_URL. Укажите адрес backend в .env.local.",
      },
      { status: 500 }
    );
  }

  const target = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    backendUrl
  );

  const headers = new Headers();
  for (const name of [
    "content-type",
    "accept",
    "accept-language",
    "authorization",
    "origin",
    "content-encoding",
  ]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("ngrok-skip-browser-warning", "true");

  const init = {
    method: request.method,
    headers,
    cache: "no-store",
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch {
    return NextResponse.json(
      {
        error: "Backend недоступен",
        description: `Не удалось выполнить запрос ${request.method} ${request.nextUrl.pathname}.`,
      },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  responseHeaders.set(
    "content-type",
    upstream.headers.get("content-type") ?? "application/json"
  );
  // Ответы API не кэшируем: там персональные данные пользователя.
  responseHeaders.set("Cache-Control", "no-store");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const config = {
  matcher: "/api/:path*",
};
