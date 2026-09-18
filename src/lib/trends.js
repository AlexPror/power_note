export function trendOf(points) {
  if (!points || points.length < 2) return { key: 'few', label: 'мало данных' }
  const first = points[0].v
  const last = points[points.length - 1].v
  if (first === 0 && last === 0) return { key: 'plateau', label: 'плато' }
  const base = Math.max(Math.abs(first), 1)
  const d = (last - first) / base
  if (d > 0.08) return { key: 'up', label: 'растёт' }
  if (d < -0.08) return { key: 'down', label: 'нужно внимание' }
  return { key: 'plateau', label: 'плато' }
}

export function overallTrend(exercises) {
  const body = exercises.filter((e) => e.layer === 'body' || e.layer === 'plank')
  const votes = body.map((e) => trendOf(e.points).key)
  const up = votes.filter((v) => v === 'up').length
  const down = votes.filter((v) => v === 'down').length
  if (up >= down && up > 0) return { key: 'up', label: 'растёт' }
  if (down > up) return { key: 'down', label: 'нужно внимание' }
  return { key: 'plateau', label: 'плато' }
}

export function sessionCounts(rows, period) {
  const inP = rows.filter((r) => r.date >= period.startIso && r.date <= period.endIso)
  const kinds = { dojo: 0, kata: 0, ofp: 0, home: 0, rest: 0 }
  for (const r of inP) kinds[r.kind] = (kinds[r.kind] || 0) + 1
  return {
    total: inP.filter((r) => r.kind !== 'rest').length,
    rest: kinds.rest,
    kinds,
  }
}
