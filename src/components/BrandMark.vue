<script setup>
import logoUrl from '@/assets/logo.png'

defineProps({
  /** compact — шапка; full — герой на главной со слоганом */
  variant: { type: String, default: 'compact' },
})
</script>

<template>
  <span class="brand-mark" :class="variant" aria-label="7 вершин — Своя вершина — каждый день">
    <img
      class="brand-mark__mark"
      :src="logoUrl"
      width="64"
      height="64"
      alt=""
      decoding="async"
    />
    <span v-if="variant === 'full'" class="brand-mark__text">
      <span class="brand-mark__name"><span class="brand-num">7</span>вершин</span>
      <span class="brand-mark__tag">Своя вершина — каждый день</span>
    </span>
    <span v-else class="brand-mark__name-only"><span class="brand-num">7</span>вершин</span>
  </span>
</template>
