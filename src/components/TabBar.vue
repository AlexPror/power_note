<script setup>
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  slug: { type: String, required: true },
})

const route = useRoute()

const tabs = [
  { to: '', name: 'Сейчас', icon: 'now' },
  { to: 'diary', name: 'Дневник', icon: 'diary' },
  { to: 'food', name: 'Еда', icon: 'food' },
  { to: 'base', name: 'Уроки', icon: 'base' },
]

function active(tab) {
  const path = route.path.replace(/\/$/, '')
  const base = `/u/${props.slug}`
  if (!tab.to) return path === base
  if (tab.to === 'base') return path === `${base}/base` || path.startsWith(`${base}/base/`)
  return path.endsWith(`/${tab.to}`)
}

function href(tab) {
  return tab.to ? `/u/${props.slug}/${tab.to}` : `/u/${props.slug}`
}
</script>

<template>
  <nav class="tabbar" aria-label="Кабинет">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="href(tab)"
      class="tab"
      :class="{ on: active(tab) }"
    >
      <span class="tab-ico" :data-icon="tab.icon" aria-hidden="true" />
      <span>{{ tab.name }}</span>
    </RouterLink>
  </nav>
</template>
