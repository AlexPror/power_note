/**
 * Сезон ОФП: 18.09.2026 → 31.05.2027
 * Вт/Чт — додзё с тренером. Дома — 2–3 короткие сессии (Пн/Ср/Пт или Сб).
 * Корректируем объём по факту выполнения + прогрессу.
 */

export const PLAN_HORIZON = {
  start: '2026-09-18',
  end: '2027-05-31',
  dojoDays: ['вт', 'чт'],
  homeHint:
    'Дома 2–3 раза в неделю по 15–25 мин. Лучше регулярно и легко, чем редко и «до отказа». Скакалка — цель от 5 минут подряд: сначала дети много отдыхают между попытками, чистого прыжка может быть около 2 минут — это нормально, со временем чистого времени станет больше.',
}

/**
 * Общая пометка для семей: рекомендации, не приказ; разминка; присмотр взрослых.
 */
export const SAFETY_NOTICE =
  'Платформа носит рекомендательный характер. Любые упражнения — только после разминки и под присмотром родителей (дома и в зале). Тренировка в зале без взрослого рядом не допускается. При боли, недомогании или сомнении в технике — остановиться и уточнить у тренера.'

export const GYM_NOTE =
  'В додзё есть стойки для жима лёжа и наклонная скамья. Жим лёжа и присед — только по согласованию с тренером, под присмотром взрослых и после разучивания техники. Это не обязательная часть домашнего плана.'

/** Группы нагрузки */
export const PLAN_GROUPS = {
  junior: {
    id: 'junior',
    label: '8–9 лет · своё тело',
    gear: 'Скакалка, турник/низкая перекладина по возможности. Отягощений нет.',
  },
  prep: {
    id: 'prep',
    label: 'Подводящие (слабые руки / ноги / кор)',
    gear: 'Без отягощений. Стена, пол, стул, низкая перекладина. Темп спокойный.',
  },
  teen: {
    id: 'teen',
    label: '10–13 лет · своё тело + лёгкий вес',
    gear:
      'Гантели 6–8 кг на руку (по согласованию), гиря 8 кг при чистой технике; скакалка от 5 мин подряд; скамья для пресса. Жим лёжа и присед — только по согласованию с тренером и под присмотром взрослых.',
  },
  senior: {
    id: 'senior',
    label: '14+ · своё тело + гири и гантели',
    gear:
      'Гиря 8 кг, гантели 6–8 кг на руку, скамья для пресса, скакалка от 5 мин подряд. Жим лёжа и присед — по согласованию с тренером, только с родителями и после разучивания техники.',
  },
}

/** Циклы сезона (~4 недели, последний до 31.05) */
export const PLAN_CYCLES = [
  {
    id: 'c1',
    start: '2026-09-18',
    end: '2026-10-15',
    title: 'План тренировки',
    focus:
      'Базовые упражнения для развития силы: отжимания, планка, вис, присед. Сначала чистая техника, потом чуть больше повторений.',
  },
  {
    id: 'c2',
    start: '2026-10-16',
    end: '2026-11-12',
    title: 'Больше повторений',
    focus: 'Те же упражнения, чуть больше объёма. Скакалка — от 5 минут подряд.',
  },
  {
    id: 'c3',
    start: '2026-11-13',
    end: '2026-12-10',
    title: 'Корпус и хват',
    focus: 'Планка (прямая и бок), вис, подводящие к подтягиваниям.',
  },
  {
    id: 'c4',
    start: '2026-12-11',
    end: '2027-01-07',
    title: 'Зимний ритм',
    focus: 'Не терять привычку в каникулы: короткие домашние сессии.',
  },
  {
    id: 'c5',
    start: '2027-01-08',
    end: '2027-02-04',
    title: 'Сила тяги',
    focus: 'Подтягивания, негативы, низкая перекладина. Прыжки — дозированно.',
  },
  {
    id: 'c6',
    start: '2027-02-05',
    end: '2027-03-04',
    title: 'Прыжок и берпи',
    focus: 'Прыжок в длину, берпи (сначала упрощённые, потом полные).',
  },
  {
    id: 'c7',
    start: '2027-03-05',
    end: '2027-04-01',
    title: 'Сила + лёгкий вес',
    focus: 'ОФП; для старших — гиря и гантели малым объёмом.',
  },
  {
    id: 'c8',
    start: '2027-04-02',
    end: '2027-04-29',
    title: 'Контроль формы',
    focus: 'Проверка маяков: отжимания, пресс, планка, подтягивания/вис, прыжок.',
  },
  {
    id: 'c9',
    start: '2027-04-30',
    end: '2027-05-31',
    title: 'Финиш сезона',
    focus: 'Закрепить лучшие цифры сезона. Без перегруза перед летом.',
  },
]

/**
 * Домашние шаблоны по группе.
 * videoIds — ключи из videos.js
 */
const HOME = {
  junior: {
    base: [
      { name: 'Отжимания', dose: '3×6–12', videoIds: ['pushup'], note: 'С колен — если ломается корпус' },
      { name: 'Пресс (скручивания / подъём туловища)', dose: '3×10–20', videoIds: ['crunch'] },
      { name: 'Планка прямая', dose: '3×20–40 с', videoIds: ['plank_forearm'] },
      { name: 'Вис / низкая перекладина', dose: '3×8–20 с или 3×5–10', videoIds: ['pullup_low', 'pullup_guide'] },
      { name: 'Приседания', dose: '3×10–15', videoIds: ['squat_bw'], note: 'Без прыжков в цикле 1–2' },
      { name: 'Скакалка', dose: 'от 5 мин подряд', videoIds: ['rope_basic'], note: 'Сначала чистого прыжка ~2 мин — много отдыхают; цель — довести чистые 5 мин' },
    ],
    power: [
      { name: 'Прыжок в длину с места', dose: '4–6 попыток', videoIds: ['longjump'] },
      { name: 'Берпи (упрощ.: шаг назад, без отжимания)', dose: '3×4–8', videoIds: ['burpee'] },
    ],
  },
  prep: {
    base: [
      { name: 'Тренировка отжиманий для начинающих', dose: 'по ролику / 3×6–10', videoIds: ['pushup_wall', 'pushup'], note: 'Слабые руки: только чистая линия' },
      { name: 'Австралийские / низкая перекладина', dose: '3×5–8', videoIds: ['pullup_low', 'pullup_guide'] },
      { name: '«Мёртвый жук»', dose: '3×6 на сторону', videoIds: ['core_prep'], note: 'Кор без рывков' },
      { name: 'Ягодичный мост', dose: '3×8–12', videoIds: ['glute_bridge'] },
      { name: 'Присед к стулу', dose: '3×8–12', videoIds: ['squat_chair'], note: 'Слабые ноги: контроль вниз' },
      { name: 'Планка на коленях / короткая прямая', dose: '3×10–25 с', videoIds: ['plank_forearm'] },
      { name: 'Скакалка', dose: 'от 5 мин подряд', videoIds: ['rope_basic'], note: 'Или подскоки без скакалки; сначала ~2 мин чистого прыжка' },
    ],
    power: [
      { name: 'Прыжок в длину с места', dose: '3–5 попыток', videoIds: ['longjump'], note: 'Только после стабильного приседа к стулу' },
    ],
  },
  teen: {
    base: [
      { name: 'Отжимания', dose: '3×8–15', videoIds: ['pushup'] },
      { name: 'Пресс на скамье / скручивания', dose: '3×12–25', videoIds: ['crunch'] },
      { name: 'Планка прямая + бок', dose: '3×25–50 с / 2×15–30 с', videoIds: ['plank_forearm'] },
      { name: 'Подтягивания / обучение', dose: 'по уровню', videoIds: ['pullup', 'pullup_guide'] },
      { name: 'Goblet squat · гиря 8 кг', dose: '3×8–12', videoIds: ['goblet'], note: 'Только если спина длинная' },
      { name: 'Фермерская · гантели 6–8 кг на руку', dose: '3×20–40 м', videoIds: ['farmer'] },
      { name: 'Скакалка', dose: 'от 5 мин подряд', videoIds: ['rope_basic'], note: 'Сначала чистого прыжка меньше — это нормально' },
      { name: 'Жим гантелей / тяга', dose: '3×8–12 · 6–8 кг', videoIds: ['db_press', 'db_row'] },
    ],
    power: [
      { name: 'Прыжок в длину', dose: '5–8 попыток', videoIds: ['longjump'] },
      { name: 'Берпи', dose: '3×5–10', videoIds: ['burpee'] },
      { name: 'Махи гирей 8 кг двумя руками', dose: '3×8–12', videoIds: ['kb_swing2'], note: 'После разучивания в додзё' },
      { name: 'Жим лёжа / присед', dose: 'по согласованию с тренером', videoIds: [], note: 'Только с родителями и после разучивания техники' },
    ],
  },
  senior: {
    base: [
      { name: 'Отжимания', dose: '4×10–20', videoIds: ['pushup'] },
      { name: 'Пресс / скамья', dose: '4×15–30', videoIds: ['crunch'] },
      { name: 'Планка комплекс', dose: 'прямая + бок', videoIds: ['plank_forearm'] },
      { name: 'Подтягивания', dose: '3–5 подходов', videoIds: ['pullup', 'pullup_guide'] },
      { name: 'Goblet / махи · гиря 8 кг', dose: '3×8–15', videoIds: ['goblet', 'kb_swing2'] },
      { name: 'Фермерская · 6–8 кг на руку', dose: '3×30–50 м', videoIds: ['farmer'] },
      { name: 'Жим гантелей стоя / тяга в наклоне', dose: '3×8–12 · 6–8 кг', videoIds: ['db_press', 'db_row'] },
      { name: 'Скакалка', dose: 'от 5 мин подряд', videoIds: ['rope_basic'] },
    ],
    power: [
      { name: 'Прыжок в длину', dose: '6–8 попыток', videoIds: ['longjump'] },
      { name: 'Берпи', dose: '3×8–12', videoIds: ['burpee'] },
      { name: 'Жим лёжа / присед', dose: 'по согласованию с тренером', videoIds: [], note: 'Только с родителями и после разучивания техники' },
    ],
  },
}

/** Какие блоки дома в каком цикле */
function blocksForCycle(groupId, cycleId) {
  const g = HOME[groupId]
  if (!g) return []
  const powerCycles = new Set(['c5', 'c6', 'c7', 'c8', 'c9'])
  if (groupId === 'prep') {
    return powerCycles.has(cycleId) ? [...g.base, ...g.power] : g.base
  }
  if (cycleId === 'c1' || cycleId === 'c2') return g.base
  if (cycleId === 'c3' || cycleId === 'c4') {
    return g.base.filter((x) =>
      /планка|вис|подтяг|пресс|отжим|скакал|goblet|фермер|австрал|мост|жук|присед/i.test(x.name),
    )
  }
  return [...g.base, ...g.power]
}

export function cycleByDate(isoDate) {
  return PLAN_CYCLES.find((c) => isoDate >= c.start && isoDate <= c.end) || null
}

export function currentCycle(refDate = PLAN_HORIZON.start) {
  return cycleByDate(refDate) || PLAN_CYCLES[0]
}

export function homeBlock(groupId, cycleId) {
  return blocksForCycle(groupId, cycleId)
}

export function cyclesForAthlete(groupId) {
  return PLAN_CYCLES.map((c) => ({
    id: c.id,
    start: c.start,
    end: c.end,
    title: c.title,
    report:
      groupId === 'prep'
        ? `${c.focus} Группа подводящих: без гонки за повторениями.`
        : `${c.focus} ${PLAN_GROUPS[groupId]?.gear || ''}`,
  }))
}

export function recommendationsFor(groupId, cycleId = 'c1') {
  const block = homeBlock(groupId, cycleId)
  const lines = block.slice(0, 4).map((b) => `${b.name}: ${b.dose}`).join('; ')
  const recs = [
    {
      id: 'home-core',
      status: 'active',
      cycleId,
      observation: 'Додзё только во вторник и четверг — прогресс даёт домашка.',
      action: `Дома 2–3 раза в неделю: ${lines}`,
      affects: ['push', 'pull', 'crunch', 'plank', 'hang'],
    },
    {
      id: 'rope-note',
      status: 'active',
      cycleId,
      observation: 'Скакалка: цель — от 5 минут подряд.',
      action:
        'В начале дети много отдыхают между попытками — чистого прыжка может быть около 2 минут. Это нормально. Не сокращать сессию: копим чистые минуты до 5.',
      affects: ['rope'],
    },
  ]
  if (groupId === 'prep') {
    recs.push({
      id: 'prep-note',
      status: 'active',
      cycleId,
      observation: 'Слабые руки, ноги, кор — сначала подводящие.',
      action: 'Стена/колени, низкая перекладина, мост, «мёртвый жук». Без гирь до стабильной планки 30 с и 8 чистых отжиманий с колен.',
      affects: ['push', 'plank', 'hang'],
    })
  }
  if (groupId === 'junior' || groupId === 'teen' || groupId === 'senior') {
    recs.push({
      id: 'power-note',
      status: 'active',
      cycleId,
      observation: 'Прыжок в длину и берпи — после уверенной техники приседа и отжиманий.',
      action: 'С цикла «Сила тяги» / «Прыжок и берпи»: длина с места, берпи. Приземление мягкое, колени не заваливать внутрь.',
      affects: ['jump', 'burpee'],
    })
  }
  if (groupId === 'teen' || groupId === 'senior') {
    recs.push({
      id: 'load-note',
      status: 'active',
      cycleId,
      observation: 'Отягощения: гиря 8 кг, гантели 6–8 кг на руку.',
      action:
        'Goblet, фермер, жим и тяга — только с чистой техникой. Жим лёжа и присед — по согласованию с тренером, только под присмотром взрослых.',
      affects: ['goblet', 'farmer', 'kbSwing'],
    })
  }
  return recs
}

export function exerciseBeacons(groupId) {
  const body = [
    { id: 'push', name: 'Отжимания', unit: 'повт.', layer: 'body', color: '#0a7a5c' },
    { id: 'pull', name: 'Подтягивания', unit: 'повт.', layer: 'body', color: '#3d6b8a' },
    { id: 'crunch', name: 'Пресс', unit: 'повт.', layer: 'body', color: '#c45c28' },
    { id: 'hang', name: 'Вис', unit: 'сек', layer: 'body', color: '#4a7c59' },
    { id: 'rope', name: 'Скакалка', unit: 'прыжков', layer: 'body', color: '#6b4f3a' },
    { id: 'jump', name: 'Прыжок в длину', unit: 'см', layer: 'body', color: '#1a6f8a' },
    { id: 'burpee', name: 'Берпи', unit: 'повт.', layer: 'body', color: '#8a4a2a' },
  ]
  const plank = [
    { id: 'plank', name: 'Планка прямая', unit: 'сек', layer: 'plank', color: '#0a7a5c' },
    { id: 'plankL', name: 'Планка боковая Л', unit: 'сек', layer: 'plank', color: '#2a8a6a' },
    { id: 'plankR', name: 'Планка боковая П', unit: 'сек', layer: 'plank', color: '#3a9a7a' },
  ]
  const load =
    groupId === 'teen' || groupId === 'senior'
      ? [
          { id: 'goblet', name: 'Goblet squat', unit: 'кг×повт.', layer: 'load', color: '#7a5c2a' },
          { id: 'farmer', name: 'Фермерская', unit: 'м', layer: 'load', color: '#5c6a2a' },
        ]
      : []
  if (groupId === 'senior') {
    load.push({ id: 'kbSwing', name: 'Махи гирей', unit: 'повт.', layer: 'load', color: '#6a4a2a' })
  }
  if (groupId === 'prep') {
    return [
      { id: 'push', name: 'Отжимания (стена/колени)', unit: 'повт.', layer: 'body', color: '#0a7a5c' },
      { id: 'pull', name: 'Низкая перекладина', unit: 'повт.', layer: 'body', color: '#3d6b8a' },
      { id: 'hang', name: 'Вис', unit: 'сек', layer: 'body', color: '#4a7c59' },
      { id: 'bridge', name: 'Ягодичный мост', unit: 'повт.', layer: 'body', color: '#6b4f3a' },
      { id: 'squat', name: 'Присед к стулу', unit: 'повт.', layer: 'body', color: '#5a6a3a' },
      ...plank.slice(0, 1),
    ].map((e) => ({ ...e, current: 0, points: [] }))
  }
  return [...body, ...plank, ...load].map((e) => ({ ...e, current: 0, points: [] }))
}
