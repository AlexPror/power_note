<script setup>
import { computed, inject, ref } from 'vue'
import PeriodPicker from '@/components/PeriodPicker.vue'
import { formatDay, inPeriod } from '@/lib/period'
import { sessionCounts } from '@/lib/trends'
import { DoughnutChart } from '@/components/Charts'
import { profileById } from '@/data/profiles'

const athlete = inject('athlete')
const showAll = ref(false)
const period = ref(null)
const profile = computed(() => profileById(athlete.value.profileId || 'kyokushin'))

const counts = computed(() => (period.value ? sessionCounts(athlete.value.trainRows, period.value) : { total: 0, rest: 0, kinds: {} }))

const rows = computed(() => {
  if (!period.value) return []
  const all = [...athlete.value.trainRows].reverse()
  const inP = all.filter((r) => inPeriod(r.date, period.value))
  return showAll.value ? inP : inP.slice(0, 6)
})

const doughnut = computed(() => {
  const kinds = profile.value.sessionKinds
  return {
    labels: kinds.map((k) => k.label),
    values: kinds.map((k) => counts.value.kinds[k.id] || 0),
    colors: kinds.map((k) => k.color),
  }
})

function onPeriod(v) {
  period.value = v
}
</script>

<template>
  <div>
    <h1 class="page-title">Дневник</h1>
    <PeriodPicker :athlete="athlete" @update:period="onPeriod" />
    <p v-if="period" class="page-sub">
      {{ period.label }} · {{ counts.total }} тренировок · пропусков {{ counts.rest }}
    </p>

    <div class="list">
      <div
        v-for="t in rows"
        :key="t.date + t.type"
        class="list-row session session-full"
        :class="{ 'bump-coach': t.bump === 'coach', 'bump-self': t.bump === 'self' }"
      >
        <div class="date">{{ formatDay(t.date) }}</div>
        <div class="type">{{ t.type }}</div>
        <div class="body">
          <p class="session-note">{{ t.body }}</p>
          <ul v-if="t.exercises?.length" class="ex-done">
            <li v-for="(e, i) in t.exercises" :key="i">
              <span class="ex-name">{{ e.name }}</span>
              <span class="ex-dose">{{ e.dose }}</span>
              <span v-if="e.up" class="ex-up" title="чуть больше, чем в прошлый раз">↑</span>
            </li>
          </ul>
        </div>
        <div class="mark">{{ t.mark }}</div>
      </div>
    </div>
    <p v-if="!rows.length" class="note">В этом диапазоне записей нет.</p>
    <p class="note" v-if="period && athlete.trainRows.length > 6">
      <button class="btn ghost" type="button" @click="showAll = !showAll">
        {{ showAll ? 'Свернуть' : 'Показать период' }}
      </button>
    </p>

    <details class="disclose group-gap">
      <summary>
        Типы сессий
        <span class="meta-line">{{ profile.shortName }}</span>
      </summary>
      <div class="disclose-body">
        <div class="chart-box sm">
          <DoughnutChart
            :labels="doughnut.labels"
            :values="doughnut.values"
            :colors="doughnut.colors"
          />
        </div>
      </div>
    </details>
  </div>
</template>
