import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '../src/data/figures.js')

const FIGURES_INTRO = {
  title: 'Пути',
  lead:
    'Спортсмены, тренеры и популяризаторы единоборств: путь, цифры, достижения и факты из подготовки. Карточки сгруппированы по видам спорта; отдельные блоки — hyakunin kumite, тренировки и материалы. Раздел пополняется.',
}

const FIGURE_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'kyokushin', label: 'Киокушинкай' },
  { id: 'karate', label: 'Каратэ' },
  { id: 'boxing', label: 'Бокс' },
  { id: 'kick', label: 'Кикбоксинг · K-1' },
  { id: 'kungfu', label: 'Кунг-фу · вин-чунь' },
  { id: 'mma', label: 'MMA' },
  { id: 'wrestling', label: 'Борьба' },
  { id: 'hand', label: 'Рукопашный · униббой' },
  { id: 'culture', label: 'Популяризаторы' },
  { id: 'coach', label: 'Тренеры · школы' },
]

function tKyok(v = '2 тренировки в день на сборах; 6 дней в неделю в подготовке к турниру.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Уважение к додзё, старшим и партнёрам',
      'Ежедневная отработка кихона: стойки, удары, блоки',
      'Регулярный кумитэ и контролируемый полный контакт',
    ],
    sample: [
      { name: 'Разминка', detail: 'Бег, растяжка, удары в воздухе, базовые связки.' },
      { name: 'Кихон и кумитэ', detail: 'Сотни повторений техники; спарринг с нарастающей интенсивностью.' },
      { name: 'Сила / тамэсивари', detail: 'Отжимания, пресс, работа по makiwara; укрепление кисти и корпуса.' },
    ],
    volume: v,
  }
}

function tCoach(v = '6 дней в неделю; утренние и вечерние группы; сборы перед чемпионатами.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Планирование цикла: база, объём, пик к турниру',
      'Контроль техники и дисциплины в зале',
      'Индивидуальная работа с бойцами сборной и клуба',
    ],
    sample: [
      { name: 'Разминка', detail: 'Общая физическая подготовка группы; мобility и координация.' },
      { name: 'Техника / спарринг', detail: 'Разбор ошибок, работа в парах, моделирование турнирных ситуаций.' },
      { name: 'Сила / выносливость', detail: 'Силовые схемы, интервалы, контроль восстановления.' },
    ],
    volume: v,
  }
}

function tBox(v = '6–8 тренировок в неделю; 2–3 недели перед боем — двухразовые занятия.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Режим сна и веса; отказ от лишней нагрузки вне зала',
      'Работа на лапах, мешке, спарринг по плану тренера',
      'Укрепление кистей, плечевого пояса и корпуса',
    ],
    sample: [
      { name: 'Разминка', detail: 'Скакалка, растяжка, shadow boxing, лёгкая работа на лапах.' },
      { name: 'Техника / спарринг', detail: 'Комбинации, контратаки, контролируемый спарринг с защитой.' },
      { name: 'Сила / выносливость', detail: 'Мешок, функциональная работа, бег, упражнения на выносливость рук.' },
    ],
    volume: v,
  }
}

function tMma(v = '2 тренировки в день на сборе: борьба утром, ударка или функционал вечером.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Сбалансированная подготовка: борьба, ударка, физика',
      'Контроль веса и восстановления между сессиями',
      'Разбор соперника и тактика под конкретный бой',
    ],
    sample: [
      { name: 'Разминка', detail: 'Движение, растяжка, лёгкая борьба или shadow work.' },
      { name: 'Техника / спарринг', detail: 'Партнёрская работа в клетке или на ковре; спарринг по секциям.' },
      { name: 'Сила / выносливость', detail: 'Силовой зал, интервалы, работа на захват и контроль.' },
    ],
    volume: v,
  }
}

function tWrest(v = '2–3 тренировки в день на сборе; ежедневная работа в партере и стойке.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Строгий режим и контроль веса',
      'Тысячи повторений базовых приёмов и связок',
      'Спарринг на ковре с разной интенсивностью',
    ],
    sample: [
      { name: 'Разминка', detail: 'Бег, подвижность, разминочная борьба.' },
      { name: 'Техника / спарринг', detail: 'Отработка захватов, переводов, работа в партере.' },
      { name: 'Сила / выносливость', detail: 'Специальная силовая подготовка, носилки, утяжелённая работа.' },
    ],
    volume: v,
  }
}

function tKick(v = '6 дней в неделю; работа на мешках, лапах и спарринг по правилам K-1.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'База из каратэ или кикбоксинга: стойка, удар ногой, дистанция',
      'Клинч и работа в углу по правилам турнира',
      'Контроль веса и восстановление между раундами',
    ],
    sample: [
      { name: 'Разминка', detail: 'Растяжка, удары по воздуху, работа на скорость.' },
      { name: 'Техника / спарринг', detail: 'Комбинации рук и ног; спарринг с защитой и контролем силы.' },
      { name: 'Сила / выносливость', detail: 'Мешок, колени, корпус; интервальная работа на выносливость.' },
    ],
    volume: v,
  }
}

function tKung(v = 'Ежедневная отработка форм, чи-сао и базовых принципов близкой дистанции.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Постоянная отработка базы: стойка, центр, короткий удар',
      'Парная работа рук (чи-сао) и контролируемый контакт',
      'Уважение к линии учителя и последовательность в практике',
    ],
    sample: [
      { name: 'Разминка', detail: 'Суставная гимнастика, формы, движение на линии.' },
      { name: 'Техника / спарринг', detail: 'Чи-сао, отработка атак и контратак на близкой дистанции.' },
      { name: 'Сила / выносливость', detail: 'Деревянный манекен, удары по мешку, работа на пресс и ноги.' },
    ],
    volume: v,
  }
}

function tCulture(v = 'Ежедневная работа над координацией, силой и элементами разных школ под задачу съёмки или сцены.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Регулярные занятия даже в плотном графике съёмок',
      'Безопасность партнёра и постановка трюка',
      'Поддержание формы: сила, гибкость, скорость',
    ],
    sample: [
      { name: 'Разминка', detail: 'Растяжка, базовые стойки, разминочные связки.' },
      { name: 'Техника / спарринг', detail: 'Отработка сцен боя, акробатика, работа с реквизитом.' },
      { name: 'Сила / выносливость', detail: 'Функциональные упражнения, бег, силовая работа по программе.' },
    ],
    volume: v,
  }
}

function tKarate(v = '5–6 тренировок в неделю; ката, кихон и контролируемый кумитэ.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Уважение к додзё и последовательность в практике',
      'Отработка ката и базовой техники',
      'Спарринг по правилам турнира или школы',
    ],
    sample: [
      { name: 'Разминка', detail: 'Растяжка, базовые удары и перемещения.' },
      { name: 'Техника / спарринг', detail: 'Ката, кихон, работа в парах.' },
      { name: 'Сила / выносливость', detail: 'Укрепление корпуса, работа на makiwara или мешке.' },
    ],
    volume: v,
  }
}

function tHand(v = '3–5 тренировок в неделю; техника, спарринг и силовая подготовка по регламенту.') {
  return {
    title: 'Тренировки и дисциплина',
    discipline: [
      'Соблюдение правил и этики на татами',
      'Отработка ударной техники, бросков и удержаний по регламенту',
      'Контроль нагрузки и защитная экипировка на спарринге',
    ],
    sample: [
      { name: 'Разминка', detail: 'Бег, растяжка, базовые движения и падения.' },
      { name: 'Техника / спарринг', detail: 'Комбинации ударов и захватов; контролируемый спарринг.' },
      { name: 'Сила / выносливость', detail: 'Силовые упражнения, работа на корпус и хват.' },
    ],
    volume: v,
  }
}

const PHOTOS = {
  oyama: ['https://upload.wikimedia.org/wikipedia/commons/7/7e/Mas_Oyama.jpg', 'Масутацу Ояма'],
  'bruce-lee': ['https://upload.wikimedia.org/wikipedia/commons/c/ca/Bruce_Lee_1973.jpg', 'Брюс Ли, 1973'],
  'jackie-chan': ['https://upload.wikimedia.org/wikipedia/commons/8/82/Jackie_Chan_July_2008.jpg', 'Джеки Чан'],
  'chuck-norris': ['https://upload.wikimedia.org/wikipedia/commons/2/2e/Chuck_Norris_May_2015.jpg', 'Чак Норрис'],
  fedor: ['https://upload.wikimedia.org/wikipedia/commons/4/4f/Fedor_Emelianenko.jpg', 'Фёдор Емельяненко'],
  khabib: ['https://upload.wikimedia.org/wikipedia/commons/9/9b/Khabib_Nurmagomedov_2019.jpg', 'Хабиб Нурмагомедов'],
  karelin: ['https://upload.wikimedia.org/wikipedia/commons/5/5e/Alexander_Karelin_1988.jpg', 'Александр Карелин'],
  tszyu: ['https://upload.wikimedia.org/wikipedia/commons/4/4a/Kostya_Tszyu_2011.jpg', 'Константин Цзю'],
  hug: ['https://upload.wikimedia.org/wikipedia/commons/6/6a/Andy_Hug_1996.jpg', 'Энди Хюг'],
  ali: ['https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_NYWTS.jpg', 'Мохаммед Али'],
  tyson: ['https://upload.wikimedia.org/wikipedia/commons/e/e2/Mike_Tyson_Photoshoot.jpg', 'Майк Тайсон'],
  klitschko: ['https://upload.wikimedia.org/wikipedia/commons/5/5e/Vitali_Klitschko_2010.jpg', 'Владимир Кличко'],
  lomachenko: ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Vasyl_Lomachenko_2018.jpg', 'Василий Ломаченко'],
  funakoshi: ['https://upload.wikimedia.org/wikipedia/commons/3/3e/Gichin_Funakoshi_1954.jpg', 'Гичин Фунакоси'],
  schilt: ['https://upload.wikimedia.org/wikipedia/commons/4/4c/Semmy_Schilt_2010.jpg', 'Семи Шилт'],
  hoost: ['https://upload.wikimedia.org/wikipedia/commons/8/8d/Ernesto_Hoost_2006.jpg', 'Эрнesto Hoost'],
  'jet-li': ['https://upload.wikimedia.org/wikipedia/commons/0/0c/Jet_Li_2006.jpg', 'Джет Ли'],
  mcgregor: ['https://upload.wikimedia.org/wikipedia/commons/4/48/Conor_McGregor_2015.jpg', 'Конор Макгрегор'],
  gsp: ['https://upload.wikimedia.org/wikipedia/commons/3/3a/Georges_St-Pierre.jpg', 'Жорж Сен-Пьер'],
  makhachev: ['https://upload.wikimedia.org/wikipedia/commons/7/7a/Islam_Makhachev_2022.jpg', 'Ислам Махачев'],
  saitiev: ['https://upload.wikimedia.org/wikipedia/commons/9/9e/Buvaisar_Saitiev.jpg', 'Бувайсар Сайтиев'],
  medved: ['https://upload.wikimedia.org/wikipedia/commons/2/2a/Alexander_Medved_1964.jpg', 'Александр Медведь'],
}

function applyPhoto(f) {
  const p = PHOTOS[f.id]
  if (p) {
    f.photo = p[0]
    f.photoAlt = p[1]
  }
}

const PATCH = {
  oyama: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tKyok('Горная практика на Синобу — суровый режим; в додзё — многократные тренировки в день.'),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'легенда',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '1950-е (по легенде — трижды)',
      note: 'Ояма заявлял о прохождении испытания три раза; детальный счёт в открытых источниках не верифицирован. Источник: открытые сводки / Википедия / kyokushin archives.',
    },
    videos: [{ label: 'Документальные материалы (Википедия)', href: 'https://en.wikipedia.org/wiki/Mas_Oyama' }],
  },
  matsui: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tKyok(),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: '75–12–13',
      wins: 75,
      losses: 12,
      draws: 13,
      other: 46,
      otherLabel: 'ippon',
      time: '2 ч 24 мин',
      date: '18.04.1986',
      note: 'Часть боёв — с деревянными палочками в руках. Источник: открытые сводки / Википедия / kyokushin archives.',
    },
    record: {
      title: 'Турниры',
      wins: null,
      losses: null,
      draws: null,
      places: [
        { place: 'IV', event: 'All Japan (1980)' },
        { place: '3', event: 'All Japan (1981)' },
        { place: '3', event: 'All Japan (1982)' },
        { place: 'VIII', event: 'All Japan (1983)' },
        { place: '3', event: 'All Japan (1984)' },
        { place: '1', event: 'All Japan (1985)' },
        { place: '1', event: 'All Japan (1986)' },
        { place: '1', event: '4-й абсолютный чемпионат мира (1987)' },
      ],
      note: 'Hyakunin kumite — отдельный блок. Карьера ~50 из 56 боёв — Finding Karate. Источник: открытые сводки / Википедия.',
    },
    videos: [{ label: 'Сёкэй Мацуи (Википедия)', href: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%86%D1%83%D0%B8,_%D0%A1%D1%91%D0%BA%D1%8D%D0%B9' }],
  },
  midori: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tKyok(),
  },
  arneil: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tCoach('1960-е — подготовка в Японии; позже — тренерские сборы сборной GB.'),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (1965)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '21.05.1965',
      note: 'Первый после Оямы; все 100 боёв за один день. Детальный счёт в открытых источниках неполный. Источник: открытые сводки / Википедия / kyokushin archives.',
    },
  },
  'nakamura-tadashi': {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tCoach('Seido — акцент на этику и ежедневную практику в сети додзё.'),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (1965)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '15.10.1965',
      note: 'Прохождение подтверждено в сводках kyokushin; детальный W-L в открытых источниках неполный. Источник: открытые сводки / Википедия / kyokushin archives.',
    },
  },
  royama: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tCoach() },
  filho: {
    categories: ['kyokushin'],
    sport: 'Киокушинкай',
    training: tKyok('Перед hyakunin — до 8 часов в день; до 50–80 боёв в неделю на подготовке.'),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: '76–0–24',
      wins: 76,
      losses: 0,
      draws: 24,
      other: 26,
      otherLabel: 'ippon',
      time: '3 ч 8 мин',
      date: '22.03.1995',
      note: 'Япония (основной счёт). Ранее в Бразилии (фев. 1995): 68 побед (41 ippon), 32 ничьи, 0 поражений за ~2 ч 45 мин. Единственный после Оямы, прошедший испытание дважды. Источник: открытые сводки / Finding Karate / kyokushin archives.',
    },
    videos: [{ label: 'Francisco Filho (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Francisco_Filho_(martial_artist)' }],
  },
  hug: {
    categories: ['kick', 'kyokushin'],
    sport: 'Кикбоксинг · K-1',
    training: tKick('База киокушинкай + переход на профессиональный K-1 Grand Prix.'),
    videos: [{ label: 'Andy Hug (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Andy_Hug' }],
  },
  bluming: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tCoach('1960-е — полная школа у Оямы в Японии; десятилетия преподавания в Европе.'),
  },
  ashihara: { categories: ['kyokushin', 'karate', 'coach'], sport: 'Каратэ Асихара', training: tKyok() },
  'bruce-lee': {
    categories: ['culture', 'kungfu'],
    sport: 'Кунг-фу · вин-чунь',
    training: tKung('Цель — около 500 ударов в день в пиковой подготовке; бег ~4 мили с переменным темпом.'),
    videos: [{ label: 'Bruce Lee Foundation', href: 'https://bruceleefoundation.org/about-bruce-lee/' }],
  },
  'ip-man': { categories: ['culture', 'kungfu', 'coach'], sport: 'Вин-чунь', training: tKung() },
  'jackie-chan': { categories: ['culture', 'kungfu'], sport: 'Кунг-фу · ушу', training: tCulture('10 лет школы оперы Пекина — жёсткий режим с детства.') },
  'chuck-norris': {
    categories: ['karate', 'culture'],
    sport: 'Каратэ',
    training: tKarate(),
    videos: [{ label: 'Чак Норрис (Википедия)', href: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D1%80%D0%B8%D1%81,_%D0%A7%D0%B0%D0%BA' }],
  },
  fedor: { categories: ['mma'], sport: 'MMA', training: tMma() },
  khabib: { categories: ['mma'], sport: 'MMA', training: tMma('Сборы в горах; борьба с детства под руководством отца.') },
  karelin: { categories: ['wrestling'], sport: 'Борьба', training: tWrest() },
  tszyu: { categories: ['boxing', 'coach'], sport: 'Бокс', training: tBox('Гантели 0,5–1 кг — для скорости и выносливости рук, не для массы.') },
  kurbanov: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tKyok() },
  eremenko: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tKyok('Учи-деши в Японии — быт додзё и двойные тренировки.') },
  ovannisyan: {
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    training: tCoach('Додзё в Кавагути — режим учи-деши для зарубежных спортсменов.'),
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (2009)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '29.03.2009',
      note: 'Артур Ованнисян (Hovhannisyan) — 23-й в списке прошедших. Детальный W-L в открытых сводках ограничен. Источник: открытые сводки / Википедия / kyokushin archives.',
    },
  },
  titkov: { categories: ['kyokushin'], sport: 'Киокушинкай', training: tKyok() },
  kotvitsky: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tCoach('Школа «Кайман» с 1989 года — система для детей, взрослых и сборных.') },
  osipov: { categories: ['kyokushin'], sport: 'Киокушинкай', training: tKyok('«Кайман» — один клуб, один тренер, долгие годы объёма.') },
  ilmov: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tCoach('Специализация — подготовка бойцов абсолютного дивизиона.') },
  leonov: { categories: ['kyokushin', 'coach'], sport: 'Киокушинкай', training: tCoach('Клуб «Мицудэн» и работа со сборными Москвы и России.') },
}

const NEW_FIGURES = [
  {
    id: 'yamaki',
    name: 'Кэндзи Ямаки',
    years: 'р. 1967',
    categories: ['kyokushin'],
    sport: 'Киокушинкай',
    role: '6-й абсолютный чемпион мира (1995); hyakunin kumite',
    stats: [
      { value: '83–5–12', label: 'hyakunin kumite' },
      { value: '1995', label: '6-й World Open' },
      { value: '22', label: 'ippon в hyakunin' },
      { value: '3 ч 27', label: 'мин — испытание' },
    ],
    timeline: [
      { year: '1967', text: 'Родился в Японии.' },
      { year: '1990-е', text: 'Подъём через японские турниры; подготовка к World Open.' },
      { year: '18.03.1995', text: 'Hyakunin kumite: 83 победы, 5 поражений, 12 ничьих за 3 ч 27 мин.' },
      { year: '1995', text: '6-й абсолютный чемпионат мира — победа; один из сильнейших бойцов эпохи.' },
    ],
    path: [
      'Прошёл hyakunin kumite за месяц до Filho — один из знаковых испытаний 1995 года.',
      'Подтвердил статус не только турнирным титулом World Open, но и стодневным марафоном кумитэ.',
    ],
    achievements: [
      '6-й абсолютный чемпион мира (1995)',
      'Hyakunin kumite: 83–5–12 (22 ippon + 61 по решению)',
      'Один из элитных японских бойцов 1990-х',
    ],
    facts: [
      'Hyakunin проходил 18 марта 1995 — за несколько дней до Filho.',
      '22 победы ippon и 61 по решению — высокий процент чистых побед.',
      'После испытания оставался в истории как один из немногих прошедших 100-man kumite.',
    ],
    record: {
      title: 'World Open',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: '1', event: '6-й абсолютный чемпионат мира (1995)' }],
      note: 'Источник: открытые сводки / kyokushin archives. Цифры в источниках могут различаться.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: '83–5–12',
      wins: 83,
      losses: 5,
      draws: 12,
      other: 22,
      otherLabel: 'ippon',
      time: '3 ч 27 мин',
      date: '18.03.1995',
      note: '22 ippon + 61 по решению (23 waza-ari). Источник: открытые сводки / Википедия / kyokushin archives.',
    },
    unusual: ['Hyakunin kumite 18.03.1995 — 83 победы, 5 поражений, 12 ничьих', '6-й абсолютный чемпион мира (1995)'],
    training: tKyok('Перед hyakunin — стандартная подготовка элиты honbu: многократные бои в неделю.'),
    marks: ['Hyakunin + World Open в одном году', 'Японская школа полного контакта'],
    links: [{ label: 'Kenji Yamaki (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Kenji_Yamaki' }],
    videos: [{ label: '100-man kumite (сводки)', href: 'https://en.wikipedia.org/wiki/100-man_kumite' }],
  },
  {
    id: 'kazumi',
    name: 'Хадзимэ Кадзуми',
    years: 'р. 1971',
    categories: ['kyokushin'],
    sport: 'Киокушинкай',
    role: 'Абсолютный чемпион мира (1999); hyakunin kumite',
    stats: [
      { value: '58–0–42', label: 'hyakunin kumite' },
      { value: '1999', label: '7-й World Open' },
      { value: '16', label: 'ippon в hyakunin' },
      { value: '3 ч 20', label: 'мин — бой' },
    ],
    timeline: [
      { year: '1971', text: 'Родился в Японии.' },
      { year: '1990-е', text: 'Сильные результаты на All Japan и World Open.' },
      { year: '13.03.1999', text: 'Hyakunin kumite: 58 побед, 42 ничьи, 0 поражений за ~3 ч 20 мин.' },
      { year: '1999', text: 'Финал 7-го World Open против Filho — один из знаковых поединков.' },
    ],
    path: [
      'Один из последних абсолютных чемпионов классической эпохи IKO-1.',
      'Hyakunin kumite без поражений — редкий результат даже среди элиты.',
    ],
    achievements: [
      'Абсолютный чемпион мира (7-й World Open, 1999)',
      'Hyakunin kumite: 58–0–42',
      'Многократные титулы All Japan',
    ],
    facts: [
      'Hyakunin проходил на honbu IKO-1; раунды по 1 мин 30 сек.',
      '16 ippon и 42 победы по решению — по официальным сводкам IKO-1.',
      'Финал World Open 1999 против Filho — классический поединок абсолютного дивизиона.',
    ],
    record: {
      title: 'World Open',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: '1', event: '7-й абсолютный чемпионат мира (1999)' }],
      note: 'Источник: открытые сводки / IKO-1 / Википедия.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: '58–0–42',
      wins: 58,
      losses: 0,
      draws: 42,
      other: 16,
      otherLabel: 'ippon',
      time: '3 ч 20 мин',
      date: '13.03.1999',
      note: '16 ippon (2 чистых + 14 awase-ippon); 42 победы по решению. Источник: официальные сводки IKO-1 / kyokushin archives.',
    },
    unusual: ['Hyakunin kumite без поражений (1999)', 'Финал World Open 1999 против Filho'],
    training: tKyok(),
    marks: ['Hyakunin без поражений', 'Абсолют World Open'],
    links: [{ label: 'Hajime Kazumi (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Hajime_Kazumi' }],
  },
  {
    id: 'judd-reid',
    name: 'Джадд Рид',
    years: 'р. 1970',
    categories: ['kyokushin'],
    sport: 'Киокушинкай',
    role: 'Hyakunin kumite (2011); WKO чемпион; ученик Оямы',
    stats: [
      { value: '1000', label: 'дней у Оямы' },
      { value: '2011', label: 'hyakunin kumite' },
      { value: '2010', label: 'WKO heavyweight' },
      { value: '20-й', label: 'в списке прошедших' },
    ],
    timeline: [
      { year: '1970', text: 'Родился в Австралии.' },
      { year: '1980-е', text: '1000-дневная программа у Масутацу Оямы в Японии.' },
      { year: '2010', text: 'WKO World Heavyweight Championship.' },
      { year: '22.10.2011', text: 'Hyakunin kumite в Осаке — 20-й человек в истории, прошедший испытание.' },
    ],
    path: [
      'Один из двух иностранцев, завершивших 1000-дневную программу у Оямы.',
      'Два десятилетия шёл к титулу чемпиона мира и hyakunin kumite — как просил учитель.',
    ],
    achievements: [
      'Hyakunin kumite (22.10.2011, Осака)',
      'WKO World Heavyweight Champion (2010)',
      '1000-дневная программа у Оямы',
      'Документальный фильм «Journey to the 100 Man Fight»',
    ],
    facts: [
      'Подготовка в Таиланде: 6 дней в неделю, от 6 часов в день в жаре.',
      'Около 60-го боя почувствовал «200 кг на плечах» — но не остановился.',
      'Общее время испытания — около 3,5 часов.',
    ],
    record: {
      title: 'Турниры',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: '1', event: 'WKO World Heavyweight (2010)' }],
      note: 'Детальный счёт hyakunin в открытых сводках не опубликован; зафиксировано прохождение всех 100 боёв.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (2011)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: '~3 ч 30 мин',
      date: '22.10.2011',
      note: '20-й в истории; детальный W-L в открытых сводках не опубликован. Источник: ONE Championship / world-kumite.org / kyokushin archives.',
    },
    unusual: ['1000 дней у Оямы — редкость для иностранца', 'Hyakunin kumite в 2011 — 20-й в списке'],
    training: tKyok('6 дней в неделю, от 6 часов: мешок, спарринг, силовая работа в тропическом климате.'),
    marks: ['Обещание учителю — выполнено', 'Выносливость и воля'],
    links: [{ label: 'Judd Reid (ONE Championship)', href: 'https://www.onefc.com/features/judd-reids-incredible-journey-from-skinny-teenager-to-100-man-kumite-legend/' }],
    videos: [{ label: '100 Man Fight (трейлер)', href: 'https://www.youtube.com/results?search_query=Judd+Reid+100+Man+Fight' }],
  },
  {
    id: 'howard-collins',
    name: 'Говард Коллинз',
    years: 'р. 1949',
    categories: ['kyokushin', 'coach'],
    sport: 'Киокушинкай',
    role: 'Hyakunin kumite (1972); пионер европейского киокушинкай',
    stats: [
      { value: '1972', label: 'hyakunin kumite' },
      { value: '7', label: 'дан' },
      { value: 'UK', label: 'база' },
      { value: '<4 ч', label: '100 боёв за день' },
    ],
    timeline: [
      { year: '1949', text: 'Родился в Великобритании.' },
      { year: '1960-е', text: 'Обучение в киокushinкай у Оямы в Японии.' },
      { year: '01.12.1972', text: 'Hyakunin kumite — первый, кому Ояма обязал пройти все 100 боёв за один день (<4 ч).' },
      { year: 'позже', text: 'Преподавание и развитие киокушинкай в Европе.' },
    ],
    path: [
      'Стал образцом «одного дня — 100 боёв», после чего стандарт закрепился для всех следующих.',
      'Десятилетия преподавания в Европе после испытания.',
    ],
    achievements: [
      'Hyakunin kumite (01.12.1972) — все 100 боёв за один день',
      'Пионер киокушinкай в Великобритании',
      '7 дан киokushinкай',
    ],
    facts: [
      'До Коллинза часть испытаний проходили за два дня по 50 боёв.',
      'Ояма считал прохождение за один день (<4 ч) признаком «настоящего budoka».',
    ],
    record: {
      title: 'Hyakunin kumite',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: 'исп.', event: 'Hyakunin kumite (01.12.1972)' }],
      note: 'Детальный W-L в открытых сводках неполный. Источник: kyokushin archives / Википедия.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (1972)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: '<4 ч',
      date: '01.12.1972',
      note: 'Первый, кому Ояма обязал пройти все 100 боёв за один день. Детальный счёт в открытых источниках неполный. Источник: kyokushin archives.',
    },
    unusual: ['Первый — 100 боёв за один день (<4 ч)', 'Стандарт «одного дня» закрепился после него'],
    training: tCoach('Европейская школа после полной японской подготовки.'),
    marks: ['Испытание как стандарт', 'Европейский мост киokushinкай'],
    links: [{ label: 'Howard Collins (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Howard_Collins' }],
  },
  {
    id: 'nikoleishvili',
    name: 'Тариэль Николейшвили',
    years: 'р. 1984',
    categories: ['kyokushin'],
    sport: 'Киокушинкай',
    role: 'Чемпион мира; hyakunin kumite (2014)',
    stats: [
      { value: '2014', label: 'hyakunin kumite' },
      { value: 'ЧМ', label: 'киokushinкай' },
      { value: 'Россия', label: 'страна' },
      { value: '27-й', label: 'в списке прошедших' },
    ],
    timeline: [
      { year: '1984', text: 'Родился в России.' },
      { year: '2010-е', text: 'Титулы на чемпионатах мира и Европы.' },
      { year: '26.04.2014', text: 'Hyakunin kumite — 27-й человек в истории.' },
    ],
    path: [
      'Представитель сильной российской линии киokushinкай.',
      'Сочетал турнирные титулы с прохождением hyakunin kumite.',
    ],
    achievements: [
      'Чемпион мира по киokushinкай',
      'Hyakunin kumite (26.04.2014)',
      'Международные титулы в абсолютном и весовых дивизионах',
    ],
    facts: [
      'Один из немногих россиян, прошедших hyakunin kumite.',
      'Подготовка включала многолетний объём кumitэ и силовую работу.',
    ],
    record: {
      title: 'Чемпионаты мира',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: '1', event: 'Чемпионат мира (по сводкам)' }],
      note: 'Источник: открытые сводки / kyokushin archives.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (2014)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '26.04.2014',
      note: '27-й в списке прошедших. Детальный W-L в открытых сводках ограничен. Источник: Википедия / kyokushin archives.',
    },
    unusual: ['Hyakunin kumite (2014) — редкость для российской линии', 'Чемпион мира + 100-man kumite'],
    training: tKyok(),
    marks: ['Турнир + испытание', 'Российская школа на мировом уровне'],
    links: [{ label: '100-man kumite (Википедия)', href: 'https://en.wikipedia.org/wiki/100-man_kumite' }],
  },
  {
    id: 'ali',
    name: 'Мохаммед Али',
    years: '1942–2016',
    categories: ['boxing', 'culture'],
    sport: 'Бокс',
    role: 'Трёхкратный чемпион мира в тяжёлом весе; олимпийский чемпион',
    stats: [
      { value: '56–5', label: 'рекорд' },
      { value: '3', label: 'титула мира' },
      { value: '1960', label: 'Олимпиада' },
      { value: '37', label: 'нокаутов' },
    ],
    timeline: [
      { year: '1942', text: 'Родился в Луисвилле (США) как Cassius Clay.' },
      { year: '1960', text: 'Олимпийское золото в Риме.' },
      { year: '1964', text: 'Титул WBC/WBA; позже — отказ от призыва и дисквалификация.' },
      { year: '1974', text: '«Rumble in the Jungle» — победа над Джорджем Форманом.' },
      { year: '1975', text: '«Thrilla in Manila» — третий бой с Джо Фrazierом.' },
    ],
    path: [
      'Сочетал скорость ног, работу на дистанции и психологическое давление на соперника.',
      'Стал символом бокса и гражданской позиции за пределами ринга.',
    ],
    achievements: [
      'Олимпийский чемпион (1960)',
      'Трёхкратный чемпион мира в тяжёлом весе',
      'Победы над Liston, Foreman, Frazier',
      'Зал славы международного бокса',
    ],
    facts: [
      'Работа на скоростной мешке и «дробь» ног — основа его стиля.',
      'Тренировки включали бег, работу в бассейне и спарринг с разными партнёрами.',
      '«Float like a butterfly, sting like a bee» — не лозунг, а описание тактики.',
    ],
    record: {
      title: 'Профессиональный бокс',
      formula: '56–5',
      wins: 56,
      losses: 5,
      draws: null,
      places: [
        { place: '1', event: 'Олимпиада — Рим (1960)' },
        { place: '1', event: 'WBC/WBA — тяжёлый вес (несколько периодов)' },
      ],
      note: '37 нокаутов. Источник: открытые сводки / Википедия.',
    },
    unusual: ['Трёхкратный чемпион мира в тяжёлом весе', '«Rumble in the Jungle» и «Thrilla in Manila»'],
    training: tBox('Ранние утренние пробежки; работа на скорость и координацию ног.'),
    marks: ['Скорость и голова', 'Символ эпохи'],
    links: [{ label: 'Muhammad Ali (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Muhammad_Ali' }],
    videos: [{ label: 'Thrilla in Manila (материалы)', href: 'https://en.wikipedia.org/wiki/Thrilla_in_Manila' }],
  },
  {
    id: 'tyson',
    name: 'Майк Тайсон',
    years: 'р. 1966',
    categories: ['boxing'],
    sport: 'Бокс',
    role: 'Чемпион мира в тяжёлом весе; самый молодой абсолютный чемпион WBC',
    stats: [
      { value: '50–6', label: 'рекорд' },
      { value: '44', label: 'нокаута' },
      { value: '20', label: 'лет — титул WBC' },
      { value: 'Кас', label: 'Д\'Амато — тренер' },
    ],
    timeline: [
      { year: '1966', text: 'Родился в Бруклине (Нью-Йорк).' },
      { year: '1980-е', text: 'Школа Каса Д\'Амато: peek-a-boo, работа в зале с детства.' },
      { year: '1986', text: 'Самый молодой чемпион WBC в тяжёлом весе (20 лет).' },
      { year: '1990-е', text: 'Поражение от Douglas; возвращения и титулы WBC/WBA.' },
    ],
    path: [
      'Peek-a-boo: высокая стойка, уклоны, взрывной вход в среднюю дистанцию.',
      'Д\'Амато заложил дисциплину и технику до взрослой карьеры.',
    ],
    achievements: [
      'Молодейший чемпион WBC в тяжёлом весе (1986)',
      'Объединение поясов WBC, WBA, IBF',
      'Зал славы международного бокса',
    ],
    facts: [
      'Часы на мешке, работа на лапах и shadow boxing — ежедневная база.',
      'Д\'Амато учил не только удару, но и психологии боя.',
      'В пике — серия быстрых нокаутов в первых раундах.',
    ],
    record: {
      title: 'Профессиональный бокс',
      formula: '50–6',
      wins: 50,
      losses: 6,
      draws: null,
      places: [{ place: '1', event: 'WBC/WBA/IBF — тяжёлый вес (1980-е — 1990-е)' }],
      note: '44 нокаута. Источник: открытые сводки / Википедия.',
    },
    unusual: ['Самый молодой чемпион WBC в тяжёлом весе (20 лет)', '44 нокаута из 50 побед'],
    training: tBox('Peek-a-boo: работа на мешке, уклоны, взрывные комбинации на лапах.'),
    marks: ['Взрывная мощь', 'Школа Д\'Амато'],
    links: [{ label: 'Mike Tyson (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Mike_Tyson' }],
  },
  {
    id: 'lomachenko',
    name: 'Василий Ломachenко',
    years: 'р. 1988',
    categories: ['boxing'],
    sport: 'Бокс',
    role: 'Двукратный олимпийский чемпион; чемпион мира в профессионалах',
    stats: [
      { value: '2', label: 'золота Олимпиад' },
      { value: '396–1', label: 'любители (сводка)' },
      { value: 'WBO/WBA', label: 'титулы' },
      { value: 'отец', label: 'тренер — А. Ломachenko' },
    ],
    timeline: [
      { year: '1988', text: 'Родился в Украине.' },
      { year: '2008', text: 'Олимпийское золото в Пекине.' },
      { year: '2012', text: 'Олимпийское золото в Лондоне.' },
      { year: '2013+', text: 'Профессиональная карьера; быстрый путь к титулам WBO/WBA.' },
    ],
    path: [
      'Любительская школа с огромным объёмом боёв и технической работы.',
      'В профи — footwork, углы и работа на дистанции как отличительная черта.',
    ],
    achievements: [
      'Олимпийский чемпион (2008, 2012)',
      'Чемпион WBO и WBA в профессионалах',
      'Золото чемпионатов мира и Европы (любители)',
    ],
    facts: [
      'Отец-тренер с детства выстраивал технику и тактику.',
      'Известен работой ног и уходом с линии атаки.',
      'Редкий случай двух олимпийских золот в любителях с переходом в элиту профи.',
    ],
    record: {
      title: 'Профессиональный бокс',
      formula: '17–3',
      wins: 17,
      losses: 3,
      draws: null,
      places: [
        { place: '1', event: 'Олимпиада — Пекин (2008)' },
        { place: '1', event: 'Олимпиада — Лондон (2012)' },
        { place: '1', event: 'WBO/WBA — лёгкий/лёгкий второй (профи)' },
      ],
      note: 'Любительский счёт ~396–1. Источник: открытые сводки / Википедия.',
    },
    unusual: ['396–1 в любителях (сводка)', 'Два олимпийских золота'],
    training: tBox('Footwork, работа на лапах, спарринг с акцентом на углы и дистанцию.'),
    marks: ['Техника и ноги', 'Олимпийская школа'],
    links: [{ label: 'Vasiliy Lomachenko (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Vasiliy_Lomachenko' }],
  },
  {
    id: 'klitschko',
    name: 'Владимир Кличко',
    years: 'р. 1976',
    categories: ['boxing'],
    sport: 'Бокс',
    role: 'Чемпион мира в тяжёлом весе; олимпийский чемпион',
    stats: [
      { value: '64–5', label: 'рекорд' },
      { value: '1996', label: 'Олимпиада' },
      { value: 'WBC/WBA/IBF', label: 'титулы' },
      { value: '53', label: 'нокаута' },
    ],
    timeline: [
      { year: '1976', text: 'Родился в Казахстане; школа в Украине с братом Виталием.' },
      { year: '1996', text: 'Олимпийское золото в Атланте.' },
      { year: '2000-е', text: 'Долгое доминирование в тяжёлом весе; объединение поясов.' },
      { year: '2017', text: 'Поражение от Джошуа; завершение карьеры.' },
    ],
    path: [
      'Джab и контроль дистанции; рост и дисциплина как основа стиля.',
      'С братом Виталием — одна из сильнейших семей тяжёлого веса.',
    ],
    achievements: [
      'Олимпийский чемпион (1996)',
      'Чемпион WBC, WBA, IBF, WBO',
      'Долгий период лидерства в тяжёлом весе',
    ],
    facts: [
      'Тренировки: бег, работа на лапах, спарринг, силовая подготовка.',
      'Методичный подход к каждому сопернику — разбор и тактика.',
      'После карьеры — общественная деятельность в Украине.',
    ],
    record: {
      title: 'Профессиональный бокс',
      formula: '64–5',
      wins: 64,
      losses: 5,
      draws: null,
      places: [
        { place: '1', event: 'Олимпиада — Атланта (1996)' },
        { place: '1', event: 'WBC/WBA/IBF/WBO — тяжёлый вес' },
      ],
      note: '53 нокаута. Источник: открытые сводки / Википедия.',
    },
    unusual: ['Олимпийское золото + долгое доминирование в тяжёлом весе', '53 нокаута'],
    training: tBox('Работа джебом, контроль дистанции, объёмная силовая подготовка.'),
    marks: ['Дистанция и дисциплина', 'Семейная школа с Виталием'],
    links: [{ label: 'Wladimir Klitschko (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Wladimir_Klitschko' }],
  },
  {
    id: 'funakoshi',
    name: 'Гичин Фунакоси',
    years: '1868–1957',
    categories: ['karate', 'coach', 'culture'],
    sport: 'Каратэ',
    role: 'Основатель сётокан; популяризатор каратэ в Японии',
    stats: [
      { value: '1868', label: 'год рождения' },
      { value: 'Shotokan', label: 'стиль' },
      { value: '1922', label: 'демонстрация в Токио' },
      { value: '26', label: 'ката сётокан' },
    ],
    timeline: [
      { year: '1868', text: 'Родился в Оkinawa.' },
      { year: '1922', text: 'Демонстрация каратэ в Токио — начало популяризации на главных островах.' },
      { year: '1936', text: 'Открытие первого додзё Shotokan в Токио.' },
      { year: '1957', text: 'Уход из жизни; стиль продолжен сыном и учениками.' },
    ],
    path: [
      'Перенёс окинawan каратэ в японскую систему с акцентом на ката и дух.',
      'Его «Дведцать посланий» — этический код школы.',
    ],
    achievements: [
      'Основание стиля сётокан',
      '«Двеdцать посланий каратэ»',
      'Популяризация каратэ в Японии',
      'Ученики: Масatoshi Nakayama и другие',
    ],
    facts: [
      'Ежедневная отработка ката — основа метода.',
      'Подчёркивал скромность, усердие и уважение.',
      'Имя «Shotokan» — «дом сосновых волн» — дано учениками.',
    ],
    record: {
      title: 'Школа и наследие',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: 'осн.', event: 'Сётокан (1930-е)' }],
      note: 'Соревновательный счёт не является основой известности. Источник: Википедия.',
    },
    unusual: ['Основатель сётокан', '«Двадцать посланий каратэ»'],
    training: tKarate('Ежедневная ката; акцент на характер и повторение базы.'),
    marks: ['Ката как сердце школы', 'Этика и дисциплина'],
    links: [{ label: 'Gichin Funakoshi (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Gichin_Funakoshi' }],
  },
  {
    id: 'hollander',
    name: 'Люк Холландер',
    years: '1943–2020',
    categories: ['kyokushin', 'karate'],
    sport: 'Киокушинкай',
    role: 'Hyakunin kumite (1967); пионер киokushinкай в Нидерландах',
    stats: [
      { value: '1967', label: 'hyakunin kumite' },
      { value: 'NL', label: 'база' },
      { value: 'ученик', label: 'Оямы' },
      { value: '5', label: 'в списке прошедших' },
    ],
    timeline: [
      { year: '1943', text: 'Родился в Нидерландах.' },
      { year: '1960-е', text: 'Обучение у Оямы в Японии.' },
      { year: '1967', text: 'Hyakunin kumite — один из первых европейцев в списке.' },
      { year: 'позже', text: 'Развитие киokushinкай в Нидерlanдах.' },
    ],
    path: [
      'Один из ранних европейских учеников Оямы, прошедших hyakunin kumite.',
      'Заложил базу полноконтактного каратэ в Нидерlanдах.',
    ],
    achievements: [
      'Hyakunin kumite (1967)',
      'Пионер киokushinкай в Нидерlanдах',
      'Подготовка европейских бойцов и инструкторов',
    ],
    facts: [
      'В одном ряду с Arneil, Bluming и Collins — европейская волна 1960-х.',
      'Детальный счёт hyakunin в открытых сводках неполный.',
    ],
    record: {
      title: 'Hyakunin kumite',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: 'исп.', event: 'Hyakunin kumite (1967)' }],
      note: 'Источник: kyokushin archives / Википедия.',
    },
    hyakunin: {
      title: 'Hyakunin kumite (100 боёв)',
      formula: 'пройден (1967)',
      wins: null,
      losses: null,
      draws: null,
      other: null,
      otherLabel: null,
      time: null,
      date: '1967',
      note: '5-й в истории списка. Детальный W-L в открытых источниках неполный. Источник: kyokushin archives.',
    },
    unusual: ['Hyakunin kumite (1967) — ранний европейский проход', 'Пионер в Нидерlanдах'],
    training: tKyok(),
    marks: ['Европа и honbu', 'Испытание как часть пути'],
    links: [{ label: '100-man kumite (Википедия)', href: 'https://en.wikipedia.org/wiki/100-man_kumite' }],
  },
  {
    id: 'schilt',
    name: 'Семи Шилт',
    years: 'р. 1973',
    categories: ['kick'],
    sport: 'Кикбоксинг · K-1',
    role: 'Четырёхкратный победитель K-1 Grand Prix',
    stats: [
      { value: '4×', label: 'K-1 GP' },
      { value: '211 см', label: 'рост' },
      { value: 'kyokushin', label: 'база' },
      { value: '43–6', label: 'K-1 (сводка)' },
    ],
    timeline: [
      { year: '1973', text: 'Родился в Нидерlanдах.' },
      { year: '1990-е', text: 'База в киokushinкай; переход в K-1.' },
      { year: '2005–10', text: 'Четыре победы в K-1 World Grand Prix.' },
    ],
    path: [
      'Рост и база киokushinкай дали дистанцию и контроль в клинче.',
      'Доминировал в K-1 Grand Prix в середине 2000-х.',
    ],
    achievements: [
      '4× победитель K-1 World Grand Prix',
      'Чемпион Glory Heavyweight',
      'База — киokushinкай и кикбоксинг',
    ],
    facts: [
      'Использовал teep и контроль дистанции против более низких соперников.',
      'Тренировки сочетали кикбоксинг и силовую работу.',
    ],
    record: {
      title: 'K-1 Grand Prix',
      formula: '43–6',
      wins: 43,
      losses: 6,
      draws: null,
      places: [
        { place: '1', event: 'K-1 World GP (2005, 2006, 2007, 2009)' },
      ],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['4× K-1 Grand Prix — рекорд эпохи', '211 см при базе киokushinкай'],
    training: tKick(),
    marks: ['Дистанция и рост', 'Долгое доминирование в GP'],
    links: [{ label: 'Semmy Schilt (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Semmy_Schilt' }],
  },
  {
    id: 'hari',
    name: 'Бадр Хари',
    years: 'р. 1984',
    categories: ['kick'],
    sport: 'Кикбоксинг · K-1',
    role: 'Звезда K-1 и Glory; тяжёлый вес кикбоксинга',
    stats: [
      { value: 'K-1/Glory', label: 'арена' },
      { value: '106–12', label: 'рекорд (сводка)' },
      { value: '92', label: 'нокаута (сводка)' },
      { value: 'NL/MA', label: 'Марокко / Нидерlanды' },
    ],
    timeline: [
      { year: '1984', text: 'Родился в Амsterdamе (мarокканские корни).' },
      { year: '2000-е', text: 'Подъём в K-1; яркие нокауты.' },
      { year: '2010-е', text: 'Glory и международные турниры.' },
    ],
    path: [
      'Агрессивный стиль: мощная ударная техника и давление с первых секунд.',
      'Один из самых зрелищных тяжеловесов кикбоксинга 2000-х.',
    ],
    achievements: [
      'K-1 World Grand Prix 2007–08 (финалист и победитель по сводкам)',
      'Glory Heavyweight Champion',
      'Многократные нокауты на топ-уровне',
    ],
    facts: [
      'Работа на мешке и спарринг — основа мощи удара.',
      'Карьера сопровождалась дисквалификациями — часть публичного образа.',
    ],
    record: {
      title: 'Кикбоксинг',
      formula: '106–12',
      wins: 106,
      losses: 12,
      draws: null,
      places: [{ place: '1', event: 'K-1 / Glory — тяжёлый вес (по сводкам)' }],
      note: 'Счёт варьируется по базам. Источник: открытые сводки / Википедия.',
    },
    unusual: ['92+ нокаута в сводках', 'Один из главных «шоуmen» K-1/Glory'],
    training: tKick('Акцент на мощь удара и работу в первом раунде.'),
    marks: ['Мощь и зрелищность', 'Тяжёлый вес K-1'],
    links: [{ label: 'Badr Hari (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Badr_Hari' }],
  },
  {
    id: 'hoost',
    name: 'Эрнesto Хoost',
    years: 'р. 1965',
    categories: ['kick'],
    sport: 'Кикбоксинг · K-1',
    role: 'Четырёхкратный победитель K-1 Grand Prix',
    stats: [
      { value: '4×', label: 'K-1 GP' },
      { value: '99–21', label: 'рекорд (сводка)' },
      { value: '1990-е', label: 'эпоха' },
      { value: 'NL', label: 'Нидерlanды' },
    ],
    timeline: [
      { year: '1965', text: 'Родился в Нидерlanдах.' },
      { year: '1990-е', text: 'Первые победы в K-1 Grand Prix.' },
      { year: '1997–2000', text: 'Серия титулов K-1 GP — «Mr. K-1».' },
    ],
    path: [
      'Техника ног, low kick и тактическая зрелость на дистанции.',
      'Один из главных символов K-1 1990-х.',
    ],
    achievements: [
      '4× K-1 World Grand Prix Champion',
      'Победы над Aerts, LeBanner, Hug и другими',
      'Зал славы K-1',
    ],
    facts: [
      'Low kick — фирменное оружие; разрушал ноги соперников.',
      'Долгая карьера на высшем уровне — редкость для тяжёлых.',
    ],
    record: {
      title: 'K-1',
      formula: '99–21',
      wins: 99,
      losses: 21,
      draws: null,
      places: [{ place: '1', event: 'K-1 World GP (1997, 1998, 1999, 2000)' }],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['4× K-1 GP — «Mr. K-1»', 'Low kick как ключевое оружие'],
    training: tKick('Low kick, работа на мешке, спарринг по раундам K-1.'),
    marks: ['Тактика и low kick', 'Долголетие в K-1'],
    links: [{ label: 'Ernesto Hoost (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Ernesto_Hoost' }],
  },
  {
    id: 'aerts',
    name: 'Питер Аертс',
    years: 'р. 1970',
    categories: ['kick'],
    sport: 'Кикбоксинг · K-1',
    role: '«Dutch Lumberjack»; трёхкратный победитель K-1 GP',
    stats: [
      { value: '3×', label: 'K-1 GP' },
      { value: '109–35', label: 'рекорд (сводка)' },
      { value: '83', label: 'нокаута (сводка)' },
      { value: '192 см', label: 'рост' },
    ],
    timeline: [
      { year: '1970', text: 'Родился в Нидерlanдах.' },
      { year: '1990-е', text: 'Подъём в K-1; серия нокаутов.' },
      { year: '1994–98', text: 'Три победы в K-1 World Grand Prix.' },
    ],
    path: [
      'Высокий рост, мощный high kick и прямой правый — визитная карточка.',
      'Десятилетия на топ-уровне кикбоксинга.',
    ],
    achievements: [
      '3× K-1 World Grand Prix Champion',
      '83+ нокаута в карьере (сводка)',
      'Победы над легендами K-1',
    ],
    facts: [
      'High kick — один из самых узнаваемых ударов в истории K-1.',
      'Карьера с 1980-х — редкое долголетие.',
    ],
    record: {
      title: 'K-1',
      formula: '109–35',
      wins: 109,
      losses: 35,
      draws: null,
      places: [{ place: '1', event: 'K-1 World GP (1994, 1995, 1998)' }],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['3× K-1 GP', '83+ нокаута — «Dutch Lumberjack»'],
    training: tKick('High kick, мешок, спарринг на нокаут.'),
    marks: ['High kick', 'Долгая карьера в K-1'],
    links: [{ label: 'Peter Aerts (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Peter_Aerts' }],
  },
  {
    id: 'jet-li',
    name: 'Джет Ли',
    years: 'р. 1963',
    categories: ['culture', 'kungfu'],
    sport: 'Кунг-фу · ушу',
    role: 'Популяризатор ушу и боевых искусств в кино',
    stats: [
      { value: '5', label: 'раз — чемпион Китая по ушу' },
      { value: '«Shaolin Temple»', label: 'прорыв в кино' },
      { value: '60+', label: 'фильмов' },
      { value: 'ушу', label: 'база' },
    ],
    timeline: [
      { year: '1963', text: 'Родился в Пекине.' },
      { year: '1970-е', text: 'Пятикратный чемпион Китая по ушу в юности.' },
      { year: '1982', text: '«Храм Шаолиня» — всенародная известность.' },
      { year: '1990-2000-е', text: 'Голливуд: «Romeo Must Die», «Hero», «Fearless».' },
    ],
    path: [
      'Спортивная база ушу дала скорость, координацию и чистоту движений.',
      'Через кино показал китайские боевые искусства мировой аудитории.',
    ],
    achievements: [
      '5× чемпион Китая по ушу (юность)',
      'Звезда «Храма Шаолиня» и международного кино',
      'Фильм «Fearless» — триумфальное возвращение на экран',
    ],
    facts: [
      'С детства — жёсткий режим спортивной школы ушу.',
      'После травм и болезней продолжал сниматься и популяризировать ушу.',
      'Благотворительность и философия ушу — часть публичного образа.',
    ],
    record: {
      title: 'Ушу и кино',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: '1', event: 'Чемпионат Китая по ушу — 5 титулов (юность)' }],
      note: 'Спортивный счёт в ушу; основа — кино и популяризация. Источник: Википедия.',
    },
    unusual: ['5× чемпион Китая по ушу в юности', '«Храм Шаолиня» изменил индустрию в Китае'],
    training: tCulture('Школа ушу с детства: формы, оружие, акробатика, силовая база.'),
    marks: ['Ушу → кино', 'Популяризация без грубости'],
    links: [{ label: 'Jet Li (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Jet_Li' }],
  },
  {
    id: 'mcgregor',
    name: 'Конор Макгрегор',
    years: 'р. 1988',
    categories: ['mma'],
    sport: 'MMA',
    role: 'Двойной чемпион UFC; первая супер-бойня с Мэйвезером',
    stats: [
      { value: '22–6', label: 'MMA (сводка)' },
      { value: '2', label: 'пояса UFC' },
      { value: 'Cage', label: 'контроль дистанции' },
      { value: '2016', label: 'двойной титул' },
    ],
    timeline: [
      { year: '1988', text: 'Родился в Дublinе (Ирlandия).' },
      { year: '2013', text: 'Дebut в UFC; быстрый подъём.' },
      { year: '2015–16', text: 'Титулы в перьевом и лёгком весе.' },
      { year: '2017', text: 'Боксёрский бой с Floyd Mayweather.' },
    ],
    path: [
      'Точный контроль дистанции, левый straight и work in cage.',
      'Сочетал технику с медийным влиянием на рост MMA.',
    ],
    achievements: [
      'UFC Featherweight и Lightweight Champion одновременно',
      'Первый двойной чемпион в двух весах UFC',
      'Бой с Floyd Mayweather (2017)',
    ],
    facts: [
      'Тренировки в SBG Ireland: борьба, ударка, movement.',
      'Работа на timing и дистанции — ключ к серии нокаутов в UFC.',
    ],
    record: {
      title: 'UFC',
      formula: '22–6',
      wins: 22,
      losses: 6,
      draws: null,
      places: [
        { place: '1', event: 'UFC — перья (2015)' },
        { place: '1', event: 'UFC — лёгкий (2016)' },
      ],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['Первый двойной чемпион UFC в двух весах', 'Бой с Mayweather в боксе'],
    training: tMma('SBG: movement, sparring, подготовка под конкретного соперника.'),
    marks: ['Дистанция и timing', 'Медийный и спортивный пик'],
    links: [{ label: 'Conor McGregor (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Conor_McGregor' }],
  },
  {
    id: 'gsp',
    name: 'Жорж Сен-Пьер',
    years: 'р. 1981',
    categories: ['mma'],
    sport: 'MMA',
    role: 'Двукратный чемпион UFC в полусреднем весе',
    stats: [
      { value: '26–2', label: 'MMA' },
      { value: '2', label: 'периода титула UFC' },
      { value: 'канад.', label: 'школа' },
      { value: 'Зал', label: 'славы UFC' },
    ],
    timeline: [
      { year: '1981', text: 'Родился в Кanаде.' },
      { year: '2000-е', text: 'Подъём в UFC; титул welterweight.' },
      { year: '2013', text: 'Временный уход; возвращение и титул middleweight.' },
      { year: '2019', text: 'Зал славы UFC.' },
    ],
    path: [
      'All-round game: джab, takedown, контроль и адаптация под соперника.',
      'Научный подход к подготовке — анализ и тактика.',
    ],
    achievements: [
      'UFC Welterweight Champion (два периода)',
      'UFC Middleweight Champion',
      'Зал славы UFC',
    ],
    facts: [
      'Тренировки включали борьбу, бокс, кикбоксинг и functional training.',
      'Известен подготовкой «game plan» под каждого соперника.',
    ],
    record: {
      title: 'UFC',
      formula: '26–2',
      wins: 26,
      losses: 2,
      draws: null,
      places: [
        { place: '1', event: 'UFC — полусредний (2006–2013, 2017)' },
        { place: '1', event: 'UFC — средний (2017)' },
      ],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['Два периода титула welterweight + middleweight', 'Научный подход к тактике'],
    training: tMma('All-round camp: wrestling, striking, game plan под соперника.'),
    marks: ['Адаптация', 'Полнота подготовки'],
    links: [{ label: 'Georges St-Pierre (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Georges_St-Pierre' }],
  },
  {
    id: 'makhachev',
    name: 'Ислам Махачев',
    years: 'р. 1991',
    categories: ['mma'],
    sport: 'MMA',
    role: 'Чемпион UFC в лёгком весе; ученик Абдulmanapa Нурmagomedova',
    stats: [
      { value: '27–1', label: 'MMA (сводка)' },
      { value: 'UFC', label: 'лёгкий вес' },
      { value: 'сambo', label: 'база' },
      { value: 'Дag', label: 'школа' },
    ],
    timeline: [
      { year: '1991', text: 'Родился в Дagestanе.' },
      { year: '2010-е', text: 'Путь в UFC; серия побед.' },
      { year: '2022', text: 'Титул UFC lightweight после боя с Oliveira.' },
      { year: '2023+', text: 'Защиты титула; лидер дивизиона.' },
    ],
    path: [
      'Школа Нурmagomedova: борьба, давление, контроль.',
      'Продолжил линию дagestanских чемпионов в UFC.',
    ],
    achievements: [
      'UFC Lightweight Champion',
      'Серия побед в элитном дивизионе',
      'База — боевое sambo и борьба',
    ],
    facts: [
      'Тренируется с командой Хabiba и наставниками из Makhachkala.',
      'Стиль: перевод, контроль, methodical pressure.',
    ],
    record: {
      title: 'UFC',
      formula: '27–1',
      wins: 27,
      losses: 1,
      draws: null,
      places: [{ place: '1', event: 'UFC — лёгкий вес (2022+)' }],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['Продолжение школы Нурmagomedova', 'Доминирование в lightweight после титула'],
    training: tMma('Борьба, sambo, сборы в Дagestanе — как у команды Нурmagomedova.'),
    marks: ['Борьба как основа', 'Преемственность школы'],
    links: [{ label: 'Islam Makhachev (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Islam_Makhachev' }],
  },
  {
    id: 'saitiev',
    name: 'Бувайсар Сайтиев',
    years: 'р. 1975',
    categories: ['wrestling'],
    sport: 'Борьба',
    role: 'Трёхкратный олимпийский чемпион; вольная борьба',
    stats: [
      { value: '3', label: 'золота Олимпиад' },
      { value: '6', label: 'титулов ЧМ' },
      { value: '74', label: 'кг — категория' },
      { value: 'Чечня', label: 'школа' },
    ],
    timeline: [
      { year: '1975', text: 'Родился в Чечне.' },
      { year: '1996', text: 'Олимпийское золото в Атlanте.' },
      { year: '2004', text: 'Олимпийское золото в Афинах.' },
      { year: '2008', text: 'Олимпийское золото в Пекине; завершение карьеры.' },
    ],
    path: [
      'Техника, скорость и тактика — вместе с братом Аdamом доминировали в 74 кг.',
      'Символ чеченской и российской школы вольной борьбы.',
    ],
    achievements: [
      '3× олимпийский чемпион (1996, 2004, 2008)',
      '6× чемпион мира',
      'Золото Goodwill Games и многих турниров',
    ],
    facts: [
      'Брат Adam Saitiev — тоже олимпийский чемпион.',
      'Тренировки: огромный объём борьбы и специальной подготовки.',
    ],
    record: {
      title: 'Вольная борьба',
      formula: 'доминирование',
      wins: null,
      losses: null,
      draws: null,
      places: [
        { place: '1', event: 'Олимпиада — Атlanта (1996)' },
        { place: '1', event: 'Олимпиада — Афины (2004)' },
        { place: '1', event: 'Олимпиада — Пекин (2008)' },
        { place: '1', event: 'Чемпионат мира — 6 титулов' },
      ],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['3× олимпийское золото в вольной', 'Братья Saitiev — две олимпийские линии'],
    training: tWrest('Чеченская школа: объём борьбы, скорость, тактика.'),
    marks: ['Техника + тактика', 'Олимпийская легенда'],
    links: [{ label: 'Buvaysar Saitiyev (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Buvaysar_Saitiyev' }],
  },
  {
    id: 'medved',
    name: 'Александр Медведь',
    years: '1937–2018',
    categories: ['wrestling'],
    sport: 'Борьба',
    role: 'Трёхкратный олимпийский чемпион; вольная борьба (СССР/Белarus)',
    stats: [
      { value: '3', label: 'золота Олимпиад' },
      { value: '7', label: 'титулов ЧМ' },
      { value: '1964–72', label: 'олимпийский цикл' },
      { value: 'Зал', label: 'славы FILA' },
    ],
    timeline: [
      { year: '1937', text: 'Родился в Белarus.' },
      { year: '1964', text: 'Олимпийское золото в Тokio (средний вес).' },
      { year: '1968', text: 'Олимпийское золото в Мexico City (полутяж).' },
      { year: '1972', text: 'Олимпийское золото в Munich (полутяж); завершение.' },
    ],
    path: [
      'Один из величайших борцов XX века — три олимпиады, три золота.',
      'После спорта — тренерская и общественная работа.',
    ],
    achievements: [
      '3× олимпийский чемпион (1964, 1968, 1972)',
      '7× чемпион мира',
      'Зал слави международной борьбы',
    ],
    facts: [
      'Менял весовую категорию и сохранял доминирование.',
      'Считается одним из лучших вольников всех времён.',
    ],
    record: {
      title: 'Вольная борьба',
      wins: null,
      losses: null,
      draws: null,
      places: [
        { place: '1', event: 'Олимпиада — Tokyo (1964)' },
        { place: '1', event: 'Олимпиада — Mexico City (1968)' },
        { place: '1', event: 'Олимпиада — Munich (1972)' },
      ],
      note: 'Источник: открытые сводки / Википедия.',
    },
    unusual: ['3× олимпийское золото в разных циклах', '7× чемпион мира'],
    training: tWrest('Советская школа: огромный объём борьбы и спецподготовки.'),
    marks: ['Три Олимпиады — три золота', 'Легенда вольной'],
    links: [{ label: 'Alexander Medved (Wikipedia EN)', href: 'https://en.wikipedia.org/wiki/Alexander_Medved' }],
  },
  {
    id: 'kadachnikov',
    name: 'Алексей Кadочников',
    years: '1937–2020',
    categories: ['hand', 'coach'],
    sport: 'Рукопашный бой',
    role: 'Создатель системы «Рукопашный бой» (научно обоснованная методика)',
    stats: [
      { value: '1937', label: 'год рождения' },
      { value: 'система', label: 'методика' },
      { value: 'ВВС', label: 'контекст школы' },
      { value: 'учебники', label: 'наследие' },
    ],
    timeline: [
      { year: '1937', text: 'Родился в СССР.' },
      { year: '1960-е', text: 'Разработка системы рукопашного боя для подготовки личного состава.' },
      { year: '1970-80-е', text: 'Учебники и распространение методики в спортивных и служебных программах.' },
      { year: '2020', text: 'Уход из жизни; система продолжена учениками.' },
    ],
    path: [
      'Создал структурированную систему с акцентом на практичность, движение и работу в стойке и партере.',
      'Методика использовалась в подготовке и спортивном рукопашном бою.',
    ],
    achievements: [
      'Автор системы «Рукопашный бой»',
      'Учебные пособия и методики',
      'Влияние на спортивный и прикладной рукопашный бой в СССР/РФ',
    ],
    facts: [
      'Система строится на принципах биомеханики и поэтапного обучения.',
      'Не «магия техник», а последовательная программа от базы к спаррингу.',
      'Спортивный рукопашный бой ВС РФ развивается отдельно — с соревновательным регламентом.',
    ],
    record: {
      title: 'Система и методика',
      wins: null,
      losses: null,
      draws: null,
      places: [{ place: 'осн.', event: 'Система «Рукопашный бой»' }],
      note: 'Известность через методику, не личный турнирный счёт. Источник: открытые сводки.',
    },
    unusual: ['Автор одной из главных систем рукопашного боя СССР', 'Учебники до сих пор используются'],
    training: tHand('Поэтапная программа: стойка, перемещение, удары, броски, партер.'),
    marks: ['Система важнее отдельных трюков', 'Научный подход к методике'],
    links: [{ label: 'Рукопашный бой (Википедия)', href: 'https://ru.wikipedia.org/wiki/%D0%A0%D1%83%D0%BA%D0%BE%D0%BF%D0%B0%D1%88%D0%BD%D1%8B%D0%B9_%D0%B1%D0%BE%D0%B9' }],
  },
  {
    id: 'arb-champ',
    name: 'Универсальный бой (спорт)',
    years: '',
    categories: ['hand'],
    sport: 'Универсальный бой',
    role: 'Российский вид спорта: ударная техника, броски, удержания по регламенту',
    stats: [
      { value: 'РФ', label: 'регламент' },
      { value: 'удар+бросок', label: 'формат' },
      { value: 'ЧР', label: 'чемпионаты' },
      { value: 'ARB', label: 'аббревиатура' },
    ],
    timeline: [
      { year: '2000-е', text: 'Формирование правил универсального боя в России.' },
      { year: '2010-е', text: 'Чемпионаты России; рост числа клубов.' },
      { year: 'сегодня', text: 'Соревнования по возрастам и разрядам; подготовка в регионах.' },
    ],
    path: [
      'Сочетает элементы ударных единоборств и борьбы в одном поединке.',
      'Спортивный фокус — техника, регламент и безопасность на тatami.',
    ],
    achievements: [
      'Официальный вид спорта в России (универсальный бой)',
      'Ежегодные чемпионаты и первенства',
      'Подготовка спортсменов с детских разрядов',
    ],
    facts: [
      'Поединок ведётся в стойке и в парterе по правилам категории.',
      'Акцент на спортивный результат, а не прикладной «боевой» маркeting.',
      'Чемпионы России меняются по циклам — карточка описывает вид, не одного athlete.',
    ],
    record: {
      title: 'Регламент',
      wins: null,
      losses: null,
      draws: null,
      places: [],
      note: 'Обзорная карточка вида спорта; конкретные чемпионы — в протокolах федерации.',
    },
    unusual: ['Ударка + борьба в одном регламенте', 'Спортивная дисциплина без политического контекста'],
    training: tHand('Техника ударов, бросков и удержаний; спарринг по правилам категории.'),
    marks: ['Регламент и безопасность', 'Спорт для широкого круга'],
    links: [{ label: 'Универсальный бой (Википедия)', href: 'https://ru.wikipedia.org/wiki/%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%B1%D0%BE%D0%B9' }],
  },
]

function deepMerge(base, patch) {
  const out = { ...base }
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && k !== 'record') {
      out[k] = { ...(base[k] || {}), ...v }
    } else {
      out[k] = v
    }
  }
  return out
}

function ensureTraining(f) {
  if (!f.training) {
    if (f.categories.includes('kyokushin')) f.training = f.categories.includes('coach') ? tCoach() : tKyok()
    else if (f.categories.includes('boxing')) f.training = tBox()
    else if (f.categories.includes('mma')) f.training = tMma()
    else if (f.categories.includes('wrestling')) f.training = tWrest()
    else if (f.categories.includes('kick')) f.training = tKick()
    else if (f.categories.includes('kungfu')) f.training = tKung()
    else if (f.categories.includes('hand')) f.training = tHand()
    else if (f.categories.includes('karate')) f.training = tKarate()
    else f.training = tCulture()
  }
}

function serializeValue(v, indent) {
  const sp = ' '.repeat(indent)
  const sp2 = ' '.repeat(indent + 2)
  if (v === null) return 'null'
  if (typeof v === 'string') return JSON.stringify(v)
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    return `[\n${v.map((item) => `${sp2}${serializeValue(item, indent + 2)}`).join(',\n')},\n${sp}]`
  }
  const entries = Object.entries(v)
  return `{\n${entries
    .map(([k, val]) => {
      const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)
      return `${sp2}${key}: ${serializeValue(val, indent + 2)}`
    })
    .join(',\n')},\n${sp}}`
}

function serializeFigure(f, indent = 2) {
  return serializeValue(f, indent)
}

const { FIGURES: OLD } = await import('../src/data/figures.js')

const existingIds = new Set(OLD.map((f) => f.id))
const enhanced = OLD.map((f) => {
  const patch = PATCH[f.id] || {}
  let merged = deepMerge(f, patch)
  if (!merged.sport) {
    const cat = merged.categories[0]
    const sportMap = {
      kyokushin: 'Киокушинкай',
      boxing: 'Бокс',
      mma: 'MMA',
      wrestling: 'Борьба',
      kick: 'Кикбоксинг · K-1',
      kungfu: 'Кунг-фу',
      karate: 'Каратэ',
      hand: 'Рукопашный бой',
      culture: 'Популяризатор',
    }
    merged.sport = sportMap[cat] || 'Единоборства'
  }
  ensureTraining(merged)
  applyPhoto(merged)
  return merged
})

for (const nf of NEW_FIGURES) {
  if (!existingIds.has(nf.id)) {
    ensureTraining(nf)
    applyPhoto(nf)
    enhanced.push(nf)
  }
}

const searchFn = `export function searchFigures(q) {
  const s = (q || '').trim().toLowerCase()
  if (!s) return FIGURES
  return FIGURES.filter((f) => {
    const hay = [
      f.name,
      f.role,
      f.sport || '',
      ...(f.path || []),
      ...(f.marks || []),
      ...(f.achievements || []),
      ...(f.facts || []),
      ...(f.unusual || []),
      ...(f.timeline || []).map((t) => \`\${t.year} \${t.text}\`),
      f.note || '',
      f.record?.title || '',
      f.record?.formula || '',
      f.record?.note || '',
      ...(f.record?.places || []).map((p) => \`\${p.place} \${p.event}\`),
      f.hyakunin?.title || '',
      f.hyakunin?.formula || '',
      f.hyakunin?.note || '',
      f.training?.title || '',
      ...(f.training?.discipline || []),
      ...(f.training?.sample || []).map((x) => \`\${x.name} \${x.detail}\`),
      f.training?.volume || '',
      ...(f.videos || []).map((v) => v.label),
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(s)
  })
}
`

const header = `/**
 * Раздел «Пути» — выдающиеся спортсмены и учители.
 * Карточки с цифрами, лентой событий, достижениями и фактами.
 * Список пополняется постепенно.
 */

export const FIGURES_INTRO = ${serializeValue(FIGURES_INTRO, 0)}

export const FIGURE_CATEGORIES = ${serializeValue(FIGURE_CATEGORIES, 0)}

/** @type {Array<Record<string, any>>} */
export const FIGURES = [
${enhanced.map((f) => serializeFigure(f)).join(',\n')},
]

export function figureById(id) {
  return FIGURES.find((f) => f.id === id) || null
}

export function figuresByCategory(catId) {
  if (!catId || catId === 'all') return FIGURES
  return FIGURES.filter((f) => f.categories.includes(catId))
}

${searchFn}`

fs.writeFileSync(outPath, header, 'utf8')

const hyakuninIds = enhanced.filter((f) => f.hyakunin).map((f) => f.id)
const newIds = NEW_FIGURES.map((f) => f.id)

console.log('Total figures:', enhanced.length)
console.log('New ids:', newIds.join(', '))
console.log('Hyakunin added/updated:', hyakuninIds.join(', '))
