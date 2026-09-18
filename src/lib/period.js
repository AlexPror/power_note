const MONTHS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
const STORAGE_KEY = '7v_period'

/** Опорная «сегодня» для демо (совпадает с updated учеников) */
export const REF_TODAY = '2026-09-18'

export function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d
}

export function toIso(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDay(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function formatDayLong(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function periodLabel(startIso, endIso) {
  const a = new Date(`${startIso}T00:00:00`)
  const b = new Date(`${endIso}T00:00:00`)
  return `${a.getDate()} ${MONTHS[a.getMonth()]} — ${b.getDate()} ${MONTHS[b.getMonth()]}`
}

/** Legacy helper: N weeks from start */
export function periodOf(startIso, weeks = 4) {
  const end = addDays(startIso, weeks * 7 - 1)
  const endIso = toIso(end)
  return {
    startIso,
    endIso,
    start: new Date(`${startIso}T00:00:00`),
    end,
    label: periodLabel(startIso, endIso),
    weeks,
    mode: 'weeks4',
  }
}

export function inPeriod(iso, period) {
  if (!period?.startIso || !period?.endIso) return true
  return iso >= period.startIso && iso <= period.endIso
}

export const PERIOD_PRESETS = [
  { id: 'weeks4', label: '4 недели' },
  { id: 'weeks2', label: '2 недели' },
  { id: 'week', label: 'Эта неделя' },
  { id: 'all', label: 'Весь журнал' },
  { id: 'custom', label: 'Свой' },
]

function mondayOf(iso) {
  const d = new Date(`${iso}T00:00:00`)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return toIso(d)
}

/**
 * Resolve view range for an athlete.
 * @param {object} athlete
 * @param {{ mode: string, from?: string, to?: string }} selection
 * @param {string} [todayIso]
 */
export function resolvePeriod(athlete, selection, todayIso = REF_TODAY) {
  const mode = selection?.mode || 'weeks4'
  const rows = athlete.trainRows || []
  const dates = rows.map((r) => r.date).sort()
  const minDate = dates[0] || athlete.periodStart || todayIso
  const maxDate = dates[dates.length - 1] || todayIso

  if (mode === 'all') {
    return {
      mode,
      startIso: minDate,
      endIso: maxDate > todayIso ? maxDate : todayIso,
      label: periodLabel(minDate, maxDate > todayIso ? maxDate : todayIso),
      weeks: null,
    }
  }

  if (mode === 'custom' && selection.from && selection.to) {
    const startIso = selection.from <= selection.to ? selection.from : selection.to
    const endIso = selection.from <= selection.to ? selection.to : selection.from
    return {
      mode,
      startIso,
      endIso,
      label: periodLabel(startIso, endIso),
      weeks: null,
    }
  }

  if (mode === 'week') {
    const startIso = mondayOf(todayIso)
    const endIso = toIso(addDays(startIso, 6))
    return { mode, startIso, endIso, label: periodLabel(startIso, endIso), weeks: 1 }
  }

  const weeks = mode === 'weeks2' ? 2 : 4
  const endIso = todayIso
  const startIso = toIso(addDays(endIso, -(weeks * 7 - 1)))
  return {
    mode: mode === 'weeks2' ? 'weeks2' : 'weeks4',
    startIso,
    endIso,
    label: periodLabel(startIso, endIso),
    weeks,
  }
}

export function readPeriodSelection(slug) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}:${slug}`)
    if (!raw) return { mode: 'weeks4' }
    return JSON.parse(raw)
  } catch {
    return { mode: 'weeks4' }
  }
}

export function writePeriodSelection(slug, selection) {
  localStorage.setItem(`${STORAGE_KEY}:${slug}`, JSON.stringify(selection))
}

/** Cycle whose range overlaps the view period (prefer latest) */
export function cycleForPeriod(athlete, period) {
  const cycles = athlete.cycles || []
  if (!cycles.length) return null
  const hit = cycles
    .filter((c) => c.start <= period.endIso && c.end >= period.startIso)
    .sort((a, b) => b.end.localeCompare(a.end))
  return hit[0] || null
}
