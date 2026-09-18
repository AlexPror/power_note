/**
 * Каталог продуктов. Полный PDF Скурихина лежит в /books (не в репозитории).
 * Сюда — только строки на 100 г (или шт) с полем source.
 * Цифры с пометкой skurikhin — ориентир по таблицам химического состава;
 * сверьте с вашим изданием при необходимости.
 */
export const FOODS = [
  // —— частое (смешанные источники) ——
  { id: 'oat', name: 'Овсянка на молоке', cat: 'Завтрак', kcal: 110, p: 4.2, f: 3.2, c: 16, source: 'manual' },
  { id: 'egg', name: 'Яйцо С1 (1 шт)', cat: 'Завтрак', kcal: 75, p: 6.5, f: 5.2, c: 0.4, unitGrams: 1, unitLabel: 'шт', source: 'manual' },
  { id: 'tvorog5', name: 'Творог 5%', cat: 'Молочка', kcal: 121, p: 17.2, f: 5.0, c: 1.8, source: 'skurikhin' },
  { id: 'yogurt', name: 'Йогурт натуральный', cat: 'Молочка', kcal: 66, p: 5.0, f: 3.2, c: 3.5, source: 'manual' },
  { id: 'milk25', name: 'Молоко 2,5%', cat: 'Молочка', kcal: 52, p: 2.8, f: 2.5, c: 4.7, source: 'skurikhin' },
  { id: 'kefir', name: 'Кефир 2,5%', cat: 'Молочка', kcal: 50, p: 2.9, f: 2.5, c: 3.9, source: 'skurikhin' },
  { id: 'chicken', name: 'Курица варёная', cat: 'Мясо/рыба', kcal: 145, p: 25, f: 5, c: 0, source: 'skurikhin' },
  { id: 'cutlet', name: 'Котлета домашняя', cat: 'Мясо/рыба', kcal: 180, p: 12, f: 12, c: 6, source: 'manual' },
  { id: 'fish', name: 'Рыба запечённая', cat: 'Мясо/рыба', kcal: 120, p: 20, f: 4, c: 0, source: 'manual' },
  { id: 'soup', name: 'Суп домашний', cat: 'Обеды', kcal: 55, p: 3.0, f: 2.0, c: 6, source: 'manual' },
  { id: 'borscht', name: 'Борщ бабушки', cat: 'Обеды', kcal: 62, p: 3.2, f: 2.4, c: 7, source: 'manual' },
  { id: 'school', name: 'Обед в школе', cat: 'Обеды', kcal: 95, p: 4.5, f: 3.5, c: 12, source: 'manual' },
  { id: 'buckwheat', name: 'Гречка варёная', cat: 'Крупы', kcal: 110, p: 4.2, f: 1.1, c: 20, source: 'skurikhin' },
  { id: 'rice', name: 'Рис варёный', cat: 'Крупы', kcal: 116, p: 2.2, f: 0.5, c: 25, source: 'skurikhin' },
  { id: 'pasta', name: 'Макароны варёные', cat: 'Крупы', kcal: 124, p: 4.5, f: 1.2, c: 24, source: 'manual' },
  { id: 'potato', name: 'Картошка тушёная', cat: 'Крупы', kcal: 82, p: 2.0, f: 2.0, c: 14, source: 'manual' },
  { id: 'bread_rye', name: 'Хлеб ржаной', cat: 'Крупы', kcal: 220, p: 6.6, f: 1.2, c: 44, source: 'skurikhin' },
  { id: 'apple', name: 'Яблоко', cat: 'Фрукты', kcal: 52, p: 0.3, f: 0.2, c: 14, source: 'skurikhin' },
  { id: 'banana', name: 'Банан', cat: 'Фрукты', kcal: 96, p: 1.2, f: 0.2, c: 22, source: 'skurikhin' },
  { id: 'salad', name: 'Салат овощной', cat: 'Овощи', kcal: 35, p: 1.2, f: 1.5, c: 4, source: 'manual' },

  // —— морепродукты / рыба (ориентир по таблицам Скурихина, на 100 г) ——
  { id: 'mussel', name: 'Мидии варёные', cat: 'Морепродукты', kcal: 77, p: 11.5, f: 2.0, c: 3.3, source: 'skurikhin' },
  { id: 'squid', name: 'Кальмар варёный', cat: 'Морепродукты', kcal: 75, p: 18.0, f: 0.7, c: 0, source: 'skurikhin' },
  { id: 'shrimp', name: 'Креветки варёные', cat: 'Морепродукты', kcal: 95, p: 18.9, f: 2.2, c: 0, source: 'skurikhin' },
  { id: 'salmon', name: 'Сёмга / лосось', cat: 'Морепродукты', kcal: 153, p: 20.0, f: 8.1, c: 0, source: 'skurikhin' },
  { id: 'trout', name: 'Форель', cat: 'Морепродукты', kcal: 97, p: 19.2, f: 2.1, c: 0, source: 'skurikhin' },
  { id: 'pink_salmon', name: 'Горбуша', cat: 'Морепродукты', kcal: 140, p: 20.5, f: 6.5, c: 0, source: 'skurikhin' },
  { id: 'cod', name: 'Треска', cat: 'Морепродукты', kcal: 69, p: 16.0, f: 0.6, c: 0, source: 'skurikhin' },
  { id: 'pollock', name: 'Минтай', cat: 'Морепродукты', kcal: 72, p: 15.9, f: 0.9, c: 0, source: 'skurikhin' },
  { id: 'mackerel', name: 'Скумбрия', cat: 'Морепродукты', kcal: 191, p: 18.0, f: 13.2, c: 0, source: 'skurikhin' },
  { id: 'herring', name: 'Сельдь атлантическая', cat: 'Морепродукты', kcal: 161, p: 17.7, f: 10.0, c: 0, source: 'skurikhin' },
]

export const SOURCE_LABELS = {
  skurikhin: 'Скурихин',
  label: 'Этикетка',
  manual: 'Ручной ввод',
  openfoodfacts: 'Open Food Facts',
}

export function macros(food, grams) {
  const factor = food.unitGrams ? grams : grams / 100
  return {
    kcal: food.kcal * factor,
    p: food.p * factor,
    f: food.f * factor,
    c: food.c * factor,
  }
}

export function foodsByIds(ids) {
  return ids.map((id) => FOODS.find((f) => f.id === id)).filter(Boolean)
}
