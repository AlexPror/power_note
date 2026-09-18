<script setup>
import { computed } from 'vue'
import { beltByKyu, beltLabel } from '@/data/belts'

const props = defineProps({
  kyu: { type: Number, required: true },
})

const belt = computed(() => beltByKyu(props.kyu))
const label = computed(() => beltLabel(props.kyu))
</script>

<template>
  <span
    class="kyu"
    :title="label"
    :style="{ background: belt.hex, color: belt.ink }"
  >
    {{ belt.name }}
    <i v-if="belt.stripe" class="kyu-stripe" aria-hidden="true" />
  </span>
</template>
