# ЕНТdigit

Веб-платформа для подготовки к ЕНТ (Единое национальное тестирование, Казахстан): практика по реальным темам, мгновенная проверка ответов, AI-разбор ошибок и аналитика прогресса.

**🔗 Демо:** [venturehack-chi.vercel.app/question-bank](https://venturehack-chi.vercel.app/question-bank) — можно посмотреть без установки и регистрации.

---

## Описание

### Зачем мы это сделали

Каждый год тысячи казахстанских выпускников готовятся к ЕНТ, где на кону поступление в вуз. Обычно подготовка выглядит так: сборники заданий отдельно, конспекты отдельно, результаты пробников — в голове или в блокноте. Ученик не понимает, **какие именно темы у него проседают**, а на разбор одной ошибки с репетитором уходят деньги и дни.

«ЕНТdigit» возник как ответ на этот разрыв: мы хотели собрать в одном веб-приложении весь цикл подготовки — от выбора темы до честной цифры прогресса.

### Для чего он создан

Продукт решает четыре конкретные проблемы:

- **Нет мгновенной обратной связи.** Мы отвечаем на каждый ответ сразу: верно/неверно, а к ошибке — объяснение «почему».
- **Непонятно, что подтягивать.** Статистика хранится по темам и предметам, а не только «общий процент».
- **Дорого и долго.** AI-наставник разбирает ошибку за секунды и бесплатно, без записи к репетитору.
- **Подготовка на двух языках.** Интерфейс полностью работает на русском и казахском.

### Чем отличается от аналогов

- **AI-разбор ошибки.** По неверному варианту бэкенд генерирует понятное объяснение через Google Gemini (`PATCH /api/questions/{id}/explanation`).
- **Адаптивная практика.** Режим `start/adaptive` сам собирает сессию по самым слабым темам пользователя.
- **Аналитика, а не только счёт.** Отдельная страница считает KPI, покрытие банка заданий и итог последней сессии.
- **Данные, а не заглушки.** Банк заданий — сотни вопросов с вариантами, сложностью и пояснениями (`backend/src/main/resources/data.sql`).
- **Без CORS-болей.** Браузер ходит на same-origin `/api/*`, а Next.js-прокси перекладывает запросы на backend.

### Что уже умеет MVP

- Регистрация и вход, хранение сессии, авто-выход по 401/403.
- Каталог предметов и тем (обязательные/профильные) с количеством заданий.
- Конструктор сессии: темы, сложность, количество вопросов, быстрый старт.
- Прохождение: навигация по вопросам, вердикт, AI-пояснение, отметка «на проверку», завершение сессии.
- Результат сессии и страница «Аналитика успеваемости».
- Дашборд: обратный отсчёт до экзамена и цель по баллам.
- Тёмная/светлая тема, мобильная адаптация, RU/KK.

---

## Стек

| Слой | Технологии |
|---|---|
| Frontend | Next.js 16.3 (App Router), React 19.2, Tailwind CSS 4, lucide-react, JavaScript + JSDoc, Feature-Sliced Design |
| Backend | Java 25 (по `pom.xml`), Spring Boot 4.1, Spring Data JPA, Jakarta Validation, Lombok, Maven |
| БД | PostgreSQL, Hibernate (`ddl-auto=update`), сид `data.sql` |
| AI | Spring AI → Google GenAI (`gemini-1.5-flash`) |
| Документация API | Springdoc OpenAPI 3.1 (Swagger UI) |
| Деплой | Frontend — Vercel (`venturehack-chi.vercel.app`) |
| Качество | ESLint (frontend), `node --test`, smoke-тест Spring Boot |

---

## Установка

### Требования

- **Node.js ≥ 20.9** и npm;
- **JDK 25** (сборка через Maven Wrapper, отдельная установка Maven не нужна);
- **PostgreSQL 14+**, база `ent`;
- Git.

### 1. Клонирование

```bash
git clone git@github.com:theaprilthreatwind/VENTUREHACK.git
cd VENTUREHACK
```

### 2. База данных

Создайте пустую базу — таблицы поднимет Hibernate при старте бэкенда:

```bash
createdb ent
```

Сиды (предметы, темы, вопросы, варианты) применяются автоматически из
`backend/src/main/resources/data.sql`. Скрипт идемпотентный — повторный запуск не создаёт дублей.

> Если у вас PostgreSQL в контейнере, достаточно любого клиента:
> `psql -h localhost -U postgres -c "CREATE DATABASE ent;"`

### 3. Backend

Параметры подключения и ключ AI задайте **через переменные окружения** (не коммитьте секреты в
`application.properties`):

```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/ent"
export SPRING_DATASOURCE_USERNAME="postgres"
export SPRING_DATASOURCE_PASSWORD="<ваш пароль>"
export SPRING_AI_GOOGLE_GENAI_API_KEY="<ваш ключ Gemini>"

cd backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

Backend поднимется на `http://localhost:8080`, автодокументация API —
`http://localhost:8080/swagger-ui/index.html`.

### 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local      # укажите NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```

Приложение откроется на `http://localhost:3000`.

### 5. Хотите просто посмотреть?

Поднимать окружение не обязательно — готовое демо работает здесь:
**[venturehack-chi.vercel.app/question-bank](https://venturehack-chi.vercel.app/question-bank)**.

---

## Использование

### Быстрый старт (сценарий демо)

**Самый быстрый путь:** откройте [демо на Vercel](https://venturehack-chi.vercel.app/question-bank) —
установка не нужна.

**Локально:**

1. Поднимите backend и frontend (см. выше).
2. `/auth` — войдите заранее созданным пользователем или зарегистрируйтесь.
3. `/question-bank` — отметьте темы и сложность, задайте количество вопросов и нажмите **Начать сессию**.
4. Отвечайте на вопросы: сразу виден вердикт, а по ошибке можно нажать **Объяснить ошибку**.
5. Завершите сессию — откроется `/practice/result` с количеством верных и временем.
6. `/analytics` — KPI, покрытие банка заданий и итог последней сессии; `/dashboard` — дедлайн и цель по баллам.

### Основные команды

| Где | Команда | Что делает |
|---|---|---|
| `frontend/` | `npm run dev` | Dev-сервер на :3000 |
| `frontend/` | `npm run build` | Prod-сборка (Turbopack) |
| `frontend/` | `npm run start` | Запуск собранного приложения |
| `frontend/` | `npm run lint` | ESLint |
| `frontend/` | `npm test` | Юнит-тесты (`node --test`) |
| `backend/` | `./mvnw spring-boot:run` | Backend на :8080 |
| `backend/` | `./mvnw test` | Тесты Spring Boot |

Порты по умолчанию: frontend — `3000`, backend — `8080`, PostgreSQL — `5432`.

---

## Разработка

### Структура репозитория

```
VENTUREHACK/
├── frontend/                                  # Next.js + FSD
│   └── src/                                   # app → views → widgets → features → entities → shared
├── backend/                                   # Spring Boot
│   └── src/main/resources/data.sql            # сид: предметы, темы, вопросы, варианты
└── README.md
```

### Архитектура фронтенда

Код разбит по [Feature-Sliced Design](https://feature-sliced.design/). Импорты идут только
вниз по слоям, каждый слой открывает наружу свой `index.js`:

```
app → views → widgets → features → entities → shared
```

Все обращения к API — через `@/shared/api` (`apiService`). Браузер зовёт same-origin `/api/*`,
а `src/proxy.js` перекладывает запросы на backend по `NEXT_PUBLIC_API_URL` и добавляет
заголовок для ngrok. UI-компоненты не знают про `fetch`.

Подробные правила (именование, `"use client"`, состояния загрузки/ошибки, Tailwind-токены) —
в `frontend/AGENTS.md`.

### Документация

- **Swagger UI** — живой контракт backend (`http://localhost:8080/swagger-ui/index.html`);
- `backend/README.md` — сущности БД, запуск и настройка Spring Boot;
- `frontend/AGENTS.md` — правила кода и архитектуры фронтенда;
- `backend/src/main/resources/data.sql` — состав банка заданий.

### Как внести вклад

1. Форкните репозиторий и создайте ветку от `main`:
   `git checkout -b feature/short-name`.
2. Держите **минимальный диф**: не переписывайте работающие компоненты без необходимости.
3. Соблюдайте архитектуру и правила слоёв (см. `frontend/AGENTS.md`).
4. Новые npm/Maven-пакеты — только после обсуждения в issue.
5. Текст интерфейса — русский (и казахский), идентификаторы в коде — английские.
6. Перед PR прогоните `npm run lint && npm run build` (frontend) и `./mvnw test` (backend).
7. Опишите в PR: что изменилось, зачем и как проверить.

### Известные ограничения MVP

Честно фиксируем, что ещё не закрыто:

- пароли пока хранятся без хеширования, токен — простой UUID без проверки на всех эндпоинтах;
- нет миграций (Flyway/Liquibase) — схема управляется `ddl-auto=update`;
- состав сессии хранится в localStorage браузера, истории попыток на бэкенде нет;
- аналитика по темам использует агрегаты, которые пишутся при завершении попытки.

Планы развития и известные баги — в Issues репозитория.

---

## Участники

| Участник | GitHub | Роль |
|---|---|---|
| Бейбарыс | [@theaprilthreatwind](https://github.com/theaprilthreatwind) | Frontend: архитектура FSD, практика, аналитика, API-слой |
| Мирон Найданов | [@LaCalme](https://github.com/LaCalme) | Backend: Spring Boot, JPA, БД, REST-контракты |
| Жангир | [@zhangir729](https://github.com/zhangir729) | Frontend: UI-компоненты, вёрстка, адаптивность |
| Даня | [@nyad984-dot](https://github.com/nyad984-dot) | Frontend/Backend: экраны практики, интеграции |
