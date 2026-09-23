import { NextResponse } from "next/server";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://unnegotiated-apocalyptically-paulette.ngrok-free.dev"
).replace(/\/+$/, "");

/**
 * Проксирует /api/* на backend: бесплатные ngrok-туннели без заголовка
 * ngrok-skip-browser-warning отдают interstitial вместо ответа API.
 */
export async function proxy(request) {
  const target = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    BACKEND_URL
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

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers();
  responseHeaders.set("content-type", upstream.headers.get("content-type"));

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const config = {
  matcher: "/api/:path*",
};