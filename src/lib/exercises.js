import { inPeriod } from './period'
import { trendOf, overallTrend } from './trends'

/** Filter exercise points to view period; recompute current from last point in range */
export function exercisesInPeriod(exercises, period) {
  return (exercises || [])
    .map((ex) => {
      const points = (ex.points || []).filter((p) => inPeriod(p.date, period))
      if (!points.length) return null
      const last = points[points.length - 1]
      return {
        ...ex,
        points,
        current: last.v,
        trendMeta: trendOf(points),
      }
    })
    .filter(Boolean)
}

export function groupExercises(exercises) {
  const layers = ['body', 'plank', 'load', 'skill']
  const groups = {}
  for (const layer of layers) {
    groups[layer] = exercises.filter((e) => e.layer === layer)
  }
  return groups
}

export function overallTrendInPeriod(exercises, period) {
  const filtered = exercisesInPeriod(exercises, period)
  return overallTrend(filtered)
}

export const LAYER_LABELS = {
  body: 'Маяки',
  plank: 'Планка',
  load: 'Отягощения',
  skill: 'Навык / спорт',
}
