<script setup>
import { computed } from 'vue'
import { LineChart } from './Charts'

const props = defineProps({
  ex: { type: Object, required: true },
  trend: { type: String, default: '' },
})

const labels = computed(() => props.ex.points.map((p) => p.label))
const datasets = computed(() => [{
  label: props.ex.unit,
  data: props.ex.points.map((p) => p.v),
  borderColor: props.ex.color,
  backgroundColor: props.ex.color + '22',
  fill: true,
  tension: 0.35,
  pointRadius: 3,
  pointBackgroundColor: props.ex.color,
}])
</script>

<template>
  <div class="ex-card">
    <div class="head">
      <span class="name">{{ ex.name }}</span>
      <span v-if="trend" class="badge">{{ trend }}</span>
    </div>
    <div class="now">
      {{ ex.current }}
      <small>{{ ex.unit }}</small>
    </div>
    <div class="chart-box sm" style="margin-top:0.45rem" v-if="ex.points.length > 1">
      <LineChart :labels="labels" :datasets="datasets" />
    </div>
    <p v-else class="hint-line" style="margin:0.45rem 0 0">График появится после следующих замеров</p>
  </div>
</template>
