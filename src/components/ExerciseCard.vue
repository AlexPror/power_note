<script setup>
import { computed } from 'vue'
import { LineChart } from './Charts'

const props = defineProps({
  ex: { type: Object, required: true },
  trend: { type: String, default: '' },
})

const SOURCE_COLOR = {
  coach: '#c45c28',
  self: '#1a6f8a',
}

const labels = computed(() => props.ex.points.map((p) => p.label))
const datasets = computed(() => [{
  label: props.ex.unit,
  data: props.ex.points.map((p) => p.v),
  borderColor: props.ex.color,
  backgroundColor: props.ex.color + '22',
  fill: true,
  tension: 0.35,
  pointRadius: props.ex.points.map((p) => (p.source ? 5 : 3)),
  pointBackgroundColor: props.ex.points.map(
    (p) => SOURCE_COLOR[p.source] || props.ex.color,
  ),
  pointBorderColor: '#fff',
  pointBorderWidth: 1,
}])

const hasSources = computed(() => props.ex.points.some((p) => p.source))
</script>

<template>
  <div class="ex-card">
    <div class="head">
      <span class="name">{{ ex.name }}</span>
      <span v-if="trend" class="badge">{{ trend }}</span>
    </div>
    <div class="now">
      <template v-if="ex.ladder?.length">{{ ex.ladder.join('–') }}</template>
      <template v-else>{{ ex.current }}</template>
      <small>{{ ex.unit }}</small>
    </div>
    <div class="chart-box sm" style="margin-top:0.45rem" v-if="ex.points.length > 1">
      <LineChart :labels="labels" :datasets="datasets" />
    </div>
    <p v-else class="hint-line" style="margin:0.45rem 0 0">График появится после следующих замеров</p>
    <p v-if="hasSources" class="source-legend">
      <span class="src coach">тренер</span>
      <span class="src self">сам / семья</span>
    </p>
  </div>
</template>
