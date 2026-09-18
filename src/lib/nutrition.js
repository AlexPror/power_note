import { NORMS } from '@/data/norms'
import { foodsByIds, macros } from '@/data/foods'
import { ageYears } from './age'

export function normFor(athlete) {
  const age = ageYears(athlete.dob)
  const hit = NORMS.find((n) => {
    if (age < n.minAge || age > n.maxAge) return false
    if (n.sex && n.sex !== athlete.sex) return false
    return true
  })
  return hit || NORMS[0]
}

export function dayMacros(day, foodIds) {
  const lib = foodsByIds(foodIds)
  let kcal = 0
  let p = 0
  let f = 0
  let c = 0
  const rows = []
  for (const item of day.items) {
    const food = lib.find((x) => x.id === item.id)
    if (!food) continue
    const m = macros(food, item.grams)
    kcal += m.kcal
    p += m.p
    f += m.f
    c += m.c
    rows.push({ ...food, grams: item.grams, ...m })
  }
  return {
    kcal: Math.round(kcal),
    p: Math.round(p * 10) / 10,
    f: Math.round(f * 10) / 10,
    c: Math.round(c * 10) / 10,
    rows,
  }
}
