import { BELTS } from '@/data/belts'

/** Профиль киокушинкай ИКО — шаблон группы «7 вершин» */
export const kyokushin = {
  id: 'kyokushin',
  name: 'Киокушинкай · ИКО Мацуи',
  shortName: '7 вершин',
  hasBelts: true,
  belts: BELTS,
  sessionKinds: [
    { id: 'dojo', label: 'Додзё', color: '#0a7a5c' },
    { id: 'kata', label: 'Ката', color: '#1a6f8a' },
    { id: 'ofp', label: 'ОФП', color: '#c45c28' },
    { id: 'home', label: 'Дома', color: '#5a8a6a' },
    { id: 'rest', label: 'Отдых', color: '#a0aea8' },
  ],
  /** Стартовые маяки (подсказки). Реальные серии — у ученика, динамически. */
  defaultBeacons: [
    { id: 'push', name: 'Отжимания', unit: 'повт.', layer: 'body' },
    { id: 'pull', name: 'Подтягивания', unit: 'повт.', layer: 'body' },
    { id: 'crunch', name: 'Пресс', unit: 'повт.', layer: 'body' },
    { id: 'rope', name: 'Скакалка', unit: 'прыжков', layer: 'body' },
    { id: 'hang', name: 'Вис на турнике', unit: 'сек', layer: 'body' },
    { id: 'jump', name: 'Прыжок в длину', unit: 'см', layer: 'body' },
    { id: 'burpee', name: 'Берпи', unit: 'повт.', layer: 'body' },
    { id: 'plank', name: 'Планка прямая', unit: 'сек', layer: 'plank' },
    { id: 'plankL', name: 'Планка боковая Л', unit: 'сек', layer: 'plank' },
    { id: 'plankR', name: 'Планка боковая П', unit: 'сек', layer: 'plank' },
    { id: 'goblet', name: 'Goblet squat', unit: 'кг×повт.', layer: 'load' },
    { id: 'farmer', name: 'Фермерская', unit: 'м', layer: 'load' },
  ],
  /** Разделы «Уроки» — только нужное сезону */
  videoSections: [
    { id: 'figures', label: 'Пути', blurb: 'Киокушинкай: учителя и чемпионы', kind: 'figures' },
    { id: 'kata', label: 'Киокушинкай', blurb: 'Этикет и энциклопедия' },
    { id: 'ofp', label: 'ОФП · ГТО', blurb: 'Отжимания, тяга, пресс, прыжок' },
    { id: 'plyo', label: 'Прыжки и берпи', blurb: 'Присед, берпи' },
    { id: 'pullprog', label: 'К подтягиваниям', blurb: 'Как научиться с нуля' },
    { id: 'plank', label: 'Планка', blurb: 'Предплечья / ладони' },
    { id: 'prep', label: 'Подводящие', blurb: 'Стена, мост, стул, кор' },
    { id: 'kettle', label: 'Гири', blurb: 'Махи, goblet, фермер (10+)' },
    { id: 'dumbbell', label: 'Гантели', blurb: 'Жим, тяга, 0,5–1 кг' },
    { id: 'rope', label: 'Скакалка', blurb: 'Прыжки на скакалке' },
  ],
}

/** Заготовки под другие виды — структура без демо-учеников */
export const hockey = {
  id: 'hockey',
  name: 'Хоккей',
  shortName: 'Хоккей',
  hasBelts: false,
  belts: [],
  sessionKinds: [
    { id: 'ice', label: 'Лёд', color: '#1a6f8a' },
    { id: 'ofp', label: 'ОФП', color: '#c45c28' },
    { id: 'game', label: 'Игра', color: '#0a7a5c' },
    { id: 'home', label: 'Дома', color: '#5a8a6a' },
    { id: 'rest', label: 'Отдых', color: '#a0aea8' },
  ],
  defaultBeacons: [
    { id: 'shuttle', name: 'Челночный', unit: 'сек', layer: 'body' },
    { id: 'squat', name: 'Присед', unit: 'повт.', layer: 'body' },
    { id: 'push', name: 'Отжимания', unit: 'повт.', layer: 'body' },
  ],
  videoSections: [
    { id: 'ofp', label: 'ОФП', blurb: 'Силовая подготовка' },
    { id: 'skill', label: 'Катание', blurb: 'Техника на льду' },
  ],
}

export const dance = {
  id: 'dance',
  name: 'Танцы',
  shortName: 'Танцы',
  hasBelts: false,
  belts: [],
  sessionKinds: [
    { id: 'class', label: 'Класс', color: '#1a6f8a' },
    { id: 'rehearsal', label: 'Репетиция', color: '#0a7a5c' },
    { id: 'ofp', label: 'ОФП', color: '#c45c28' },
    { id: 'show', label: 'Выступление', color: '#c45c28' },
    { id: 'rest', label: 'Отдых', color: '#a0aea8' },
  ],
  defaultBeacons: [
    { id: 'plank', name: 'Планка', unit: 'сек', layer: 'plank' },
    { id: 'jump', name: 'Прыжок', unit: 'см', layer: 'body' },
  ],
  videoSections: [
    { id: 'ofp', label: 'ОФП', blurb: 'Силовая подготовка' },
    { id: 'skill', label: 'Связки', blurb: 'Техника и комбинации' },
  ],
}

export const PROFILES = { kyokushin, hockey, dance }

export function profileById(id) {
  return PROFILES[id] || kyokushin
}

export function kindLabel(profile, kindId) {
  return profile.sessionKinds.find((k) => k.id === kindId)?.label || kindId
}

export function kindColor(profile, kindId) {
  return profile.sessionKinds.find((k) => k.id === kindId)?.color || '#0a7a5c'
}
