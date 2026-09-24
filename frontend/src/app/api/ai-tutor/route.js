import { NextResponse } from "next/server";

/**
 * Route Handler AI-Тьютора ЕНТ.
 *
 * Проксирует запросы к Google Gemini API (`gemini-2.5-flash`) и возвращает
 * строгий JSON. Ключ читается из `process.env.GEMINI_API_KEY` (см. .env.local).
 *
 * Режимы (action в теле POST):
 *  - "generate_daily_plan"      → построить дневной план из 3 тем
 *  - "generate_practice_and_explain" → сгенерировать мини-тест ИЛИ разобрать
 *                                      ошибки по переданным ответам.
 */

const MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM = {
  dailyPlan: `
Ты — персональный AI-агент для подготовки абитуриентов к сдаче ЕНТ в Казахстане.
Проанализируй историю ошибок пользователя (слабые темы) и его достижения
(выполненные темы) и сгенерируй дневной план: 3 наиболее важные темы на сегодня.

Верни СТРОГО валидный JSON-массив без markdown, без тройных кавычек, без пояснений:
[{
  "id": "t1",
  "subject": "История Казахстана",
  "topic": "Золотая Орда",
  "reason": "Частые ошибки (40% верно)",
  "priority": "high"
}]

Правила:
- Ровно 3 объекта.
- Приоритет "high" — если по теме были недавние ошибки; "medium" — если тема на повторение.
- reason — короткая и конкретная причина рекомендации на русском.
- Не включай темы, которые пользователь уже выполнил (completedTopics).
- Учитывай failedTopics и выводи их в первую очередь.`,
  practice: `
Ты — составитель тестовых заданий формата ЕНТ (Казахстан).
Сгенерируй мини-тест из 3 вопросов по указанной теме. Вопросы проверяют
понимание, а не зубрёжку. Язык вопросов — русский.

Верни СТРОГО валидный JSON без markdown, без тройных кавычек:
{
  "questions": [
    {
      "id": "q1",
      "text": "Текст вопроса",
      "options": ["вариант А", "вариант Б", "вариант В", "вариант Г"],
      "correctIndex": 0,
      "explanation": "Краткое пояснение правильного ответа"
    }
  ]
}

Правила:
- Ровно 3 вопроса, у каждого ровно 4 варианта ответа.
- correctIndex — индекс правильного варианта от 0 до 3.
- explanation — короткое пояснение, почему ответ верный.`,
  analysis: `
Ты — наставник по подготовке к ЕНТ. Пользователь только что прошёл мини-тест
и допустил ошибки в части вопросов. Разбери каждый из этих вопросов подробно.

Верни СТРОГО валидный JSON-массив без markdown, без тройных кавычек:
[{
  "questionId": "q1",
  "correctIndex": 2,
  "explanation": "Почему правильный ответ верный, а выбранный пользователем — нет",
  "stepByStep": "Пошаговое решение/разбор вопроса",
  "tip": "Конкретный совет, как избежать этой ошибки на ЕНТ"
}]

Правила:
- Для каждого вопроса объясни ТАКЖЕ, почему ответ, выбранный пользователем, неверен.
- Казахстанская специфика: где уместно, ссылайся на ЕНТ (формат вопросов, распределение баллов).
- stepByStep — последовательность действий или логика рассуждения.
- tip — короткий практический совет.`,
};

/* -------------------------------------------------------------------------- */
/*                                   Utils                                    */
/* -------------------------------------------------------------------------- */

/** Достаёт текстовый кусок из ответа Gemini. */
function extractText(payload) {
  return (
    payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text ?? "")
      .join("") ?? ""
  );
}

/** Снимает markdown-обёртку и находит первый JSON-примитив (объект/массив). */
function parseJson(raw) {
  const text = String(raw ?? "")
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch {
    const objectMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function callGemini(systemInstruction, userPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY не задан. Добавьте ключ в frontend/.env.local и перезапустите dev-сервер."
    );
  }

  let response;
  try {
    response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    });
  } catch (cause) {
    throw new Error(`Не удалось подключиться к Gemini API: ${cause.message}`);
  }

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(
      `Gemini API вернул статус ${response.status}${details ? `: ${details.slice(0, 200)}` : ""}`
    );
  }

  const payload = await response.json();
  const data = parseJson(extractText(payload));
  if (data === null) {
    throw new Error("Gemini вернул невалидный JSON. Попробуйте ещё раз.");
  }
  return data;
}

const asArray = (value) => (Array.isArray(value) ? value : []);

function toPlanItem(item, index) {
  return {
    id: String(item?.id ?? item?.topic ?? `t${index + 1}`),
    subject: String(item?.subject ?? "").trim(),
    topic: String(item?.topic ?? "").trim(),
    reason: String(item?.reason ?? "").trim() || "Рекомендовано AI-аналитикой",
    priority: /high|высок/i.test(String(item?.priority ?? "")) ? "high" : "medium",
  };
}

function toQuestion(item, index) {
  const options = asArray(item?.options)
    .map((opt) => String(opt ?? "").trim())
    .filter(Boolean);
  const correctIndex = Number(item?.correctIndex);
  return {
    id: String(item?.id ?? `q${index + 1}`),
    text: String(item?.text ?? "").trim(),
    options: options.length >= 4 ? options.slice(0, 4) : null,
    correctIndex: Number.isInteger(correctIndex) ? correctIndex : -1,
    explanation: String(item?.explanation ?? "").trim(),
  };
}

function toAssessment(item) {
  return {
    questionId: String(item?.questionId ?? ""),
    correctIndex: Number(item?.correctIndex ?? -1),
    explanation: String(item?.explanation ?? "").trim(),
    stepByStep: String(item?.stepByStep ?? "").trim(),
    tip: String(item?.tip ?? "").trim(),
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Modes                                    */
/* -------------------------------------------------------------------------- */

async function generateDailyPlan(body) {
  const failedTopics = asArray(body.failedTopics).map(String).filter(Boolean);
  const completedTopics = asArray(body.completedTopics).map(String).filter(Boolean);

  const userPrompt = [
    `История ошибок пользователя (слабые темы): ${
      failedTopics.length ? failedTopics.join("; ") : "нет данных — предложи базовые темы для старта"
    }`,
    `Уже выполненные темы (не повторять): ${
      completedTopics.length ? completedTopics.join("; ") : "нет"
    }`,
    `Целевой балл на ЕНТ: ${body.targetScore ?? "не задан"}`,
    `Дата экзамена: ${body.examDate ?? "не задана"}`,
    "Сгенерируй план из 3 тем на сегодня.",
  ].join("\n");

  const raw = await callGemini(SYSTEM.dailyPlan, userPrompt);
  const items = asArray(raw?.topics ?? raw)
    .map(toPlanItem)
    .filter((item) => item.topic && item.subject)
    .slice(0, 3);

  if (items.length === 0) {
    throw new Error("Gemini не сгенерировал темы. Попробуйте ещё раз.");
  }
  return items;
}

async function generatePractice(body) {
  const subject = String(body.subject ?? "").trim();
  const topic = String(body.topic ?? "").trim();

  const raw = await callGemini(SYSTEM.practice, [
    `Предмет: ${subject || "не указан"}`,
    `Тема: ${topic || "не указана"}`,
    "Сгенерируй мини-тест из 3 вопросов.",
  ].join("\n"));

  const questions = asArray(raw?.questions ?? raw)
    .map(toQuestion)
    .filter((q) => q.text && Array.isArray(q.options) && q.correctIndex >= 0)
    .slice(0, 3);

  if (questions.length === 0) {
    throw new Error("Gemini не сгенерировал вопросы. Попробуйте ещё раз.");
  }
  return { questions };
}

async function explainAnswers(body) {
  const questions = asArray(body.questions);
  const wrongQuestions = asArray(body.wrongQuestions).filter(
    (entry) => entry && entry.question
  );
  const score = Number(body.score ?? 0);

  if (wrongQuestions.length === 0) {
    return {
      assessments: [],
      summary: "Все ответы верные. Отличная работа!",
    };
  }

  const context = wrongQuestions
    .map(
      (entry, index) =>
        `Вопрос ${index + 1} (id: ${entry.question?.id}):\n` +
        `Текст: ${entry.question?.text}\n` +
        `Варианты: ${(entry.question?.options ?? []).join(" | ")}\n` +
        `Правильный ответ: вариант #${Number(entry.question?.correctIndex) + 1}\n` +
        `Ответ пользователя: вариант #${Number(entry.userAnswerIndex) + 1}`
    )
    .join("\n\n");

  const userPrompt = [
    `Тема: ${body.topic ?? ""}`,
    `Результат мини-теста: ${score} из ${questions.length}.\n`,
    "Вопросы, в которых были ошибки:",
    context,
  ].join("\n");

  const raw = await callGemini(SYSTEM.analysis, userPrompt);
  const assessments = asArray(raw)
    .map(toAssessment)
    .filter((item) => item.questionId);

  return { assessments };
}

/* -------------------------------------------------------------------------- */
/*                                   Handler                                  */
/* -------------------------------------------------------------------------- */

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректное JSON-тело запроса." },
      { status: 400 }
    );
  }

  const action = String(body?.action ?? "");

  try {
    if (action === "generate_daily_plan") {
      return NextResponse.json({ topics: await generateDailyPlan(body) });
    }

    if (action === "generate_practice_and_explain") {
      if (body.wrongQuestions) {
        return NextResponse.json(await explainAnswers(body));
      }
      return NextResponse.json(await generatePractice(body));
    }

    return NextResponse.json(
      { error: `Неизвестное действие: ${action || "(пусто)"}.` },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err?.message ?? "Внутренняя ошибка AI-тьютора." },
      { status: 500 }
    );
  }
}