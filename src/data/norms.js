/**
 * Ориентиры БЖУ по табл. 21 МР 2.3.1.0253-21 (Роспотребнадзор, 22.07.2021).
 * Рекомендательно, не назначение.
 */
export const NORMS = [
  { id: '7-10', minAge: 7, maxAge: 10, sex: null, protein: 63, fat: 70, carbs: 305, kcal: 2100 },
  { id: '11-14-m', minAge: 11, maxAge: 14, sex: 'm', protein: 75, fat: 83, carbs: 365, kcal: 2500 },
  { id: '11-14-f', minAge: 11, maxAge: 14, sex: 'f', protein: 69, fat: 77, carbs: 334, kcal: 2300 },
  { id: '15-17-m', minAge: 15, maxAge: 17, sex: 'm', protein: 87, fat: 97, carbs: 421, kcal: 2900 },
  { id: '15-17-f', minAge: 15, maxAge: 17, sex: 'f', protein: 75, fat: 83, carbs: 363, kcal: 2500 },
]

export const NUTRITION_LINKS = [
  {
    title: 'МР 2.3.1.0253-21 — нормы РФ (сутки)',
    href: 'https://www.rospotrebnadzor.ru/documents/details.php?ELEMENT_ID=18979',
  },
  {
    title: 'PDF методических рекомендаций',
    href: 'https://www.rospotrebnadzor.ru/upload/iblock/789/1.-mr-2.3.1.0253_21-normy-pishchevykh-veshchestv.pdf',
  },
  {
    title: 'ФИЦ питания — база состава продуктов',
    href: 'https://ion.ru/nauka/baza-dannykh-khimicheskogo-sostava/',
  },
  {
    title: 'EFSA — белок, DRV 2012',
    href: 'https://www.efsa.europa.eu/en/efsajournal/pub/2557',
  },
  {
    title: 'SDA — питание юного спортсмена, 2014',
    href: 'https://doi.org/10.1123/ijsnem.2014-0031',
  },
  {
    title: 'AAP — вес у юных спортсменов, 2017',
    href: 'https://doi.org/10.1542/peds.2017-1871',
  },
]

export const NUTRITION_DISCLAIMER =
  'Суточные ориентиры белка, жиров, углеводов и калорий — по МР 2.3.1.0253-21 (Роспотребнадзор). Состав продуктов на 100 г — преимущественно по таблицам химического состава российских продуктов (Скурихин / ФИЦ питания); при наличии этикетки приоритет у неё. Это ориентиры для здорового роста, а не индивидуальное назначение врача. Данные носят рекомендательный характер и ни к чему не призывают: не являются советом худеть, набирать вес, ограничивать продукты или принимать добавки. Решение вести учёт еды остаётся за семьёй. При заболеваниях, аллергии и вопросах роста обратитесь к педиатру. Приложение не заменяет медицинскую консультацию.'
