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
import { exercisesInPeriod, groupExercises, LAYER_LABELS, affectLabel } from '@/lib/exercises'
import { profileById } from '@/data/profiles'
import { athleteBySlug } from '@/data/athletes'
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
const last = computed(() => {
  const rows = [...athlete.value.trainRows].filter((r) => !p.value || inPeriod(r.date, p.value))
  return rows[rows.length - 1]
})
const lastKg = computed(() => athlete.value.weightRows.at(-1)?.kg)
const showKg = computed(() => showWeightOnNow(age.value))
const cycle = computed(() => (p.value ? cycleForPeriod(athlete.value, p.value) : null))
const activeRecs = computed(() =>
  (athlete.value.recommendations || []).filter((r) => r.status === 'active'),
)
const layerOrder = ['body', 'plank', 'load', 'skill']
const plankTrend = computed(() => {
  const plank = groups.value.plank || []
  if (!plank.length) return null
  const first = plank.map((e) => e.points[0]?.v || 0).reduce((a, b) => a + b, 0)
  const lastV = plank.map((e) => e.points.at(-1)?.v || 0).reduce((a, b) => a + b, 0)
  return trendOf([{ v: first }, { v: lastV }])
})
const nextAttest = computed(() => nextAttestation(athlete.value.kyu))

function onPeriod(v) {
  period.value = v
}

function layerTitle(layer) {
  if (layer === 'plank') return `Планка · 4 вида`
  if (layer === 'body') return LAYER_LABELS.body
  return LAYER_LABELS[layer] || layer
}

function layerHint(layer) {
  if (layer === 'plank') return plankTrend.value?.label || ''
  if (layer === 'load') return 'есть записи'
  if (layer === 'skill') return 'спорт'
  return 'своё тело'
}
</script>

<template>
  <div>
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

    <div v-if="homeItems.length" class="group-gap">
      <div class="section-label">
        <h2>Дома · {{ cycleNow.title }}</h2>
        <span class="hint">{{ cycleNow.start.slice(5) }} — {{ cycleNow.end.slice(5) }}</span>
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
        <details class="disclose home-extra">
          <summary>
            Подсказки к блоку
            <span class="meta-line">инвентарь · техника</span>
          </summary>
          <div class="disclose-body">
            <p class="note" style="margin-top:0">{{ PLAN_HORIZON.homeHint }}</p>
            <p v-for="(item, i) in homeItems.filter((x) => x.note)" :key="'n'+i" class="note">
              {{ item.name }}: {{ item.note }}
            </p>
            <p v-if="planGroup" class="note">{{ planGroup.gear }}</p>
            <p v-if="athlete.planGroup === 'teen' || athlete.planGroup === 'senior'" class="note">{{ GYM_NOTE }}</p>
            <p class="note safety-note">{{ SAFETY_NOTICE }}</p>
          </div>
        </details>
      </div>
    </div>

    <div v-if="nextAttest" class="group-gap">
      <RouterLink class="panel attest-teaser" :to="`/u/${athlete.slug}/base/attestation`">
        <div class="section-label" style="margin:0">
          <h2>К нормативам</h2>
          <span class="hint">{{ prepLabel(nextAttest) }}</span>
        </div>
        <p class="hint-line">{{ beltLabel(nextAttest.kyu) }} · отжим. {{ nextAttest.push }} · пресс {{ nextAttest.crunch }} · кумитэ {{ nextAttest.kumite }}</p>
      </RouterLink>
    </div>

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
      <div v-if="showKg && lastKg" class="status-item">
        <div class="lbl">Вес</div>
        <div class="val">{{ formatKg(lastKg) }}</div>
        <div class="hint">кг · как растём</div>
      </div>
      <div class="status-item">
        <div class="lbl">Тренд</div>
        <div class="val" style="font-size:1.2rem">{{ trend.label }}</div>
        <div class="hint">маяки периода</div>
      </div>
    </div>

    <div v-if="activeRecs.length" class="group-gap">
      <div class="section-label">
        <h2>Что делаем</h2>
        <span class="hint">рекомендации</span>
      </div>
      <div class="list">
        <div v-for="r in activeRecs" :key="r.id" class="list-row rec-row">
          <div>
            <p class="rec-obs">{{ r.observation }}</p>
            <p class="rec-act">{{ r.action }}</p>
            <p v-if="r.affects?.length" class="hint-line">
              Влияет на:
              {{ r.affects.map((id) => affectLabel(id)).join(', ') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="section-label group-gap">
      <h2>Последняя сессия</h2>
      <span class="hint">в выбранном периоде</span>
    </div>
    <div v-if="last" class="list">
      <div class="list-row session">
        <div class="date">{{ formatDay(last.date) }}</div>
        <div class="type">{{ last.type }}</div>
        <div class="body">{{ last.body }}</div>
        <div class="mark">{{ last.mark }}</div>
      </div>
    </div>
    <p v-else class="note">В этом диапазоне сессий нет.</p>

    <div class="group-gap">
      <div class="section-label">
        <h2>Отчёт цикла</h2>
        <span class="hint">только с собой</span>
      </div>
      <div v-if="cycle?.report" class="panel">
        <p class="report">
          <span v-if="cycle.title" class="badge" style="margin-right:0.4rem">{{ cycle.title }}</span>
          {{ cycle.report }}
        </p>
      </div>
      <p v-else class="note">Отчёт появится после разбора тренера за цикл.</p>
    </div>

    <template v-for="layer in layerOrder" :key="layer">
      <div v-if="groups[layer]?.length" class="group-gap">
        <div class="section-label">
          <h2>{{ layerTitle(layer) }}</h2>
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

    <details v-if="!showKg" class="disclose group-gap">
      <summary>
        Подробности профиля
        <span class="meta-line">вес · заметки</span>
      </summary>
      <div class="disclose-body">
        <p class="note" v-if="lastKg">Вес {{ formatKg(lastKg) }} кг — контроль роста, не цель «минус». Для 8–12 лет не на первом экране.</p>
        <p class="note">{{ athlete.notes }}</p>
      </div>
    </details>
  </div>
</template>
