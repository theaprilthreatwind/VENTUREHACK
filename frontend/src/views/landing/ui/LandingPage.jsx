export function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans antialiased min-h-screen flex selection:bg-slate-900 selection:text-white">
      {/* BEGIN: Sidebar */}
      <aside
        className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30"
        data-purpose="main-sidebar"
      >
        {/* Sidebar Top Area */}
        <div className="p-5 pb-2">
          {/* Brand & Collapse Trigger */}
          <div className="flex items-center justify-between mb-8 px-1">
            <span className="text-xl font-black italic tracking-tight text-slate-900">ЕНТdigit</span>
            <button
              aria-label="Свернуть меню"
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="lucide lucide-panel-left-close w-5 h-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
                <path d="m16 15-3-3 3-3" />
              </svg>
            </button>
          </div>
          {/* Menu Navigation */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3">МЕНЮ</span>
              <nav className="mt-2 space-y-1">
                {/* Home */}
                <a
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all text-sm group"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-home w-4 h-4 text-slate-500 group-hover:text-slate-800"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  <span>Главная</span>
                </a>
                {/* Practice (Active item) */}
                <a
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold bg-[#111827] text-white shadow-sm text-sm"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-pencil w-4 h-4 text-white"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  <span>Практика</span>
                </a>
                {/* Question Bank */}
                <a
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all text-sm group"
                  href="#"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="lucide lucide-book-open w-4 h-4 text-slate-500 group-hover:text-slate-800"
                    >
                      <path d="M12 5v16" />
                      <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
                    </svg>
                    <span>Банк вопросов</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Бесплатно
                  </span>
                </a>
                {/* Study Plan */}
                <a
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all text-sm group"
                  href="#"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="lucide lucide-lightbulb w-4 h-4 text-slate-500 group-hover:text-slate-800"
                    >
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </svg>
                    <span>План подготовки</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    AI
                  </span>
                </a>
              </nav>
            </div>
            {/* Daily Streak Widget */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm" data-purpose="streak-card">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-flame w-4 h-4 text-slate-800"
                  >
                    <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                  </svg>
                  <span className="text-xs font-bold text-slate-800">Ежедневная серия</span>
                </div>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide">
                  АКТИВНО
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                <span>1 день</span>
                <span className="text-slate-400 font-normal">→ 3</span>
              </div>
              {/* Progress track */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2.5 overflow-hidden">
                <div className="bg-slate-900 h-1.5 rounded-full w-1/3" />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-500 mb-3.5">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  Активен сегодня <span className="text-emerald-600">✓</span>
                </span>
                <span>Еще 2 дня</span>
              </div>
              <button className="w-full py-2 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors shadow-sm">
                Перейти на Pro
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Bottom Navigation */}
        <div className="p-5 pt-0 space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition-colors"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="lucide lucide-bar-chart w-4 h-4 text-slate-400"
            >
              <path d="M5 21v-6" />
              <path d="M12 21V9" />
              <path d="M19 21V3" />
            </svg>
            <span>Аналитика успеваемости</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition-colors"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="lucide lucide-life-buoy w-4 h-4 text-slate-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="m9.17 14.83-4.24 4.24" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <span>Поддержка</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition-colors"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="lucide lucide-settings w-4 h-4 text-slate-400"
            >
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Настройки</span>
          </a>
        </div>
      </aside>
      {/* END: Sidebar */}

      {/* BEGIN: MainContent */}
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar relative pb-28">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Top Header & Source Mode Toggle */}
          <section className="mb-8" data-purpose="page-header">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Создать сессию</h1>
                <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Настройте фильтры, чтобы создать персонализированный тест. Отмечайте темы и навыки или нажимайте кнопку
                  запуска для быстрых тренировок.
                </p>
              </div>
              {/* Mode Toggle Segmented Pill */}
            </div>
          </section>

          {/* Statistics Row (Progress & Time) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10" data-purpose="overview-stats">
            {/* Progress Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">ПРОГРЕСС</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-950">10</span>
                  <span className="text-sm font-semibold text-slate-400">%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500">Отвечено: 388 из 3 770</p>
              </div>
            </div>
            {/* Total Time Spent Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">ВСЕГО ВРЕМЕНИ</span>
                <div className="mt-2 text-3xl font-black text-slate-950 tracking-tight">528:14</div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-slate-500">По вопросам, соответствующим фильтрам</p>
              </div>
            </div>
          </section>

          {/* General Filters Section */}
          <section className="mb-10 w-full" data-purpose="general-filters">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Общие фильтры</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Настройте фильтры, затем выберите нужные предметы, разделы и навыки.
                </p>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl shadow-sm transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="lucide lucide-rotate-ccw w-3.5 h-3.5 text-slate-500"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Сбросить фильтры</span>
              </button>
            </div>
            {/* 4-Column Filter Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold mb-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-bar-chart-2 w-3.5 h-3.5 text-slate-500"
                  >
                    <path d="M5 21v-6" />
                    <path d="M12 21V3" />
                    <path d="M19 21V9" />
                  </svg>
                  <span>СЛОЖНОСТЬ</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button className="w-full py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Легко
                  </button>
                  <button className="w-full py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Средне
                  </button>
                  <button className="w-full py-2 px-3 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Сложно
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold mb-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-check-check w-3.5 h-3.5 text-slate-500"
                  >
                    <path d="M18 6 7 17l-5-5" />
                    <path d="m22 10-7.5 7.5L13 16" />
                  </svg>
                  <span>СТАТУС ОТВЕТА</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button className="w-full py-2 px-2 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Верно
                  </button>
                  <button className="w-full py-2 px-2 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Неверно
                  </button>
                  <button className="w-full py-2 px-2 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Без ответа
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold mb-3.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="lucide lucide-flag w-3.5 h-3.5 text-slate-500"
                  >
                    <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
                  </svg>
                  <span>НА ПОВТОРЕНИЕ</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="w-full py-2 px-4 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Да
                  </button>
                  <button className="w-full py-2 px-4 text-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Нет
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Browse by Subject Section */}
          <section className="mb-16" data-purpose="browse-by-subject">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Обзор по предметам</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Разверните предмет для выбора разделов и навыков. Отметьте нужные элементы и нажмите «Начать сессию»
                внизу, либо запустите отдельную тему сразу.
              </p>
            </div>
            <div className="space-y-8">
              {/* Обязательные предметы */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Обязательные предметы
                    </h3>
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      3 предмета
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Сдаются всеми абитуриентами</span>
                </div>
                <div className="space-y-4">
                  {/* История Казахстана (развёрнут) */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-book-open w-4 h-4"
                          >
                            <path d="M12 5v16" />
                            <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">История Казахстана</h3>
                          <p className="text-xs text-slate-400">1 450 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Свернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-up w-4 h-4"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по Истории Казахстана"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="bg-slate-50/60 p-3 space-y-2">
                      {/* Древний Казахстан (развёрнут) */}
                      <div className="border border-slate-200/90 rounded-xl bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-layout-grid w-4 h-4"
                              >
                                <rect height="7" rx="1" width="7" x="3" y="3" />
                                <rect height="7" rx="1" width="7" x="14" y="3" />
                                <rect height="7" rx="1" width="7" x="14" y="14" />
                                <rect height="7" rx="1" width="7" x="3" y="14" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">Древний Казахстан</h4>
                              <p className="text-[11px] text-slate-400">450 вопросов</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              aria-label="Свернуть раздел"
                              className="p-1 text-slate-400 hover:text-slate-600"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-chevron-up w-4 h-4"
                              >
                                <path d="m18 15-6-6-6 6" />
                              </svg>
                            </button>
                            <label className="cursor-pointer flex items-center">
                              <input
                                defaultChecked
                                className="w-4 h-4 rounded text-slate-950 focus:ring-0 focus:ring-offset-0 border-slate-300"
                                type="checkbox"
                              />
                            </label>
                            <button
                              aria-label="Начать сессию по Древнему Казахстану"
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-play w-3 h-3 fill-current"
                              >
                                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="border-t border-slate-100 bg-slate-50/40 divide-y divide-slate-100 text-xs">
                          <div className="flex items-center justify-between px-6 py-2.5 hover:bg-white transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-700 font-medium">
                                Эпоха камня и бронзы на территории Казахстана
                              </span>
                              <span className="text-[10px] text-slate-400">150 вопросов</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                defaultChecked
                                className="w-3.5 h-3.5 rounded text-slate-900 border-slate-300 focus:ring-0"
                                type="checkbox"
                              />
                              <button className="p-1 text-slate-400 hover:text-slate-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  className="lucide lucide-play w-3 h-3 fill-current"
                                >
                                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-6 py-2.5 hover:bg-white transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-700 font-medium">
                                Раннежелезный век и сакские племена
                              </span>
                              <span className="text-[10px] text-slate-400">160 вопросов</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                defaultChecked
                                className="w-3.5 h-3.5 rounded text-slate-900 border-slate-300 focus:ring-0"
                                type="checkbox"
                              />
                              <button className="p-1 text-slate-400 hover:text-slate-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  className="lucide lucide-play w-3 h-3 fill-current"
                                >
                                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-6 py-2.5 hover:bg-white transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-700 font-medium">
                                Усуни, кангюи и гуннское объединение
                              </span>
                              <span className="text-[10px] text-slate-400">140 вопросов</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                defaultChecked
                                className="w-3.5 h-3.5 rounded text-slate-900 border-slate-300 focus:ring-0"
                                type="checkbox"
                              />
                              <button className="p-1 text-slate-400 hover:text-slate-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  className="lucide lucide-play w-3 h-3 fill-current"
                                >
                                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Средневековый Казахстан */}
                      <div className="border border-slate-200/90 rounded-xl bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-book w-4 h-4"
                              >
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">Средневековый Казахстан</h4>
                              <p className="text-[11px] text-slate-400">520 вопросов</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              aria-label="Развернуть раздел"
                              className="p-1 text-slate-400 hover:text-slate-600"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-chevron-down w-4 h-4"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                            <label className="cursor-pointer flex items-center">
                              <input
                                className="w-4 h-4 rounded text-slate-950 focus:ring-0 focus:ring-offset-0 border-slate-300"
                                type="checkbox"
                              />
                            </label>
                            <button
                              aria-label="Начать сессию по Средневековому Казахстану"
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-play w-3 h-3 fill-current"
                              >
                                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Казахстан в Новое и Новейшее время */}
                      <div className="border border-slate-200/90 rounded-xl bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-file-text w-4 h-4"
                              >
                                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                                <path d="M10 9H8" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">
                                Казахстан в Новое и Новейшее время
                              </h4>
                              <p className="text-[11px] text-slate-400">480 вопросов</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              aria-label="Развернуть раздел"
                              className="p-1 text-slate-400 hover:text-slate-600"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-chevron-down w-4 h-4"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                            <label className="cursor-pointer flex items-center">
                              <input
                                className="w-4 h-4 rounded text-slate-950 focus:ring-0 focus:ring-offset-0 border-slate-300"
                                type="checkbox"
                              />
                            </label>
                            <button
                              aria-label="Начать сессию"
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="lucide lucide-play w-3 h-3 fill-current"
                              >
                                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Математическая грамотность */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-calculator w-4 h-4"
                          >
                            <rect height="20" rx="2" width="16" x="4" y="2" />
                            <line x1="8" x2="16" y1="6" y2="6" />
                            <line x1="16" x2="16" y1="14" y2="18" />
                            <path d="M16 10h.01" />
                            <path d="M12 10h.01" />
                            <path d="M8 10h.01" />
                            <path d="M12 14h.01" />
                            <path d="M8 14h.01" />
                            <path d="M12 18h.01" />
                            <path d="M8 18h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Математическая грамотность</h3>
                          <p className="text-xs text-slate-400">1 120 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Развернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-down w-4 h-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по математической грамотности"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Грамотность чтения */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-book-marked w-4 h-4"
                          >
                            <path d="M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2" />
                            <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Грамотность чтения</h3>
                          <p className="text-xs text-slate-400">1 200 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Развернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-down w-4 h-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по грамотности чтения"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Профильные предметы */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Профильные предметы
                    </h3>
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Выбор 2 предметов
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">По выбранному направлению</span>
                </div>
                <div className="space-y-4">
                  {/* Информатика */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-terminal w-4 h-4"
                          >
                            <polyline points="4 17 10 11 4 5" />
                            <line x1="12" x2="20" y1="19" y2="19" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Информатика</h3>
                          <p className="text-xs text-slate-400">980 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Развернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-down w-4 h-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по информатике"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Математика */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-calculator w-4 h-4"
                          >
                            <rect height="20" rx="2" width="16" x="4" y="2" />
                            <line x1="8" x2="16" y1="6" y2="6" />
                            <line x1="16" x2="16" y1="14" y2="18" />
                            <path d="M16 10h.01" />
                            <path d="M12 10h.01" />
                            <path d="M8 10h.01" />
                            <path d="M12 14h.01" />
                            <path d="M8 14h.01" />
                            <path d="M12 18h.01" />
                            <path d="M8 18h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Математика</h3>
                          <p className="text-xs text-slate-400">1 840 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Развернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-down w-4 h-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по математике"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Физика */}
                  <div className="border border-slate-200/90 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/70 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-atom w-4 h-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                            <path d="M15.7 8.3c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" transform="rotate(90 12 12)" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Физика</h3>
                          <p className="text-xs text-slate-400">1 150 вопросов</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          aria-label="Развернуть предмет"
                          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-chevron-down w-4 h-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          aria-label="Быстрый запуск сессии по физике"
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="lucide lucide-play w-3.5 h-3.5 fill-current"
                          >
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Floating Bottom Action Bar */}
        <div
          className="fixed bottom-6 left-64 right-16 flex justify-center pointer-events-none z-20"
          data-purpose="floating-action-bar"
        >
          <div className="bg-white/95 backdrop-blur-md border border-slate-300/80 shadow-xl rounded-full px-6 py-2.5 flex items-center gap-5 pointer-events-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 tracking-tight">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>ВЫБРАНО: 1 раздел • 450 вопр.</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="lucide lucide-play w-3.5 h-3.5 fill-current"
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
              <span>Начать сессию</span>
            </button>
          </div>
        </div>

        {/* Persistent Bottom Right Action Float Button */}
        <button
          aria-label="Справочник и материалы"
          className="fixed bottom-6 right-6 w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all z-40"
          data-purpose="quick-book-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="lucide lucide-book-open w-5 h-5"
          >
            <path d="M12 5v16" />
            <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
          </svg>
        </button>
      </main>
      {/* END: MainContent */}
    </div>
  );
}
