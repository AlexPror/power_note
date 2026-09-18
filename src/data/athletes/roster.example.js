import { buildAthlete } from './build'

/**
 * Пример ученика (без реальных ПДн).
 * Скопируйте файл как roster.local.js и заполните группу.
 *
 * pinHash = SHA-256(`${slug}:${pin}`) — см. src/lib/auth.js / hashPin.
 * planGroup: junior | prep | teen | senior
 */
export const ATHLETES = [
  buildAthlete({
    slug: 'demo',
    firstName: 'Имя',
    lastName: 'Фамилия',
    sex: 'm',
    dob: '2015-01-15',
    kg: 40,
    planGroup: 'junior',
    pinHash: 'replace-with-sha256-of-demo-pin',
    notes: 'Пример кабинета. Реальные данные — только в roster.local.js (в git не попадает).',
  }),
]
