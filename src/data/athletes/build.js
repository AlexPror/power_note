import {
  PLAN_HORIZON,
  cyclesForAthlete,
  recommendationsFor,
  exerciseBeacons,
} from '@/data/trainingPlan'

/**
 * @param {object} seed
 */
export function buildAthlete(seed) {
  const today = '18.09.2026'
  const weightRows = seed.kg != null ? [{ date: PLAN_HORIZON.start, kg: seed.kg, note: 'старт сезона' }] : []
  const trainRows = [
    {
      date: PLAN_HORIZON.start,
      type: 'Додзё',
      kind: 'dojo',
      body: 'Старт сезона ОФП. Замеры и знакомство с домашним блоком.',
      mark: 'старт',
      exercises: [],
    },
  ]
  if (seed.pullLadder) {
    const ladder = seed.pullLadder.join('–')
    trainRows[0].body += ` Подтягивания лесенкой ${ladder}.`
    trainRows[0].exercises.push({ name: 'Подтягивания', dose: `лесенка ${ladder}`, up: false })
  } else if (seed.pullMax != null) {
    trainRows[0].body += ` Подтягивания макс. ${seed.pullMax}.`
    trainRows[0].exercises.push({ name: 'Подтягивания', dose: `макс. ${seed.pullMax}`, up: false })
  }

  const exercises = exerciseBeacons(seed.planGroup)
  if (seed.pullLadder) {
    const pull = exercises.find((e) => e.id === 'pull')
    if (pull) {
      const peak = Math.max(...seed.pullLadder)
      pull.current = peak
      pull.unit = 'лесенка'
      pull.name = 'Подтягивания · лесенка'
      pull.points = [{ date: PLAN_HORIZON.start, label: '18.09', v: peak, note: seed.pullLadder.join('-') }]
      pull.ladder = seed.pullLadder
    }
  } else if (seed.pullMax != null) {
    const pull = exercises.find((e) => e.id === 'pull')
    if (pull) {
      pull.current = seed.pullMax
      pull.points = [{ date: PLAN_HORIZON.start, label: '18.09', v: seed.pullMax }]
    }
  }

  const baseRecs = recommendationsFor(seed.planGroup, 'c1')
  const recommendations = seed.extraRecs ? [...seed.extraRecs, ...baseRecs] : baseRecs

  return {
    slug: seed.slug,
    firstName: seed.firstName,
    lastName: seed.lastName,
    sex: seed.sex,
    dob: seed.dob,
    kyu: seed.kyu ?? 10,
    kyuSince: PLAN_HORIZON.start,
    height: seed.height ?? null,
    pinHash: seed.pinHash,
    profileId: 'kyokushin',
    planGroup: seed.planGroup,
    siblingSlugs: seed.siblingSlugs || [],
    periodStart: PLAN_HORIZON.start,
    updated: today,
    notes: seed.notes || '',
    allergies: seed.allergies || [],
    cycles: cyclesForAthlete(seed.planGroup),
    recommendations,
    weightRows,
    foodIds: [],
    foodDays: [],
    trainRows,
    exercises,
    pullLadder: seed.pullLadder || null,
    equipment: seed.equipment || null,
  }
}
