<script setup>
import { computed, ref, watch } from 'vue'
import {
  PERIOD_PRESETS,
  readPeriodSelection,
  writePeriodSelection,
  resolvePeriod,
  REF_TODAY,
} from '@/lib/period'

const props = defineProps({
  athlete: { type: Object, required: true },
})

const emit = defineEmits(['update:period'])

const selection = ref(readPeriodSelection(props.athlete.slug))
const customFrom = ref(selection.value.from || props.athlete.periodStart || '2026-08-18')
const customTo = ref(selection.value.to || REF_TODAY)

const period = computed(() => {
  const sel = selection.value.mode === 'custom'
    ? { mode: 'custom', from: customFrom.value, to: customTo.value }
    : selection.value
  return resolvePeriod(props.athlete, sel)
})

watch(period, (p) => emit('update:period', p), { immediate: true })

watch(() => props.athlete.slug, (slug) => {
  selection.value = readPeriodSelection(slug)
  if (selection.value.from) customFrom.value = selection.value.from
  if (selection.value.to) customTo.value = selection.value.to
})

function pick(id) {
  if (id === 'custom') {
    selection.value = { mode: 'custom', from: customFrom.value, to: customTo.value }
  } else {
    selection.value = { mode: id }
  }
  persist()
}

function onCustom() {
  selection.value = { mode: 'custom', from: customFrom.value, to: customTo.value }
  persist()
}

function persist() {
  writePeriodSelection(props.athlete.slug, selection.value)
}
</script>

<template>
  <div class="period-bar">
    <div class="period-chips" role="tablist" aria-label="Период">
      <button
        v-for="p in PERIOD_PRESETS"
        :key="p.id"
        type="button"
        class="chip"
        :class="{ on: selection.mode === p.id || (p.id === 'weeks4' && !selection.mode) }"
        @click="pick(p.id)"
      >
        {{ p.label }}
      </button>
    </div>
    <p class="period-range">{{ period.label }}</p>
    <div v-if="selection.mode === 'custom'" class="period-custom">
      <label>
        С
        <input v-model="customFrom" type="date" @change="onCustom" />
      </label>
      <label>
        По
        <input v-model="customTo" type="date" @change="onCustom" />
      </label>
    </div>
  </div>
</template>
