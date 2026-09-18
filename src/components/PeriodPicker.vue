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
const open = ref(false)

const primaryIds = ['weeks4', 'all']
const primary = PERIOD_PRESETS.filter((p) => primaryIds.includes(p.id))
const more = PERIOD_PRESETS.filter((p) => !primaryIds.includes(p.id))

const period = computed(() => {
  const sel = selection.value.mode === 'custom'
    ? { mode: 'custom', from: customFrom.value, to: customTo.value }
    : selection.value
  return resolvePeriod(props.athlete, sel)
})

const activeLabel = computed(() => {
  const id = selection.value.mode || 'weeks4'
  return PERIOD_PRESETS.find((p) => p.id === id)?.label || 'Период'
})

watch(period, (p) => emit('update:period', p), { immediate: true })

watch(() => props.athlete.slug, (slug) => {
  selection.value = readPeriodSelection(slug)
  if (selection.value.from) customFrom.value = selection.value.from
  if (selection.value.to) customTo.value = selection.value.to
  open.value = false
})

function pick(id) {
  if (id === 'custom') {
    selection.value = { mode: 'custom', from: customFrom.value, to: customTo.value }
  } else {
    selection.value = { mode: id }
  }
  persist()
  if (id !== 'custom') open.value = false
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
    <button type="button" class="period-toggle" :aria-expanded="open" @click="open = !open">
      <span class="period-toggle-label">{{ activeLabel }}</span>
      <span class="period-toggle-range">{{ period.label }}</span>
    </button>

    <div v-if="open" class="period-panel">
      <div class="period-chips" role="tablist" aria-label="Период">
        <button
          v-for="p in primary"
          :key="p.id"
          type="button"
          class="chip"
          :class="{ on: selection.mode === p.id || (p.id === 'weeks4' && !selection.mode) }"
          @click="pick(p.id)"
        >
          {{ p.label }}
        </button>
        <button
          v-for="p in more"
          :key="p.id"
          type="button"
          class="chip"
          :class="{ on: selection.mode === p.id }"
          @click="pick(p.id)"
        >
          {{ p.label }}
        </button>
      </div>
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
  </div>
</template>
