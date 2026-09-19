/**
 * Реестр учеников.
 * Реальные ФИО — только в roster.local.js (gitignore).
 * Демо «Вася Пупкин» всегда в списке — пример живого кабинета.
 */
import { DEMO_ATHLETE } from './demo'

const localModules = import.meta.glob('./roster.local.js', { eager: true })
const local = Object.values(localModules)[0]
const real = local?.ATHLETES ?? []

export const ATHLETES = [DEMO_ATHLETE, ...real.filter((a) => a.slug !== DEMO_ATHLETE.slug)]

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
    isDemo: Boolean(a.isDemo),
  }
}
