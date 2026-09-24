/**
 * Словари интерфейса (RU/KK) и хелперы переводов.
 *
 * Так как npm-пакеты i18n в проекте запрещены (см. AGENTS.md), переводы сделаны
 * вручную: плоские вложенные объекты с плейсхолдерами `{name}` + интерполяция.
 * Ключ — путь вида `settings.accountTitle`.
 *
 * Язык хранится в localStorage (ключ `entuz_lang`, автономно от настроек темы),
 * реактивно читается через `useLocalStorage` в `LanguageProvider`.
 */

import { STORAGE_KEYS } from "@/shared/config";

/** Поддерживаемые коды языков (первый — язык по умолчанию). */
export const SUPPORTED_LANGS = ["ru", "kk"];

export const dictionaries = {
  ru: {
    common: {
      close: "Закрыть",
      cancel: "Отмена",
      save: "Сохранить",
      selectPlaceholder: "Выберите класс или статус",
    },
    lang: {
      switchLabel: "Язык интерфейса",
    },
    app: {
      materials: "Справочник и материалы",
    },
    sidebar: {
      menu: "МЕНЮ",
      collapse: "Свернуть меню",
      open: "Открыть меню",
      home: "Главная",
      practice: "Практика",
      questionBank: "Банк вопросов",
      free: "Бесплатно",
      plan: "План подготовки",
      analytics: "Аналитика успеваемости",
      support: "Поддержка",
      settings: "Настройки",
    },
    header: {
      dashboard: "Дашборд",
      createSession: "Создать сессию",
      createSessionSub: "Настройте фильтры, чтобы создать персонализированный тест.",
      defaultTitle: "ЕНТdigit",
      defaultSubtitle: "Платформа подготовки к ЕНТ",
      welcomeBack: "С возвращением, {username}",
      startFree: "Старт бесплатно",
      notifications: "Уведомления",
    },
    practice: {
      filtersTitle: "Общие фильтры",
      resetFilters: "Сбросить фильтры",
      difficultyLabel: "СЛОЖНОСТЬ",
      statusLabel: "СТАТУС ОТВЕТА",
      repeatLabel: "НА ПОВТОРЕНИЕ",
      overviewTitle: "Обзор по предметам",
      overviewHint:
        "Разверните предмет, отметьте нужные темы и нажмите «Начать сессию», либо запустите отдельную тему сразу.",
      loadingSubjects: "Загрузка предметов…",
      loadError: "Не удалось загрузить предметы: {message}",
      compulsoryTitle: "Обязательные предметы",
      profileTitle: "Профильные предметы",
      profileBadge: "Выбор 2 предметов",
      profileHint: "По выбранному направлению",
      selectedLabel: "ВЫБРАНО: {topics} • {questions}",
      pending: "Создаём...",
      startSession: "Начать сессию",
      selectWholeSubject: "Выбрать предмет целиком",
      collapseExpand: "Свернуть или развернуть предмет",
      quickStart: "Быстрый запуск: {title}",
      selectTopic: "Выбрать тему: {title}",
      noTopics: "В предмете пока нет тем",
      filterEasy: "Легко",
      filterMedium: "Средне",
      filterHard: "Сложно",
      filterCorrect: "Верно",
      filterIncorrect: "Неверно",
      filterNotAnswered: "Без ответа",
      filterYes: "Да",
      filterNo: "Нет",
    },
    counters: {
      questions: ["вопрос", "вопроса", "вопросов"],
      themes: ["тема", "темы", "тем"],
      subjects: ["предмет", "предмета", "предметов"],
    },
    session: {
      questionOf: "Вопрос {current} из {total}",
      closeQuestionList: "Закрыть список вопросов",
      questionList: "Список вопросов",
      goToQuestion: "Перейти к вопросу",
      correct: "Верно",
      incorrect: "Неверно",
      answerOptions: "Варианты ответа",
      flagOn: "Снять отметку проверки",
      flagOff: "Отметить для проверки",
      flagTitle: "Отметить для проверки",
      back: "Назад",
      check: "Проверить",
      checking: "Проверяем…",
      next: "Далее",
      finish: "Завершить",
      finishing: "Завершаем…",
      finishModalTitle: "Завершить сессию?",
      finishModalDesc:
        "Осталось неотвеченных вопросов: {count}. Вы точно хотите закончить?",
      finishConfirm: "Да, завершить",
      showExplanation: "Показать объяснение",
      hideExplanation: "Скрыть объяснение",
      explainMistake: "Объяснить ошибку",
      explaining: "Генерируем объяснение…",
      explainRetry: "Повторить",
      notFoundTitle: "Сессия не найдена",
      notFoundDesc: "Сначала соберите набор вопросов в банке.",
      toBank: "К банку вопросов",
    },
    result: {
      unavailableTitle: "Результат недоступен",
      unavailableDesc: "Данных о последней сессии нет. Пройдите новый тест.",
      newSession: "Новая сессия",
      title: "Сессия завершена",
      attempt: "Попытка #{id}",
      correctLabel: "Правильные",
      incorrectLabel: "Неправильные",
      ofTotal: "{count} из {total}",
      chartAria: "Правильные {correct}%, неправильные {incorrect}%",
      correct: "Верно",
      incorrect: "Неверно",
      unanswered: "Без ответа",
      time: "Время:",
      toDashboard: "На дашборд",
    },
    notifications: {
      title: "Уведомления",
      empty: "Пока нет уведомлений",
      markAllRead: "Прочитать все",
      clearAll: "Очистить",
      resultTitle: "Сессия завершена",
      resultText: "Правильно {correct} из {total} ({percent}%)",
      perfectTitle: "Идеальный результат!",
      perfectText: "Все {total} ответов — верные",
      timeNow: "только что",
      timeMinutes: ["минуту назад", "минуты назад", "минут назад"],
      timeHours: ["час назад", "часа назад", "часов назад"],
      timeDays: ["день назад", "дня назад", "дней назад"],
    },
    dashboard: {
      countdownTitle: "Обратный отсчет до экзамена",
      days: "ДНЕЙ",
      hours: "ЧАСОВ",
      minutes: "МИНУТ",
      seconds: "СЕКУНД",
      targetDate: "Целевая дата: {date}",
      noExamDate: "Дата экзамена не указана",
      changeDate: "Изменить дату",
      dateModalTitle: "Дата экзамена ЕНТ",
      whenExam: "Когда состоится ЕНТ?",
      storedLocally: "Дата хранится локально в вашем браузере",
      goalTitle: "Ваша цель по баллам",
      currentGoal: "Текущая цель",
      goalStoredLocally: "Хранится локально в вашем браузере.",
      change: "Изменить",
      goalModalTitle: "Цель по баллам ЕНТ",
      howManyPoints: "Сколько баллов хотите набрать?",
      maxScore: "Максимальный балл ЕНТ — {max}",
    },
    settings: {
      title: "Настройки",
      subtitle: "Управление профилем, предпочтениями и безопасностью аккаунта.",
      profileTitle: "Профиль пользователя",
      profileDesc: "Ваши личные данные и идентификатор аккаунта.",
      userId: "ID пользователя",
      copyId: "Скопировать ID",
      copied: "Скопировано",
      copy: "Копировать",
      email: "Email",
      username: "Имя пользователя",
      role: "Роль",
      student: "Студент",
      prefsTitle: "Уведомления и предпочтения",
      prefsDesc: "Управление оповещениями и темой оформления.",
      emailAlerts: "Email-уведомления",
      emailAlertsDesc: "Получать важные обновления на почту",
      inAppAlerts: "Уведомления в приложении",
      inAppAlertsDesc: "Push-уведомления внутри платформы",
      themeLabel: "Тема оформления",
      themeDesc: "Светлая или тёмная тема",
      light: "Светлая",
      dark: "Тёмная",
      studyTitle: "Параметры обучения",
      studyDesc: "Настройка сложности и чувствительности системы.",
      riskLevel: "Порог сложности вопросов",
      riskAria: "Порог сложности",
      easy: "Лёгкие",
      all: "Все",
      accountTitle: "Управление аккаунтом",
      accountDesc: "Необратимые действия с аккаунтом и сессией.",
      resetSession: "Сбросить активную сессию",
      resetSessionDone: "Сессия сброшена ✓",
      resetSessionDesc: "Удалить текущий незавершённый тест",
      logoutTitle: "Выйти из аккаунта",
      logoutDesc: "Очистить сессию и вернуться на страницу входа",
      logoutModalTitle: "Выйти из аккаунта?",
      logoutModalDesc:
        "Все данные сессии будут очищены. Вы будете перенаправлены на страницу входа.",
      logoutConfirm: "Выйти",
      resetModalTitle: "Сбросить сессию?",
      resetModalDesc:
        "Текущая активная сессия практики будет удалена. Прогресс незавершённого теста будет потерян.",
      resetConfirm: "Сбросить",
    },
    auth: {
      tabLogin: "Войти",
      tabRegister: "Регистрация",
      tagline: "Первая цифровая школа ЕНТ",
      bannerBadge: "69 000+ часов практики уже пройдено",
      bannerTitleA: "Твой путь к",
      bannerTitleB: "140 баллам",
      bannerTitleC: "на ЕНТ",
      bannerDesc:
        "Присоединяйся к абитуриентам Казахстана: решай реальные задания, следи за прогрессом и поступай в вуз мечты.",
      quoteText:
        "«С 78 баллов на пробнике выросла до 132 за четыре месяца подготовки. Теперь ЕНТ — не страшно»",
      quoteAuthor: "Айгерим, 11 класс • Алматы",
      stat100: "сдают на 100+ баллов",
      statApplicants: "абитуриентов в проекте",
      statQuestions: "вопросов ЕНТ в базе",
      loginTitle: "С возвращением!",
      loginSubtitle: "Войдите в аккаунт, чтобы продолжить подготовку к ЕНТ",
      password: "Пароль",
      passwordPlaceholder: "Введите пароль",
      showPassword: "Показать пароль",
      hidePassword: "Скрыть пароль",
      loginBtn: "Войти",
      loginPending: "Входим...",
      signupTitle: "Создайте аккаунт",
      signupSubtitle: "Начните подготовку к ЕНТ бесплатно — 2 минуты и вы в деле",
      usernameLabel: "Имя пользователя",
      usernamePlaceholder: "Например, alex_dev",
      passwordMinPlaceholder: "Минимум 6 символов",
      confirmLabel: "Повторите пароль",
      confirmPlaceholder: "Введите пароль ещё раз",
      signupBtn: "Зарегистрироваться",
      signupPending: "Создаём...",
      agreePrefix: "Продолжая, вы соглашаетесь с",
      agreeTerms: "условиями использования",
      agreeAnd: "и",
      agreePrivacy: "политикой конфиденциальности",
      agreeSuffix: "",
      loginFailed: "Не удалось войти",
      signupFailed: "Не удалось зарегистрироваться",
    },
    validation: {
      emailRequired: "Введите email",
      emailInvalid: "Введите корректный email",
      passwordRequired: "Введите пароль",
      passwordMin: "Пароль должен содержать не менее 6 символов",
      usernameMin: "Введите имя (минимум 2 символа)",
      confirmRequired: "Повторите пароль",
      confirmMismatch: "Пароли не совпадают",
    },
    errors: {
      startSession: "Не удалось начать сессию",
      submitAnswer: "Не удалось отправить ответ",
      finishSession: "Не удалось завершить сессию",
      requestFailed: "Не удалось выполнить запрос {method} {url}",
      requestStatus: "Запрос {method} {url} завершился со статусом {status}",
      explainEmpty: "Не удалось получить объяснение",
      explainFailed: "Не удалось объяснить ошибку",
    },
  },

  kk: {
    common: {
      close: "Жабу",
      cancel: "Болдырмау",
      save: "Сақтау",
      selectPlaceholder: "Сыныпты немесе статусты таңдаңыз",
    },
    lang: {
      switchLabel: "Интерфейс тілі",
    },
    app: {
      materials: "Анықтама және материалдар",
    },
    sidebar: {
      menu: "МӘЗІР",
      collapse: "Мәзірді жасыру",
      open: "Мәзірді ашу",
      home: "Басты бет",
      practice: "Жаттығу",
      questionBank: "Сұрақтар банкі",
      free: "Тегін",
      plan: "Дайындық жоспары",
      analytics: "Оқу үлгерімінің аналитикасы",
      support: "Қолдау",
      settings: "Баптаулар",
    },
    header: {
      dashboard: "Басқару панелі",
      createSession: "Сессия жасау",
      createSessionSub: "Жеке тест жасау үшін сүзгілерді реттеңіз.",
      defaultTitle: "ЕНТdigit",
      defaultSubtitle: "ЕНТ-ге дайындық платформасы",
      welcomeBack: "Қайта келдіңіз, {username}",
      startFree: "Тегін бастау",
      notifications: "Хабарландырулар",
    },
    practice: {
      filtersTitle: "Жалпы сүзгілер",
      resetFilters: "Сүзгілерді тазалау",
      difficultyLabel: "ҚИЫНДЫҚ",
      statusLabel: "ЖАУАП СТАТУСЫ",
      repeatLabel: "ҚАЙТАЛАУ",
      overviewTitle: "Пәндер бойынша шолу",
      overviewHint:
        "Пәнді ашып, қажетті тақырыптарды белгілеп, «Сессияны бастау» түймесін басыңыз немесе жеке тақырыпты бірден бастаңыз.",
      loadingSubjects: "Пәндер жүктелуде…",
      loadError: "Пәндерді жүктеу мүмкін болмады: {message}",
      compulsoryTitle: "Міндетті пәндер",
      profileTitle: "Бейіндік пәндер",
      profileBadge: "2 пән таңдау",
      profileHint: "Таңдалған бағыт бойынша",
      selectedLabel: "ТАҢДАЛДЫ: {topics} • {questions}",
      pending: "Жасалуда...",
      startSession: "Сессияны бастау",
      selectWholeSubject: "Пәнді толық таңдау",
      collapseExpand: "Пәнді жасыру немесе ашу",
      quickStart: "Жылдам бастау: {title}",
      selectTopic: "Тақырыпты таңдау: {title}",
      noTopics: "Пәнде әзірше тақырыптар жоқ",
      filterEasy: "Оңай",
      filterMedium: "Орташа",
      filterHard: "Қиын",
      filterCorrect: "Дұрыс",
      filterIncorrect: "Қате",
      filterNotAnswered: "Жауапсыз",
      filterYes: "Иә",
      filterNo: "Жоқ",
    },
    counters: {
      questions: ["сұрақ"],
      themes: ["тақырып"],
      subjects: ["пән"],
    },
    session: {
      questionOf: "Сұрақ {current} / {total}",
      closeQuestionList: "Сұрақтар тізімін жабу",
      questionList: "Сұрақтар тізімі",
      goToQuestion: "Сұраққа өту",
      correct: "Дұрыс",
      incorrect: "Қате",
      answerOptions: "Жауап нұсқалары",
      flagOn: "Тексеру белгісін алу",
      flagOff: "Тексеруге белгілеу",
      flagTitle: "Тексеруге белгілеу",
      back: "Артқа",
      check: "Тексеру",
      checking: "Тексерілуде…",
      next: "Келесі",
      finish: "Аяқтау",
      finishing: "Аяқталуда…",
      finishModalTitle: "Сессияны аяқтау?",
      finishModalDesc:
        "Жауап берілмеген сұрақтар қалды: {count}. Шынымен аяқтағыңыз келе ме?",
      finishConfirm: "Иә, аяқтау",
      showExplanation: "Түсіндірмені көрсету",
      hideExplanation: "Түсіндірмені жасыру",
      explainMistake: "Қатені түсіндіру",
      explaining: "Түсіндірме жасалып жатыр…",
      explainRetry: "Қайталау",
      notFoundTitle: "Сессия табылмады",
      notFoundDesc: "Алдымен банктен сұрақтар жинағын құрастырыңыз.",
      toBank: "Сұрақтар банкіне",
    },
    result: {
      unavailableTitle: "Нәтиже қолжетімсіз",
      unavailableDesc: "Соңғы сессия туралы деректер жоқ. Жаңа тест өтіңіз.",
      newSession: "Жаңа сессия",
      title: "Сессия аяқталды",
      attempt: "Әрекет №{id}",
      correctLabel: "Дұрыс",
      incorrectLabel: "Қате",
      ofTotal: "{count} / {total}",
      chartAria: "Дұрыс {correct}%, қате {incorrect}%",
      correct: "Дұрыс",
      incorrect: "Қате",
      unanswered: "Жауапсыз",
      time: "Уақыт:",
      toDashboard: "Басқару панеліне",
    },
    notifications: {
      title: "Хабарландырулар",
      empty: "Әзірге хабарландырулар жоқ",
      markAllRead: "Барлығын оқу",
      clearAll: "Тазалау",
      resultTitle: "Сессия аяқталды",
      resultText: "Дұрыс жауап: {correct} / {total} ({percent}%)",
      perfectTitle: "Тамаша нәтиже!",
      perfectText: "Барлық {total} жауап дұрыс",
      timeNow: "қазір",
      timeMinutes: "мин бұрын",
      timeHours: "сағат бұрын",
      timeDays: "күн бұрын",
    },
    dashboard: {
      countdownTitle: "Емтиханға дейінгі кері санақ",
      days: "КҮН",
      hours: "САҒАТ",
      minutes: "МИНУТ",
      seconds: "СЕКУНД",
      targetDate: "Мақсатты күні: {date}",
      noExamDate: "Емтихан күні көрсетілмеген",
      changeDate: "Күнді өзгерту",
      dateModalTitle: "ЕНТ емтихан күні",
      whenExam: "ЕНТ қашан өтеді?",
      storedLocally: "Күн браузеріңізде жергілікті сақталады",
      goalTitle: "Ұпай бойынша мақсатыңыз",
      currentGoal: "Ағымдағы мақсат",
      goalStoredLocally: "Браузеріңізде жергілікті сақталады.",
      change: "Өзгерту",
      goalModalTitle: "ЕНТ ұпай мақсаты",
      howManyPoints: "Қанша ұпай жинағыңыз келеді?",
      maxScore: "ЕНТ максималды ұпайы — {max}",
    },
    settings: {
      title: "Баптаулар",
      subtitle: "Профильді, қалауларды және аккаунт қауіпсіздігін басқару.",
      profileTitle: "Пайдаланушы профилі",
      profileDesc: "Жеке деректеріңіз және аккаунт идентификаторы.",
      userId: "Пайдаланушы ID",
      copyId: "ID көшіру",
      copied: "Көшірілді",
      copy: "Көшіру",
      email: "Email",
      username: "Пайдаланушы аты",
      role: "Рөл",
      student: "Студент",
      prefsTitle: "Хабарландырулар мен қалаулар",
      prefsDesc: "Ескертпелер мен көрініс тақырыбын басқару.",
      emailAlerts: "Email-хабарландырулар",
      emailAlertsDesc: "Маңызды жаңартуларды почтаға алу",
      inAppAlerts: "Қосымшадағы хабарландырулар",
      inAppAlertsDesc: "Платформа ішіндегі push-хабарландырулар",
      themeLabel: "Көрініс тақырыбы",
      themeDesc: "Ашық немесе қараңғы тақырып",
      light: "Ашық",
      dark: "Қараңғы",
      studyTitle: "Оқу параметрлері",
      studyDesc: "Күрделілік пен жүйе сезімталдығын реттеу.",
      riskLevel: "Сұрақтардың күрделілік шегі",
      riskAria: "Күрделілік шегі",
      easy: "Жеңіл",
      all: "Барлығы",
      accountTitle: "Аккаунтты басқару",
      accountDesc: "Аккаунт пен сессияға қатысты қайтымсыз әрекеттер.",
      resetSession: "Белсенді сессияны тазалау",
      resetSessionDone: "Сессия тазаланды ✓",
      resetSessionDesc: "Ағымдағы аяқталмаған тестті жою",
      logoutTitle: "Аккаунттан шығу",
      logoutDesc: "Сессияны тазалап, кіру бетіне оралу",
      logoutModalTitle: "Аккаунттан шығу?",
      logoutModalDesc:
        "Сессияның барлық деректері тазаланады. Кіру бетіне қайта бағытталасыз.",
      logoutConfirm: "Шығу",
      resetModalTitle: "Сессияны тазалау?",
      resetModalDesc:
        "Белсенді практика сессиясы жойылады. Аяқталмаған тесттің прогрессі жоғалады.",
      resetConfirm: "Тазалау",
    },
    auth: {
      tabLogin: "Кіру",
      tabRegister: "Тіркелу",
      tagline: "ЕНТ-тің бірінші цифрлық мектебі",
      bannerBadge: "69 000+ сағат практика өтілген",
      bannerTitleA: "ЕНТ-те",
      bannerTitleB: "140 ұпайға",
      bannerTitleC: "жету жолың",
      bannerDesc:
        "Қазақстан талапкерлеріне қосылыңыз: нақты тапсырмаларды шешіңіз, прогресті бақылаңыз және армандаған жоғары оқу орнына түсіңіз.",
      quoteText:
        "«Пробникте 78 ұпайдан төрт айлық дайындықта 132-ге өстім. Енді ЕНТ қорқынышты емес»",
      quoteAuthor: "Айгерім, 11 сынып • Алматы",
      stat100: "100+ ұпайға тапсырады",
      statApplicants: "жобадағы талапкерлер",
      statQuestions: "базадағы ЕНТ сұрақтары",
      loginTitle: "Қайта келдіңіз!",
      loginSubtitle: "ЕНТ-ге дайындықты жалғастыру үшін аккаунтқа кіріңіз",
      password: "Құпия сөз",
      passwordPlaceholder: "Құпия сөзді енгізіңіз",
      showPassword: "Құпия сөзді көрсету",
      hidePassword: "Құпия сөзді жасыру",
      loginBtn: "Кіру",
      loginPending: "Кіруде...",
      signupTitle: "Аккаунт құру",
      signupSubtitle: "ЕНТ-ге дайындықты тегін бастаңыз — 2 минут және сіз істе",
      usernameLabel: "Пайдаланушы аты",
      usernamePlaceholder: "Мысалы, alex_dev",
      passwordMinPlaceholder: "Кемінде 6 таңба",
      confirmLabel: "Құпия сөзді қайталаңыз",
      confirmPlaceholder: "Құпия сөзді қайта енгізіңіз",
      signupBtn: "Тіркелу",
      signupPending: "Жасалуда...",
      agreePrefix: "Жалғастыру арқылы сіз",
      agreeTerms: "пайдалану шарттарымен",
      agreeAnd: "және",
      agreePrivacy: "құпиялылық саясатымен",
      agreeSuffix: "келісесіз",
      loginFailed: "Кіру мүмкін болмады",
      signupFailed: "Тіркелу мүмкін болмады",
    },
    validation: {
      emailRequired: "Email енгізіңіз",
      emailInvalid: "Дұрыс email енгізіңіз",
      passwordRequired: "Құпия сөзді енгізіңіз",
      passwordMin: "Құпия сөз кемінде 6 таңбадан тұруы керек",
      usernameMin: "Атыңызды енгізіңіз (кемінде 2 таңба)",
      confirmRequired: "Құпия сөзді қайталаңыз",
      confirmMismatch: "Құпия сөздер сәйкес келмейді",
    },
    errors: {
      startSession: "Сессияны бастау мүмкін болмады",
      submitAnswer: "Жауапты жіберу мүмкін болмады",
      finishSession: "Сессияны аяқтау мүмкін болмады",
      requestFailed: "{method} {url} сұранысын орындау мүмкін болмады",
      requestStatus: "{method} {url} сұранысы {status} статусымен аяқталды",
      explainEmpty: "Түсіндірмені алу мүмкін болмады",
      explainFailed: "Қатені түсіндіру мүмкін болмады",
    },
  },
};

/** Ищет значение по точечному ключу в словаре. */
function lookup(dictionary, key) {
  let node = dictionary;
  for (const part of key.split(".")) {
    if (node == null || typeof node !== "object") return undefined;
    node = node[part];
  }
  return node;
}

/** Подставляет плейсхолдеры `{name}` в строку. */
function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    vars[name] === undefined ? match : String(vars[name])
  );
}

/**
 * Переводит ключ в выбранном языке. При отсутствии перевода — язык по умолчанию,
 * затем сам ключ (поиск сбоев в словарях).
 *
 * @param {"ru"|"kk"} lang
 * @param {string} key
 * @param {Record<string, unknown>} [vars]
 * @returns {string}
 */
export function translateText(lang, key, vars) {
  const text =
    lookup(dictionaries[lang], key) ?? lookup(dictionaries.ru, key) ?? key;
  return interpolate(text, vars);
}

/**
 * Текущий язык из localStorage (без реактивности). Для не-hook контекстов:
 * apiService, серверная рендеринг.
 *
 * @returns {"ru"|"kk"}
 */
export function getCurrentLanguage() {
  if (typeof window === "undefined") return "ru";
  try {
    return window.localStorage.getItem(STORAGE_KEYS.lang) === "kk" ? "kk" : "ru";
  } catch {
    return "ru";
  }
}

/**
 * Переводит ключ на текущем языке из localStorage (не реактивно).
 *
 * @param {string} key
 * @param {Record<string, unknown>} [vars]
 * @returns {string}
 */
export function resolveText(key, vars) {
  return translateText(getCurrentLanguage(), key, vars);
}

/**
 * Русская плюрализация: формы [один, несколько, много].
 *
 * @param {number} count
 * @param {[string, string, string]} forms
 * @returns {string}
 */
export function pluralRu(count, forms) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

const countersOf = (lang) => dictionaries[lang]?.counters ?? dictionaries.ru.counters;

/**
 * Слово-счётчик для числа: `countWord(lang, "questions", 3)`.
 * Для казахского всегда единственная форма, для русского — плюрализация.
 *
 * @param {"ru"|"kk"} lang
 * @param {"questions"|"themes"|"subjects"} counterName
 * @param {number} count
 * @returns {string}
 */
export function countWord(lang, counterName, count) {
  const forms = countersOf(lang)[counterName] ?? countersOf("ru")[counterName];
  return lang === "kk" ? forms[0] : pluralRu(count, forms);
}