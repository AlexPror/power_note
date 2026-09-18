const REF = new Date('2026-09-15T12:00:00')

export function ageYears(dob, on = REF) {
  const d = new Date(`${dob}T00:00:00`)
  let age = on.getFullYear() - d.getFullYear()
  const m = on.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && on.getDate() < d.getDate())) age -= 1
  return age
}

export function showWeightOnNow(age) {
  return age >= 13
}

export function fullName(a) {
  return `${a.lastName} ${a.firstName}`
}

export function formatKg(kg) {
  return Number(kg).toFixed(1).replace('.', ',')
}
