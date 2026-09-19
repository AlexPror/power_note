import { PLAN_CYCLES, PLAN_GROUPS, PLAN_HORIZON } from '@/data/trainingPlan'

/**
 * Демо-кабинет «Вася Пупкин» — как выглядит живой сезон.
 * Период показа: цикл 1 «База техники» 18.09–15.10.2026.
 * «Сегодня» в приложении = 15.10.2026 (конец цикла, отчёт готов).
 *
 * PIN семьи: 1111
 */

const PIN_HASH = '702e4aad6a94f517f0931f8528af66f5605009ecba8d98005b7706f9f9b48e63'

function pt(date, v, source) {
  const [, m, d] = date.split('-')
  return { date, label: `${d}.${m}`, v, source }
}

function ex(id, name, unit, layer, color, points) {
  return {
    id,
    name,
    unit,
    layer,
    color,
    current: points.at(-1)?.v ?? 0,
    points,
  }
}

/** Недельный ритм группы — чтобы сразу было ясно «когда что» */
export const DEMO_WEEK = [
  { day: 'Пн', kind: 'home', title: 'Дома', body: 'ОФП 15–20 мин: отжимания, пресс, планка' },
  { day: 'Вт', kind: 'dojo', title: 'Додзё', body: 'Тренировка с тренером · замеры маяков' },
  { day: 'Ср', kind: 'home', title: 'Дома', body: 'Лёгкий блок: вис, скакалка, пресс' },
  { day: 'Чт', kind: 'dojo', title: 'Додзё', body: 'Тренировка с тренером' },
  { day: 'Пт', kind: 'home', title: 'Дома', body: 'По желанию / добор повторений' },
  { day: 'Сб', kind: 'rest', title: 'Семья', body: 'Прогулка, сон, еда без гонки' },
  { day: 'Вс', kind: 'rest', title: 'Отдых', body: 'Восстановление' },
]

const trainRows = [
  {
    date: '2026-09-18',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Старт сезона. Замеры: отжимания 5, пресс 8, планка 15 с, вис 5 с. Объяснили домашний ритм.',
    mark: 'старт',
  },
  {
    date: '2026-09-19',
    type: 'Дома',
    kind: 'home',
    body: 'Отжимания 3×5, пресс 2×8, планка 2×12 с. Коротко, без отказа.',
    mark: '✓',
  },
  {
    date: '2026-09-22',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Кихон + ОФП. Тренер: «добавь 2 отжимания в каждом подходе» → 7 чистых.',
    mark: 'тренер +2',
    bump: 'coach',
  },
  {
    date: '2026-09-23',
    type: 'Дома',
    kind: 'home',
    body: 'Вася сам попросил ещё подход пресса. Планка 18 с.',
    mark: 'сам +',
    bump: 'self',
  },
  {
    date: '2026-09-24',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Ката тайкёку. Вис 8 с. Контроль коленей в приседе.',
    mark: '✓',
  },
  {
    date: '2026-09-26',
    type: 'Отдых',
    kind: 'rest',
    body: 'Лёгкая простуда, один день без нагрузки.',
    mark: '−',
  },
  {
    date: '2026-09-29',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Вернулись. Отжимания 8, планка 22 с. Тренер: держим технику, не гнать число.',
    mark: '✓',
  },
  {
    date: '2026-09-30',
    type: 'Дома',
    kind: 'home',
    body: 'Скакалка 40, пресс 12, вис 10 с.',
    mark: '✓',
  },
  {
    date: '2026-10-01',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Тренер: «семье стоит открыть блок еды — сон и белок». Отжимания 9.',
    mark: 'тренер · еда',
    bump: 'coach',
  },
  {
    date: '2026-10-02',
    type: 'Дома',
    kind: 'home',
    body: 'Первый день с записью завтрака/ужина. Отжимания 10 — сам добавил подход.',
    mark: 'сам + · еда',
    bump: 'self',
  },
  {
    date: '2026-10-06',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Планка 30 с. Тренер поднял цель пресса до 3×15. Подтягивания: 1 негатив.',
    mark: 'тренер',
    bump: 'coach',
  },
  {
    date: '2026-10-07',
    type: 'Дома',
    kind: 'home',
    body: 'Пресс 15, планка 32 с, вис 14 с. Рацион стабильный третий день.',
    mark: '✓',
  },
  {
    date: '2026-10-08',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Отжимания 12. Прыжок 128 см. Кумитэ лёгкое 1 мин.',
    mark: '✓',
  },
  {
    date: '2026-10-09',
    type: 'Дома',
    kind: 'home',
    body: 'Вася захотел «ещё как в додзё» — +4 скакалки к плану, пресс 16.',
    mark: 'сам +',
    bump: 'self',
  },
  {
    date: '2026-10-13',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Контроль цикла: отжимания 14, пресс 18, планка 38 с, вис 16 с, подтяг. 2.',
    mark: 'замер',
    bump: 'coach',
  },
  {
    date: '2026-10-14',
    type: 'Дома',
    kind: 'home',
    body: 'Лёгкая закрепляющая: планка 40 с, пресс 20. Без отказа.',
    mark: '✓',
  },
  {
    date: '2026-10-15',
    type: 'Додзё',
    kind: 'dojo',
    body: 'Финиш цикла «База». Разбор отчёта с семьёй. Цель на цикл 2: стабильные 15 отжиманий.',
    mark: 'отчёт',
    bump: 'coach',
  },
]

const exercises = [
  ex('push', 'Отжимания', 'повт.', 'body', '#0a7a5c', [
    pt('2026-09-18', 5, 'coach'),
    pt('2026-09-22', 7, 'coach'),
    pt('2026-09-23', 7, 'self'),
    pt('2026-09-29', 8, 'coach'),
    pt('2026-10-01', 9, 'coach'),
    pt('2026-10-02', 10, 'self'),
    pt('2026-10-08', 12, 'coach'),
    pt('2026-10-13', 14, 'coach'),
  ]),
  ex('pull', 'Подтягивания', 'повт.', 'body', '#3d6b8a', [
    pt('2026-09-18', 0, 'coach'),
    pt('2026-10-06', 1, 'coach'),
    pt('2026-10-13', 2, 'coach'),
  ]),
  ex('crunch', 'Пресс', 'повт.', 'body', '#c45c28', [
    pt('2026-09-18', 8, 'coach'),
    pt('2026-09-23', 10, 'self'),
    pt('2026-09-30', 12, 'self'),
    pt('2026-10-06', 15, 'coach'),
    pt('2026-10-09', 16, 'self'),
    pt('2026-10-13', 18, 'coach'),
    pt('2026-10-14', 20, 'self'),
  ]),
  ex('hang', 'Вис', 'сек', 'body', '#4a7c59', [
    pt('2026-09-18', 5, 'coach'),
    pt('2026-09-24', 8, 'coach'),
    pt('2026-09-30', 10, 'self'),
    pt('2026-10-07', 14, 'self'),
    pt('2026-10-13', 16, 'coach'),
  ]),
  ex('rope', 'Скакалка', 'прыжков', 'body', '#6b4f3a', [
    pt('2026-09-19', 20, 'self'),
    pt('2026-09-30', 40, 'self'),
    pt('2026-10-09', 55, 'self'),
  ]),
  ex('jump', 'Прыжок в длину', 'см', 'body', '#1a6f8a', [
    pt('2026-09-18', 118, 'coach'),
    pt('2026-10-08', 128, 'coach'),
    pt('2026-10-13', 132, 'coach'),
  ]),
  ex('plank', 'Планка прямая', 'сек', 'plank', '#0a7a5c', [
    pt('2026-09-18', 15, 'coach'),
    pt('2026-09-19', 12, 'self'),
    pt('2026-09-23', 18, 'self'),
    pt('2026-09-29', 22, 'coach'),
    pt('2026-10-06', 30, 'coach'),
    pt('2026-10-07', 32, 'self'),
    pt('2026-10-13', 38, 'coach'),
    pt('2026-10-14', 40, 'self'),
  ]),
  ex('plankL', 'Планка боковая Л', 'сек', 'plank', '#2a8a6a', [
    pt('2026-09-22', 8, 'coach'),
    pt('2026-10-01', 12, 'coach'),
    pt('2026-10-13', 16, 'coach'),
  ]),
  ex('plankR', 'Планка боковая П', 'сек', 'plank', '#3a9a7a', [
    pt('2026-09-22', 6, 'coach'),
    pt('2026-10-01', 10, 'coach'),
    pt('2026-10-13', 14, 'coach'),
  ]),
]

const c1 = PLAN_CYCLES[0]

export const DEMO_ATHLETE = {
  slug: 'pupkin',
  firstName: 'Вася',
  lastName: 'Пупкин',
  sex: 'm',
  dob: '2017-03-08',
  kyu: 10,
  kyuSince: '2026-06-01',
  height: 136,
  pinHash: PIN_HASH,
  profileId: 'kyokushin',
  planGroup: 'junior',
  siblingSlugs: [],
  periodStart: PLAN_HORIZON.start,
  updated: '15.10.2026',
  isDemo: true,
  demoTitle: 'Пример живого кабинета',
  demoLead:
    'Вася — вымышленный ученик. Здесь видно, как выглядят расписание, план, отчёт и прогресс за первый цикл сезона.',
  notes:
    'Демо: 9 лет, 10 кю. Цикл «База техники» закрыт. С 1 октября семья ведёт еду — прогресс по ОФП заметнее.',
  allergies: [],
  schedule: DEMO_WEEK,
  cycles: [
    {
      id: c1.id,
      start: c1.start,
      end: c1.end,
      title: c1.title,
      report:
        'Вася за 4 недели вошёл в ритм: додзё вт/чт + дома 2–3 раза. Один день пропуска (простуда). Отжимания 5→14, планка 15→40 с, пресс 8→20, вис 5→16 с, появились 2 подтягивания. С 1.10 семья пишет еду — сон ровнее, подходы дома стабильнее. Сравниваем только с его стартом, не с группой.',
    },
    ...PLAN_CYCLES.slice(1).map((c) => ({
      id: c.id,
      start: c.start,
      end: c.end,
      title: c.title,
      report: '',
    })),
  ],
  recommendations: [
    {
      id: 'r-push',
      status: 'active',
      cycleId: 'c1',
      source: 'coach',
      observation: 'Отжимания выросли 5→14, техника стала чище.',
      action: 'Цикл 2: держать 3×12–15 без провала таза. Не гнать максимум каждый день.',
      affects: ['push'],
    },
    {
      id: 'r-plank',
      status: 'active',
      cycleId: 'c1',
      source: 'coach',
      observation: 'Прямая планка 40 с — хорошая база; боковые пока слабее.',
      action: 'Дома 3×/нед по 2 подхода боковой планки Л/П по 12–16 с.',
      affects: ['plank', 'plankL', 'plankR'],
    },
    {
      id: 'r-food',
      status: 'active',
      cycleId: 'c1',
      source: 'coach',
      observation: 'После старта рациона (1.10) домашние подходы стали регулярнее.',
      action: 'Оставить завтрак с белком (яйцо/творог) и ужин без поздних сладких перекусов в дни додзё.',
      affects: ['push', 'plank', 'hang'],
    },
    {
      id: 'r-self',
      status: 'active',
      cycleId: 'c1',
      source: 'self',
      observation: 'Вася сам просил «ещё подход» — мотивация есть.',
      action: 'Разрешать +1 лёгкий подход только если техника не ломается. Иначе стоп.',
      affects: ['crunch', 'rope'],
    },
  ],
  weightRows: [
    { date: '2026-09-18', kg: 29.4, note: 'старт цикла' },
    { date: '2026-10-15', kg: 29.8, note: 'рост · не цель «минус»' },
  ],
  foodIds: ['oat', 'egg', 'tvorog5', 'yogurt', 'chicken', 'soup', 'buckwheat', 'apple', 'banana', 'salad', 'bread_rye', 'kefir', 'school', 'fish'],
  foodDays: [
    {
      date: '2026-10-01',
      items: [
        { id: 'oat', grams: 200 },
        { id: 'egg', grams: 2 },
        { id: 'soup', grams: 250 },
        { id: 'bread_rye', grams: 40 },
        { id: 'apple', grams: 150 },
        { id: 'chicken', grams: 80 },
        { id: 'buckwheat', grams: 150 },
      ],
    },
    {
      date: '2026-10-03',
      items: [
        { id: 'yogurt', grams: 150 },
        { id: 'banana', grams: 100 },
        { id: 'school', grams: 300 },
        { id: 'tvorog5', grams: 100 },
        { id: 'salad', grams: 120 },
        { id: 'kefir', grams: 200 },
      ],
    },
    {
      date: '2026-10-07',
      items: [
        { id: 'oat', grams: 220 },
        { id: 'egg', grams: 2 },
        { id: 'chicken', grams: 100 },
        { id: 'buckwheat', grams: 180 },
        { id: 'salad', grams: 150 },
        { id: 'apple', grams: 120 },
        { id: 'tvorog5', grams: 120 },
      ],
    },
    {
      date: '2026-10-12',
      items: [
        { id: 'oat', grams: 200 },
        { id: 'egg', grams: 2 },
        { id: 'soup', grams: 280 },
        { id: 'bread_rye', grams: 50 },
        { id: 'fish', grams: 100 },
        { id: 'buckwheat', grams: 160 },
        { id: 'kefir', grams: 200 },
      ],
    },
    {
      date: '2026-10-14',
      items: [
        { id: 'yogurt', grams: 180 },
        { id: 'banana', grams: 120 },
        { id: 'chicken', grams: 110 },
        { id: 'buckwheat', grams: 180 },
        { id: 'salad', grams: 140 },
        { id: 'tvorog5', grams: 100 },
        { id: 'apple', grams: 130 },
      ],
    },
  ],
  foodInsights: {
    started: '2026-10-01',
    headline: 'Еду начали вести с 1 октября — и прогресс по ОФП ускорился',
    findings: [
      'До 1.10 домашка была «как получится»; после записи завтрака/ужина пропусков почти не стало.',
      'Белок в дни додзё ближе к ориентиру (яйцо, творог, курица) — восстановление субъективно легче.',
      'Сладкие поздние перекусы убрали в дни вт/чт — сон ровнее по словам семьи.',
    ],
    tips: [
      'Оставить простой шаблон: завтрак с белком + нормальный ужин в дни тренировок.',
      'Не считать калории «в минус» — у Васи идёт рост (29.4→29.8 кг), это нормально.',
      'Школьный обед можно писать одной строкой — важна регулярность, не идеал.',
    ],
  },
  trainRows,
  exercises,
  planLabel: PLAN_GROUPS.junior.label,
}
