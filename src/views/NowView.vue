<script setup>
import { computed, inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import KyuBadge from '@/components/KyuBadge.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import PeriodPicker from '@/components/PeriodPicker.vue'
import { ageYears, fullName, showWeightOnNow, formatKg } from '@/lib/age'
import { beltLabel } from '@/data/belts'
import { formatDay, cycleForPeriod, inPeriod, REF_TODAY } from '@/lib/period'
import { overallTrend, trendOf, sessionCounts } from '@/lib/trends'
import { exercisesInPeriod, groupExercises, LAYER_LABELS, affectBenefit } from '@/lib/exercises'
import { profileById } from '@/data/profiles'
import { athleteBySlug } from '@/data/athletes'
import { DEMO_WEEK } from '@/data/athletes/demo'
import {
  PLAN_GROUPS,
  PLAN_HORIZON,
  SAFETY_NOTICE,
  GYM_NOTE,
  currentCycle,
  homeBlock,
} from '@/data/trainingPlan'
import { videoById } from '@/data/videos'
import { nextAttestation, prepLabel } from '@/data/attestation'

const athlete = inject('athlete')
const period = ref(null)

const age = computed(() => ageYears(athlete.value.dob))
const profile = computed(() => profileById(athlete.value.profileId || 'kyokushin'))
const planGroup = computed(() => PLAN_GROUPS[athlete.value.planGroup] || null)
const cycleNow = computed(() => currentCycle(REF_TODAY))
const homeItems = computed(() => {
  const g = athlete.value.planGroup
  if (!g) return []
  return homeBlock(g, cycleNow.value.id)
})
const week = computed(() => athlete.value.schedule || DEMO_WEEK)

function lessonHref(vid) {
  const v = videoById(vid)
  if (!v) return null
  if (v.internal === 'pullups') return { kind: 'route', to: `/u/${athlete.value.slug}/base/pullups`, label: v.title }
  if (v.internal === 'etiquette') return { kind: 'route', to: `/u/${athlete.value.slug}/base/etiquette`, label: v.title }
  if (v.href) return { kind: 'ext', href: v.href, label: v.title }
  return { kind: 'text', label: v.title }
}

const siblings = computed(() =>
  (athlete.value.siblingSlugs || [])
    .map((s) => athleteBySlug(s))
    .filter(Boolean)
    .map((a) => fullName(a)),
)

const p = computed(() => period.value)
const filteredEx = computed(() => (p.value ? exercisesInPeriod(athlete.value.exercises, p.value) : []))
const groups = computed(() => groupExercises(filteredEx.value))
const trend = computed(() => overallTrend(filteredEx.value))
const counts = computed(() => (p.value ? sessionCounts(athlete.value.trainRows, p.value) : { total: 0, rest: 0 }))
const recent = computed(() => {
  const rows = [...athlete.value.trainRows].filter((r) => !p.value || inPeriod(r.date, p.value))
  return rows.slice(-5).reverse()
})
const lastKg = computed(() => athlete.value.weightRows.at(-1)?.kg)
const showKg = computed(() => showWeightOnNow(age.value))
const cycle = computed(() => (p.value ? cycleForPeriod(athlete.value, p.value) : null))
const activeRecs = computed(() =>
  (athlete.value.recommendations || []).filter((r) => r.status === 'active'),
)
const layerOrder = ['body', 'plank', 'load', 'skill']
const nextAttest = computed(() => nextAttestation(athlete.value.kyu))
const foodOn = computed(() => (athlete.value.foodIds || []).length > 0)
const foodInsights = computed(() => athlete.value.foodInsights || null)

function onPeriod(v) {
  period.value = v
}

function layerTitle(layer) {
  if (layer === 'plank') return 'Планка'
  if (layer === 'body') return LAYER_LABELS.body
  return LAYER_LABELS[layer] || layer
}

function layerHint(layer) {
  if (layer === 'plank') return 'прямая и боковые'
  if (layer === 'load') return 'есть записи'
  if (layer === 'skill') return 'спорт'
  return 'своё тело'
}

function bumpClass(row) {
  if (row.bump === 'coach') return 'bump-coach'
  if (row.bump === 'self') return 'bump-self'
  return ''
}
</script>

<template>
  <div>
    <div v-if="athlete.isDemo" class="panel demo-banner">
      <p class="eyebrow" style="margin:0">{{ athlete.demoTitle }}</p>
      <p class="note" style="margin:0.35rem 0 0">{{ athlete.demoLead }}</p>
      <p class="hint-line">Период: «{{ cycleNow.title }}» · {{ cycleNow.start.slice(5) }} — {{ cycleNow.end.slice(5) }} · {{ age }} лет · PIN <strong>1111</strong></p>
    </div>

    <p class="eyebrow">{{ profile.shortName }} · кабинет</p>
    <h1 class="page-title">{{ fullName(athlete) }}</h1>
    <p class="page-sub">
      {{ age }} {{ age === 1 ? 'год' : age < 5 ? 'года' : 'лет' }}
      · {{ beltLabel(athlete.kyu) }}
      · обновлено {{ athlete.updated }}
    </p>
    <p v-if="siblings.length" class="hint-line">Брат/сестра в группе: {{ siblings.join(', ') }}</p>
    <p v-if="planGroup" class="hint-line">{{ planGroup.label }} · додзё {{ PLAN_HORIZON.dojoDays.join('/') }}</p>

    <PeriodPicker :athlete="athlete" @update:period="onPeriod" />

    <div v-if="p" class="status-strip">
      <div class="status-item">
        <div class="lbl">Пояс</div>
        <div class="val" style="font-size:1.2rem;display:flex;align-items:center;gap:0.4rem">
          <KyuBadge :kyu="athlete.kyu" />
        </div>
        <div class="hint">с {{ formatDay(athlete.kyuSince) }}</div>
      </div>
      <div class="status-item">
        <div class="lbl">Тренировок</div>
        <div class="val">{{ counts.total }}</div>
        <div class="hint">пропусков {{ counts.rest }}</div>
      </div>
      <div class="status-item">
        <div class="lbl">Тренд</div>
        <div class="val" style="font-size:1.15rem">{{ trend.label }}</div>
        <div class="hint">маяки периода</div>
      </div>
      <div v-if="foodOn" class="status-item">
        <div class="lbl">Еда</div>
        <div class="val" style="font-size:1.05rem">ведём</div>
        <div class="hint">с {{ foodInsights?.started?.slice(5) || '…' }}</div>
      </div>
    </div>

    <!-- 1. Расписание -->
    <div class="group-gap">
      <div class="section-label">
        <h2>1. Расписание</h2>
        <span class="hint">неделя группы</span>
      </div>
      <div class="week-grid">
        <div
          v-for="d in week"
          :key="d.day"
          class="week-cell"
          :data-kind="d.kind"
        >
          <div class="week-day">{{ d.day }}</div>
          <div class="week-title">{{ d.title }}</div>
          <div class="week-body">{{ d.body }}</div>
        </div>
      </div>
    </div>

    <!-- 2. План -->
    <div v-if="homeItems.length" class="group-gap">
      <div class="section-label">
        <h2>2. План тренировки</h2>
        <span class="hint">{{ cycleNow.title }}</span>
      </div>
      <div class="panel">
        <p class="hint-line" style="margin-top:0">{{ cycleNow.focus }}</p>
        <ul class="plain-list home-plan-list">
          <li v-for="(item, i) in homeItems" :key="i">
            <strong>{{ item.name }}</strong> — {{ item.dose }}
            <span v-if="item.videoIds?.length" class="hint-line">
              ·
              <template v-for="(vid, vi) in item.videoIds" :key="vid">
                <template v-if="lessonHref(vid)">
                  <RouterLink v-if="lessonHref(vid).kind === 'route'" :to="lessonHref(vid).to">{{ lessonHref(vid).label }}</RouterLink>
                  <a
                    v-else-if="lessonHref(vid).kind === 'ext'"
                    :href="lessonHref(vid).href"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{{ lessonHref(vid).label }}</a>
                  <span v-else>{{ lessonHref(vid).label }}</span>
                </template>
                <span v-if="vi < item.videoIds.length - 1">, </span>
              </template>
            </span>
          </li>
        </ul>
        <p v-if="athlete.pullLadder" class="hint-line" style="margin-top:0.5rem">
          Подтягивания — лесенка {{ athlete.pullLadder.join('–') }}
        </p>
        <p v-if="athlete.equipment" class="hint-line">
          Снаряды: гиря {{ athlete.equipment.kettlebellKg }} кг · гантели {{ athlete.equipment.dumbbellKg }} кг на руку
          · жим/присед — {{ athlete.equipment.benchSquat }}
        </p>
        <details class="disclose home-extra">
          <summary>
            Подсказки
            <span class="meta-line">инвентарь · безопасность</span>
          </summary>
          <div class="disclose-body">
            <p class="note" style="margin-top:0">{{ PLAN_HORIZON.homeHint }}</p>
            <p v-if="planGroup" class="note">{{ planGroup.gear }}</p>
            <p v-if="athlete.planGroup === 'teen' || athlete.planGroup === 'senior'" class="note">{{ GYM_NOTE }}</p>
            <p class="note safety-note">{{ SAFETY_NOTICE }}</p>
          </div>
        </details>
      </div>
    </div>

    <!-- 3. Отчёт -->
    <div class="group-gap">
      <div class="section-label">
        <h2>3. Отчёт цикла</h2>
        <span class="hint">только с собой</span>
      </div>
      <div v-if="cycle?.report" class="panel">
        <p class="report">
          <span v-if="cycle.title" class="badge" style="margin-right:0.4rem">{{ cycle.title }}</span>
          {{ cycle.report }}
        </p>
      </div>
      <p v-else class="note">Отчёт появится после разбора тренера за цикл.</p>

      <div v-if="activeRecs.length" class="list" style="margin-top:0.75rem">
        <div
          v-for="r in activeRecs"
          :key="r.id"
          class="list-row rec-row"
          :class="{ 'rec-coach': r.source === 'coach', 'rec-self': r.source === 'self' }"
        >
          <div>
            <p class="rec-obs">
              <span v-if="r.source === 'coach'" class="src coach">тренер</span>
              <span v-else-if="r.source === 'self'" class="src self">сам</span>
              {{ r.observation }}
            </p>
            <p class="rec-act">{{ r.action }}</p>
            <p v-if="r.affects?.length" class="hint-line">
              Развивает: {{ r.affects.map((id) => affectBenefit(id)).join('; ') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Прогресс -->
    <div class="group-gap">
      <div class="section-label">
        <h2>4. Прогресс</h2>
        <span class="hint">графики маяков</span>
      </div>
      <p class="source-legend" style="margin:0 0 0.65rem">
        Точки:
        <span class="src coach">по рекомендации тренера</span>
        <span class="src self">по желанию Васи / семьи</span>
      </p>
      <template v-for="layer in layerOrder" :key="layer">
        <div v-if="groups[layer]?.length" class="layer-block">
          <div class="section-label">
            <h3 class="layer-h">{{ layerTitle(layer) }}</h3>
            <span class="hint">{{ layerHint(layer) }}</span>
          </div>
          <div class="ex-grid">
            <ExerciseCard
              v-for="ex in groups[layer]"
              :key="ex.id"
              :ex="ex"
              :trend="ex.trendMeta?.label || trendOf(ex.points).label"
            />
          </div>
        </div>
      </template>
      <p v-if="!filteredEx.length" class="note">В этом периоде замеров ещё нет.</p>
    </div>

    <!-- Сессии -->
    <div class="group-gap">
      <div class="section-label">
        <h2>Последние тренировки</h2>
        <span class="hint">в периоде</span>
      </div>
      <div v-if="recent.length" class="list">
        <div
          v-for="row in recent"
          :key="row.date + row.type"
          class="list-row session session-full"
          :class="bumpClass(row)"
        >
          <div class="date">{{ formatDay(row.date) }}</div>
          <div class="type">{{ row.type }}</div>
          <div class="body">
            <p class="session-note">{{ row.body }}</p>
            <ul v-if="row.exercises?.length" class="ex-done">
              <li v-for="(e, i) in row.exercises" :key="i">
                <span class="ex-name">{{ e.name }}</span>
                <span class="ex-dose">{{ e.dose }}</span>
                <span v-if="e.up" class="ex-up" title="чуть больше, чем в прошлый раз">↑</span>
              </li>
            </ul>
          </div>
          <div class="mark">{{ row.mark }}</div>
        </div>
      </div>
      <p v-else class="note">В этом диапазоне сессий нет.</p>
      <p class="hint-line">
        <RouterLink :to="`/u/${athlete.slug}/diary`">Весь дневник →</RouterLink>
      </p>
    </div>

    <!-- Еда teaser -->
    <div v-if="foodOn" class="group-gap">
      <div class="section-label">
        <h2>Еда</h2>
        <span class="hint">семья ведёт</span>
      </div>
      <div class="panel">
        <p v-if="foodInsights" class="report" style="margin:0">{{ foodInsights.headline }}</p>
        <p class="hint-line">
          <RouterLink :to="`/u/${athlete.slug}/food`">Открыть рацион и выводы →</RouterLink>
        </p>
      </div>
    </div>

    <details v-if="!showKg" class="disclose group-gap">
      <summary>
        Подробности профиля
        <span class="meta-line">вес · заметки</span>
      </summary>
      <div class="disclose-body">
        <p class="note" v-if="lastKg">Вес {{ formatKg(lastKg) }} кг — контроль роста, не цель «минус».</p>
        <p class="note">{{ athlete.notes }}</p>
      </div>
    </details>
  </div>
</template>
