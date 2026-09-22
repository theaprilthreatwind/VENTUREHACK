export const subjects = [
  {
    id: "math",
    name: "Математическая грамотность",
    shortName: "Math",
    icon: "sigma",
    totalQuestions: 1925,
    domains: [
      {
        id: "math-algebra",
        name: "Algebra",
        questions: 616,
        skills: [
          { id: "alg-1", name: "Linear equations in one variable", questions: 180, difficulty: "Easy", status: "Correct", repeat: "Yes" },
          { id: "alg-2", name: "Linear functions", questions: 210, difficulty: "Medium", status: "Incorrect", repeat: "No" },
          { id: "alg-3", name: "Systems of two linear equations", questions: 226, difficulty: "Hard", status: "Unanswered", repeat: "No" },
        ],
      },
      {
        id: "math-advanced",
        name: "Advanced Math",
        questions: 770,
        skills: [
          { id: "adv-1", name: "Quadratic functions and equations", questions: 200, difficulty: "Medium", status: "Correct", repeat: "Yes" },
          { id: "adv-2", name: "Exponents and radicals", questions: 270, difficulty: "Hard", status: "Incorrect", repeat: "No" },
          { id: "adv-3", name: "Polynomial and rational expressions", questions: 300, difficulty: "Hard", status: "Unanswered", repeat: "No" },
        ],
      },
      {
        id: "math-data",
        name: "Problem-Solving and Data Analysis",
        questions: 539,
        skills: [
          { id: "data-1", name: "Ratios, rates and proportional relationships", questions: 180, difficulty: "Easy", status: "Correct", repeat: "Yes" },
          { id: "data-2", name: "Percentages and unit conversion", questions: 160, difficulty: "Medium", status: "Unanswered", repeat: "Yes" },
          { id: "data-3", name: "One-variable data: distributions and measures of center", questions: 199, difficulty: "Easy", status: "Incorrect", repeat: "No" },
        ],
      },
    ],
  },
  {
    id: "reading",
    name: "Грамотность чтения",
    shortName: "Reading and Writing",
    icon: "file-text",
    totalQuestions: 2250,
    domains: [
      {
        id: "read-info",
        name: "Information and Ideas",
        questions: 620,
        skills: [
          { id: "ri-1", name: "Central ideas and details", questions: 210, difficulty: "Easy", status: "Correct", repeat: "Yes" },
          { id: "ri-2", name: "Inferences", questions: 200, difficulty: "Medium", status: "Unanswered", repeat: "No" },
          { id: "ri-3", name: "Command of evidence: textual", questions: 210, difficulty: "Hard", status: "Incorrect", repeat: "Yes" },
        ],
      },
      {
        id: "read-craft",
        name: "Craft and Structure",
        questions: 610,
        skills: [
          { id: "rc-1", name: "Words in context", questions: 200, difficulty: "Easy", status: "Correct", repeat: "No" },
          { id: "rc-2", name: "Cross-text connections", questions: 200, difficulty: "Medium", status: "Incorrect", repeat: "Yes" },
          { id: "rc-3", name: "Text structure and purpose", questions: 210, difficulty: "Hard", status: "Unanswered", repeat: "No" },
        ],
      },
      {
        id: "read-expression",
        name: "Expression of Ideas",
        questions: 590,
        skills: [
          { id: "re-1", name: "Rhetorical synthesis", questions: 290, difficulty: "Medium", status: "Correct", repeat: "No" },
          { id: "re-2", name: "Transitions", questions: 300, difficulty: "Hard", status: "Incorrect", repeat: "Yes" },
        ],
      },
      {
        id: "read-conventions",
        name: "Standard English Conventions",
        questions: 430,
        skills: [
          { id: "rn-1", name: "Boundaries", questions: 230, difficulty: "Medium", status: "Unanswered", repeat: "Yes" },
          { id: "rn-2", name: "Form, structure and sense", questions: 200, difficulty: "Easy", status: "Incorrect", repeat: "No" },
        ],
      },
    ],
  },
  {
    id: "history",
    name: "История Казахстана",
    shortName: "History of Kazakhstan",
    icon: "book",
    totalQuestions: 1530,
    domains: [
      {
        id: "his-ancient",
        name: "Древний Казахстан",
        questions: 450,
        skills: [
          { id: "ha-1", name: "Сакское государство", questions: 130, difficulty: "Easy", status: "Correct", repeat: "Yes" },
          { id: "ha-2", name: "Усуни и Кангюи", questions: 160, difficulty: "Medium", status: "Incorrect", repeat: "No" },
          { id: "ha-3", name: "Гуннская эпоха", questions: 160, difficulty: "Hard", status: "Unanswered", repeat: "Yes" },
        ],
      },
      {
        id: "his-medieval",
        name: "Средневековый Казахстан",
        questions: 520,
        skills: [
          { id: "hm-1", name: "Тюркский каганат", questions: 180, difficulty: "Medium", status: "Correct", repeat: "No" },
          { id: "hm-2", name: "Караханиды и Сельджуки", questions: 170, difficulty: "Easy", status: "Unanswered", repeat: "Yes" },
          { id: "hm-3", name: "Золотая Орда", questions: 170, difficulty: "Hard", status: "Incorrect", repeat: "No" },
        ],
      },
      {
        id: "his-modern",
        name: "Казахстан в Новое время",
        questions: 560,
        skills: [
          { id: "hn-1", name: "Казахское ханство в XVI–XVII вв.", questions: 190, difficulty: "Easy", status: "Correct", repeat: "Yes" },
          { id: "hn-2", name: "Вхождение в состав Российской империи", questions: 190, difficulty: "Medium", status: "Incorrect", repeat: "No" },
          { id: "hn-3", name: "Реформы XIX века", questions: 180, difficulty: "Hard", status: "Unanswered", repeat: "Yes" },
        ],
      },
    ],
  },
];

export const difficulties = ["Easy", "Medium", "Hard"];
export const answerStatuses = ["Correct", "Incorrect", "Unanswered"];
export const repeatOptions = ["Yes", "No"];
