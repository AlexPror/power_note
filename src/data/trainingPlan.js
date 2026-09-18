/**
 * Сезон ОФП: 18.09.2026 → 31.05.2027
 * Вт/Чт — додзё с тренером. Дома — 2–3 короткие сессии (Пн/Ср/Пт или Сб).
 * Корректируем объём по факту выполнения + прогрессу.
 */

export const PLAN_HORIZON = {
  start: '2026-09-18',
  end: '2027-05-31',
  dojoDays: ['вт', 'чт'],
  homeHint: 'Дома 2–3 раза в неделю по 15–25 мин. Лучше регулярно и легко, чем редко и «до отказа».',
}

/**
 * Общая пометка для семей: рекомендации, не приказ; разминка; присмотр взрослых.
 */
export const SAFETY_NOTICE =
  'Платформа носит рекомендательный характер. Любые упражнения — только после разминки и под присмотром родителей (дома и в зале). Тренировка в зале без взрослого рядом не допускается. При боли, недомогании или сомнении в технике — остановиться и уточнить у тренера.'

export const GYM_NOTE =
  'В додзё есть стойки для жима лёжа и наклонная скамья под гантели. Если старшие идут в зал с родителями, теоретически можно добавить жим лёжа и присед со штангой/гантелями — только под присмотром взрослых и после разучивания техники с тренером. Это не обязательная часть домашнего плана.'

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
      'Гантели 0,5–1 кг; гиря 6 кг только с чистой техникой goblet/фермер; скакалка; скамья для пресса. Зал (жим/наклонная) — только с родителями, см. пометку ниже.',
  },
  senior: {
    id: 'senior',
    label: '14+ · своё тело + гири 6–8 кг',
    gear:
      'Гири 6 и 8 кг, разборные гантели, скамья для пресса, скакалка. В зале с родителями возможны жим лёжа на стойках и работа на наклонной скамье, присед — после разучивания с тренером.',
  },
}

/** Циклы сезона (~4 недели, последний до 31.05) */
export const PLAN_CYCLES = [
  {
    id: 'c1',
    start: '2026-09-18',
    end: '2026-10-15',
    title: 'База техники',
    focus: 'Чистая амплитуда: отжимания, планка, вис, присед без прыжка.',
  },
  {
    id: 'c2',
    start: '2026-10-16',
    end: '2026-11-12',
    title: 'Объём',
    focus: 'Чуть больше повторений/времени. Скакалка и пресс стабильно.',
  },
  {
    id: 'c3',
    start: '2026-11-13',
    end: '2026-12-10',
    title: 'Корпус и хват',
    focus: 'Планка (прямая + бок), вис, подводящие к подтягиваниям.',
  },
  {
    id: 'c4',
    start: '2026-12-11',
    end: '2027-01-07',
    title: 'Зимний ритм',
    focus: 'Не ломать привычку в каникулы: короткие домашние сессии.',
  },
  {
    id: 'c5',
    start: '2027-01-08',
    end: '2027-02-04',
    title: 'Сила тяги',
    focus: 'Подтягивания / негативы / низкая перекладина. Прыжки — дозированно.',
  },
  {
    id: 'c6',
    start: '2027-02-05',
    end: '2027-03-04',
    title: 'Взрыв и прыжок',
    focus: 'Прыжок в длину, берпи (упрощённые → полные).',
  },
  {
    id: 'c7',
    start: '2027-03-05',
    end: '2027-04-01',
    title: 'Смешанная сила',
    focus: 'ОФП + (для старших) гиря/гантели малым объёмом.',
  },
  {
    id: 'c8',
    start: '2027-04-02',
    end: '2027-04-29',
    title: 'Контроль формы',
    focus: 'Тесты маяков: отжимания, пресс, планка, подтягивания/вис, прыжок.',
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
      { name: 'Скакалка', dose: '2–3×30–60 прыжков', videoIds: ['rope_basic'] },
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
      { name: 'Прыжки на скакалке', dose: '2×20–40', videoIds: ['rope_basic'], note: 'Или лёгкие подскоки без скакалки' },
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
      { name: 'Goblet squat 6 кг или гантель у груди', dose: '3×8–12', videoIds: ['goblet'], note: 'Только если спина длинная' },
      { name: 'Фермерская 2×гантели/гиря в одной', dose: '3×20–40 м', videoIds: ['farmer'] },
      { name: 'Прыжки на скакалке', dose: '3×40–80', videoIds: ['rope_basic'] },
      { name: 'Махи гантелями 0,5–1 кг (Цзю)', dose: '2×45–90 с', videoIds: ['tszyu_light_db'] },
    ],
    power: [
      { name: 'Прыжок в длину', dose: '5–8 попыток', videoIds: ['longjump'] },
      { name: 'Берпи', dose: '3×5–10', videoIds: ['burpee'] },
      { name: 'Махи гирей 6 кг двумя руками', dose: '3×8–12', videoIds: ['kb_swing2'], note: 'В додзё или дома после разучивания' },
    ],
  },
  senior: {
    base: [
      { name: 'Отжимания', dose: '4×10–20', videoIds: ['pushup'] },
      { name: 'Пресс / скамья', dose: '4×15–30', videoIds: ['crunch'] },
      { name: 'Планка комплекс', dose: 'прямая + бок', videoIds: ['plank_forearm'] },
      { name: 'Подтягивания', dose: '3–5 подходов', videoIds: ['pullup', 'pullup_guide'] },
      { name: 'Goblet 8 кг / махи 6–8 кг', dose: '3×8–15', videoIds: ['goblet', 'kb_swing2'] },
      { name: 'Фермерская 6–8 кг', dose: '3×30–50 м', videoIds: ['farmer'] },
      { name: 'Жим гантелей стоя / тяга в наклоне', dose: '3×8–12', videoIds: ['db_press', 'db_row'] },
      { name: 'Прыжки на скакалке', dose: '3×60–120', videoIds: ['rope_basic'] },
    ],
    power: [
      { name: 'Прыжок в длину', dose: '6–8 попыток', videoIds: ['longjump'] },
      { name: 'Берпи', dose: '3×8–12', videoIds: ['burpee'] },
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
      observation: 'Додзё только вт/чт — прогресс даёт домашка.',
      action: `Дома 2–3×/нед: ${lines}`,
      affects: ['push', 'pull', 'crunch', 'plank', 'hang'],
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
      observation: 'Прыжок в длину и берпи — после базы техники.',
      action: 'С цикла «Сила тяги» / «Взрыв»: длина с места, берпи. Приземление мягкое, колени не заваливать внутрь.',
      affects: ['jump', 'burpee'],
    })
  }
  if (groupId === 'teen' || groupId === 'senior') {
    recs.push({
      id: 'load-note',
      status: 'active',
      cycleId,
      observation: 'Отягощения: малый вес, идеальная техника.',
      action:
        groupId === 'senior'
          ? 'Гири 6–8 кг: махи, goblet, фермер. Гантели — жим и тяга. Жим лёжа / присед в зале — только с родителями и после разучивания с тренером.'
          : 'Сначала гантели 0,5–1 кг и фермер/goblet 6 кг. Махи гирей — после разучивания в додзё. Зал — только под присмотром родителей.',
      affects: ['goblet', 'farmer'],
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
