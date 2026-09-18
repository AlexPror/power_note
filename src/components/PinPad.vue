<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Код кабинета' },
  hint: { type: String, default: '4 цифры' },
  error: { type: String, default: '' },
})

const emit = defineEmits(['submit'])
const digits = ref('')

const dots = computed(() => Array.from({ length: 4 }, (_, i) => i < digits.value.length))

function press(n) {
  if (digits.value.length >= 4) return
  digits.value += String(n)
  if (digits.value.length === 4) emit('submit', digits.value)
}

function back() {
  digits.value = digits.value.slice(0, -1)
}

function reset() {
  digits.value = ''
}

defineExpose({ reset })
</script>

<template>
  <div class="pin-wrap">
    <p class="pin-title">{{ title }}</p>
    <p class="pin-hint">{{ hint }}</p>
    <div class="pin-dots" aria-hidden="true">
      <span v-for="(on, i) in dots" :key="i" class="pin-dot" :class="{ on }" />
    </div>
    <p v-if="error" class="pin-error">{{ error }}</p>
    <div class="pin-pad">
      <button v-for="n in [1,2,3,4,5,6,7,8,9]" :key="n" type="button" class="pin-key" @click="press(n)">{{ n }}</button>
      <span class="pin-key ghost" />
      <button type="button" class="pin-key" @click="press(0)">0</button>
      <button type="button" class="pin-key ghost" @click="back">⌫</button>
    </div>
  </div>
</template>
