/**
 * Базовые требования к аттестации на цветные пояса (ИКО).
 * Источник: таблица «Базовые требования и сроки подготовки к аттестации».
 * Цифры — минимум для допуска на следующий кю.
 */

export const ATTESTATION_NOTE =
  'Это минимальный уровень к аттестации на следующую квалификацию. «3 месяца» = не меньше 4 часов в неделю в додзё на протяжении минимум 3 месяцев (48 часов). «6 месяцев» — то же из расчёта 96 часов.'

export const ATTESTATION_TITLE = 'Аттестация · цветные пояса'
export const ATTESTATION_LEAD = 'Ката, ОФП и кумитэ по кю. Для семьи — ориентир; решение о допуске за тренером.'

/** @typedef {{ kyu: number, months: number, hours: number, kata: string[], push: number, squat: number, crunch: number, kumite: number, handstand: number }} AttestationRow */

/** @type {AttestationRow[]} */
export const ATTESTATION = [
  {
    kyu: 11,
    months: 3,
    hours: 48,
    kata: ['Тайкёку соно ичи', 'Тайкёку соно ни', 'Сокуги тайкёку соно ичи'],
    push: 10,
    squat: 10,
    crunch: 10,
    kumite: 1,
    handstand: 20,
  },
  {
    kyu: 10,
    months: 3,
    hours: 48,
    kata: ['Тайкёку соно сан'],
    push: 20,
    squat: 20,
    crunch: 20,
    kumite: 2,
    handstand: 30,
  },
  {
    kyu: 9,
    months: 3,
    hours: 48,
    kata: ['Сокуги тайкёку соно ни', 'Сокуги тайкёку соно сан'],
    push: 30,
    squat: 30,
    crunch: 30,
    kumite: 3,
    handstand: 30,
  },
  {
    kyu: 8,
    months: 3,
    hours: 48,
    kata: ['Пинан соно ичи'],
    push: 40,
    squat: 40,
    crunch: 40,
    kumite: 4,
    handstand: 40,
  },
  {
    kyu: 7,
    months: 3,
    hours: 48,
    kata: ['Пинан соно ни', 'Санчин'],
    push: 50,
    squat: 50,
    crunch: 50,
    kumite: 5,
    handstand: 40,
  },
  {
    kyu: 6,
    months: 3,
    hours: 48,
    kata: ['Пинан соно сан', 'Янцу'],
    push: 60,
    squat: 60,
    crunch: 60,
    kumite: 6,
    handstand: 50,
  },
  {
    kyu: 5,
    months: 3,
    hours: 48,
    kata: ['Пинан соно ён', 'Цукино ката'],
    push: 70,
    squat: 70,
    crunch: 70,
    kumite: 7,
    handstand: 50,
  },
  {
    kyu: 4,
    months: 6,
    hours: 96,
    kata: ['Пинан соно го', 'Гекисай соно ичи'],
    push: 80,
    squat: 80,
    crunch: 80,
    kumite: 8,
    handstand: 60,
  },
  {
    kyu: 3,
    months: 6,
    hours: 96,
    kata: [
      'Гекисай соно ни',
      'Тэкки соно ичи',
      'Тайкёку соно ичи ура',
      'Тайкёку соно ни ура',
      'Тайкёку соно сан ура',
    ],
    push: 90,
    squat: 90,
    crunch: 90,
    kumite: 9,
    handstand: 60,
  },
  {
    kyu: 2,
    months: 6,
    hours: 96,
    kata: ['Гекисай соно ичи ура', 'Гекисай соно ни ура', 'Тэкки соно ни', 'Тэншо'],
    push: 100,
    squat: 100,
    crunch: 100,
    kumite: 10,
    handstand: 90,
  },
  {
    kyu: 1,
    months: 6,
    hours: 96,
    kata: [
      'Пинан соно ичи ура',
      'Пинан соно ни ура',
      'Пинан соно сан ура',
      'Пинан соно ён ура',
      'Пинан соно го ура',
      'Сайфа',
    ],
    push: 100,
    squat: 100,
    crunch: 100,
    kumite: 10,
    handstand: 90,
  },
]

export function attestationByKyu(kyu) {
  return ATTESTATION.find((r) => r.kyu === kyu) || null
}

/** Требования на следующий кю (то, к чему готовимся сейчас). */
export function nextAttestation(currentKyu) {
  if (currentKyu == null || currentKyu <= 0) return null
  const target = currentKyu - 1
  return attestationByKyu(target)
}

export function prepLabel(row) {
  if (!row) return ''
  return `${row.months} мес. · ${row.hours} ч`
}
