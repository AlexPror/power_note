/** ИКО Мацуи: полоски на 9 / 7 / 5 / 3 кю */
export const BELTS = [
  { kyu: 10, name: '10 кю', color: 'белый', stripe: false, hex: '#f4f1ea', ink: '#3a3a36' },
  { kyu: 9, name: '9 кю', color: 'оранжевый', stripe: true, hex: '#e07a2a', ink: '#fff' },
  { kyu: 8, name: '8 кю', color: 'оранжевый', stripe: false, hex: '#e07a2a', ink: '#fff' },
  { kyu: 7, name: '7 кю', color: 'синий', stripe: true, hex: '#2a5f9a', ink: '#fff' },
  { kyu: 6, name: '6 кю', color: 'синий', stripe: false, hex: '#2a5f9a', ink: '#fff' },
  { kyu: 5, name: '5 кю', color: 'жёлтый', stripe: true, hex: '#d4b43a', ink: '#2a2410' },
  { kyu: 4, name: '4 кю', color: 'жёлтый', stripe: false, hex: '#d4b43a', ink: '#2a2410' },
  { kyu: 3, name: '3 кю', color: 'зелёный', stripe: true, hex: '#2f7a4a', ink: '#fff' },
  { kyu: 2, name: '2 кю', color: 'зелёный', stripe: false, hex: '#2f7a4a', ink: '#fff' },
  { kyu: 1, name: '1 кю', color: 'коричневый', stripe: false, hex: '#6b4423', ink: '#fff' },
  { kyu: 0, name: '1 дан', color: 'чёрный', stripe: false, hex: '#161616', ink: '#fff' },
]

export function beltByKyu(kyu) {
  return BELTS.find((b) => b.kyu === kyu) || BELTS[0]
}

export function beltLabel(kyu) {
  const b = beltByKyu(kyu)
  return b.stripe ? `${b.name} · ${b.color} с полоской` : `${b.name} · ${b.color}`
}
