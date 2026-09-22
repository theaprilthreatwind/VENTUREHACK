export const userProfile = {
  name: "Бейбарыс",
  targetScore: 125,
  progress: 10,
  answered: 386,
  totalQuestions: 2170,
  totalTime: "528:14",
  examDate: "2027-06-01T00:00:00",
};

export const subjects = [
  {
    id: "history",
    name: "История Казахстана",
    type: "mandatory",
    icon: "book",
    topics: [
      { id: "h1", name: "Древний Казахстан", questions: 160, difficulty: "Легко", status: "Верно", repeat: "Да", checked: true },
      { id: "h2", name: "Средневековый Казахстан", questions: 160, difficulty: "Средне", status: "Верно", repeat: "Да", checked: true },
      { id: "h3", name: "Казахское ханство", questions: 160, difficulty: "Сложно", status: "Неверно", repeat: "Нет", checked: true },
      { id: "h4", name: "Казахстан в новое время", questions: 140, difficulty: "Средне", status: "Без ответа", repeat: "Да", checked: false },
      { id: "h5", name: "Казахстан в XX веке", questions: 180, difficulty: "Сложно", status: "Неверно", repeat: "Нет", checked: false },
    ],
  },
  {
    id: "math-literacy",
    name: "Математическая грамотность",
    type: "mandatory",
    icon: "calculator",
    topics: [
      { id: "ml1", name: "Числа и вычисления", questions: 80, difficulty: "Легко", status: "Верно", repeat: "Да", checked: false },
      { id: "ml2", name: "Алгебра", questions: 90, difficulty: "Средне", status: "Без ответа", repeat: "Да", checked: false },
      { id: "ml3", name: "Геометрия", questions: 85, difficulty: "Сложно", status: "Неверно", repeat: "Нет", checked: false },
      { id: "ml4", name: "Статистика и вероятность", questions: 70, difficulty: "Легко", status: "Без ответа", repeat: "Нет", checked: false },
    ],
  },
  {
    id: "reading",
    name: "Грамотность чтения",
    type: "mandatory",
    icon: "file-text",
    topics: [
      { id: "r1", name: "Художественный текст", questions: 100, difficulty: "Легко", status: "Верно", repeat: "Да", checked: false },
      { id: "r2", name: "Научно-популярный текст", questions: 90, difficulty: "Средне", status: "Без ответа", repeat: "Нет", checked: false },
      { id: "r3", name: "Графики и таблицы", questions: 80, difficulty: "Сложно", status: "Неверно", repeat: "Да", checked: false },
    ],
  },
  {
    id: "cs",
    name: "Информатика",
    type: "profile",
    icon: "computer",
    topics: [
      { id: "cs1", name: "Алгоритмизация и программирование", questions: 140, difficulty: "Средне", status: "Верно", repeat: "Да", checked: false },
      { id: "cs2", name: "Информационные системы", questions: 90, difficulty: "Легко", status: "Без ответа", repeat: "Нет", checked: false },
      { id: "cs3", name: "Сетевые технологии", questions: 80, difficulty: "Сложно", status: "Неверно", repeat: "Да", checked: false },
      { id: "cs4", name: "Базы данных", questions: 70, difficulty: "Легко", status: "Верно", repeat: "Нет", checked: false },
    ],
  },
  {
    id: "math",
    name: "Математика",
    type: "profile",
    icon: "sigma",
    topics: [
      { id: "m1", name: "Алгебра и начала анализа", questions: 160, difficulty: "Сложно", status: "Верно", repeat: "Да", checked: false },
      { id: "m2", name: "Геометрия", questions: 150, difficulty: "Средне", status: "Неверно", repeat: "Нет", checked: false },
      { id: "m3", name: "Математический анализ", questions: 120, difficulty: "Сложно", status: "Без ответа", repeat: "Да", checked: false },
      { id: "m4", name: "Комбинаторика и вероятность", questions: 100, difficulty: "Легко", status: "Верно", repeat: "Нет", checked: false },
    ],
  },
  {
    id: "physics",
    name: "Физика",
    type: "profile",
    icon: "atom",
    topics: [
      { id: "p1", name: "Механика", questions: 150, difficulty: "Легко", status: "Верно", repeat: "Да", checked: false },
      { id: "p2", name: "Электродинамика", questions: 140, difficulty: "Средне", status: "Неверно", repeat: "Да", checked: false },
      { id: "p3", name: "Термодинамика", questions: 90, difficulty: "Сложно", status: "Без ответа", repeat: "Нет", checked: false },
      { id: "p4", name: "Молекулярная физика", questions: 110, difficulty: "Средне", status: "Верно", repeat: "Нет", checked: false },
      { id: "p5", name: "Оптика и квантовая физика", questions: 120, difficulty: "Сложно", status: "Неверно", repeat: "Да", checked: false },
    ],
  },
];

export const mandatorySubjects = subjects.filter((s) => s.type === "mandatory");
export const profileSubjects = subjects.filter((s) => s.type === "profile");

export const difficulties = ["Легко", "Средне", "Сложно"];
export const answerStatuses = ["Верно", "Неверно", "Без ответа"];
export const repeatOptions = ["Да", "Нет"];

export const formatNumber = (n) => n.toLocaleString("ru-RU");