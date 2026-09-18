/**
 * Реестр учеников.
 * Реальные ФИО, даты рождения, вес, PIN — только в roster.local.js (gitignore).
 * Без локального файла список пуст: скопируйте roster.example.js → roster.local.js.
 */
const localModules = import.meta.glob('./roster.local.js', { eager: true })
const local = Object.values(localModules)[0]

export const ATHLETES = local?.ATHLETES ?? []

export function athleteBySlug(slug) {
  return ATHLETES.find((a) => a.slug === slug) || null
}

export function publicAthlete(a) {
  return {
    slug: a.slug,
    firstName: a.firstName,
    lastName: a.lastName,
    kyu: a.kyu,
    dob: a.dob,
    sex: a.sex,
    updated: a.updated,
  }
}
