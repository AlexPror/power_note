<script setup>
import { computed, inject, ref, shallowRef, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { videosForKyu } from '@/data/videos'
import { profileById } from '@/data/profiles'
import { SAFETY_NOTICE, GYM_NOTE } from '@/data/trainingPlan'

const athlete = inject('athlete')
const profile = computed(() => profileById(athlete.value.profileId || 'kyokushin'))
const list = computed(() => videosForKyu(athlete.value.kyu))
const slug = computed(() => athlete.value.slug)
const q = ref('')

/** Lazy: тяжёлый каталог «Пути» не блокирует старт кабинета */
const figuresApi = shallowRef(null)
const figuresCount = ref(0)

import('@/data/figures')
  .then((m) => {
    figuresApi.value = m
    figuresCount.value = m.listedFiguresCount()
  })
  .catch(() => {
    figuresCount.value = 0
  })

const groups = computed(() =>
  (profile.value.videoSections || [])
    .map((sec) => {
      if (sec.kind === 'figures') {
        return { ...sec, count: figuresCount.value || '…', items: [] }
      }
      const items = list.value.filter((v) => v.section === sec.id)
      return { ...sec, count: items.length, items }
    })
    .filter((g) => g.count > 0 || g.kind === 'figures'),
)

const query = computed(() => q.value.trim().toLowerCase())

const filteredGroups = computed(() => {
  if (!query.value) return groups.value
  return groups.value.filter((g) => {
    if (g.kind === 'figures') {
      const api = figuresApi.value
      return (
        g.label.toLowerCase().includes(query.value) ||
        (g.blurb || '').toLowerCase().includes(query.value) ||
        (api ? api.searchFigures(query.value).length > 0 : false)
      )
    }
    return (
      g.label.toLowerCase().includes(query.value) ||
      (g.blurb || '').toLowerCase().includes(query.value) ||
      g.items.some((v) => matchItem(v))
    )
  })
})

const quickHits = computed(() => {
  if (!query.value) return []
  const fromVideos = list.value.filter(matchItem).map((v) => ({
    kind: 'video',
    id: v.id,
    title: v.title,
    why: v.why,
    host: v.host,
    internal: v.internal,
    href: v.href,
  }))
  const api = figuresApi.value
  const fromFigures = api
    ? api.searchFigures(query.value).map((f) => ({
        kind: 'figure',
        id: f.id,
        title: f.name,
        why: f.role,
        host: 'путь',
        internal: `figures/${f.id}`,
      }))
    : []
  return [...fromFigures, ...fromVideos].slice(0, 10)
})

watch(q, () => {
  if (q.value.trim() && !figuresApi.value) {
    import('@/data/figures').then((m) => {
      figuresApi.value = m
      figuresCount.value = m.listedFiguresCount()
    })
  }
})

function matchItem(v) {
  const hay = `${v.title} ${v.why} ${v.look || ''}`.toLowerCase()
  return hay.includes(query.value)
}

function itemTo(hit) {
  if (hit.internal) return `/u/${slug.value}/base/${hit.internal}`
  return hit.href
}

function isInternal(hit) {
  return Boolean(hit.internal)
}

function groupTo(g) {
  if (g.kind === 'figures') return `/u/${slug.value}/base/figures`
  return `/u/${slug.value}/base/s/${g.id}`
}
</script>

<template>
  <div>
    <h1 class="page-title">Уроки</h1>
    <p class="page-sub">Техника, этикет и пути мастеров. Выберите раздел или найдите по слову.</p>

    <label class="search-wrap">
      <span class="sr-only">Поиск</span>
      <input
        v-model="q"
        type="search"
        class="search-input"
        placeholder="Поиск: гиря, Ерёменко, этикет…"
        autocomplete="off"
        enterkeyhint="search"
      />
    </label>

    <div v-if="quickHits.length" class="list hits">
      <component
        :is="isInternal(hit) ? RouterLink : 'a'"
        v-for="hit in quickHits"
        :key="hit.kind + hit.id"
        class="list-row video compact"
        v-bind="isInternal(hit)
          ? { to: itemTo(hit) }
          : { href: itemTo(hit), target: '_blank', rel: 'noopener noreferrer' }"
      >
        <div>
          <h2>{{ hit.title }}</h2>
          <p>{{ hit.why }}</p>
        </div>
        <span class="chev">{{ hit.host }} →</span>
      </component>
    </div>

    <div class="hub-grid">
      <RouterLink
        v-for="g in filteredGroups"
        :key="g.id"
        class="hub-card"
        :class="{ featured: g.kind === 'figures' }"
        :to="groupTo(g)"
      >
        <span class="hub-count">{{ g.count }}</span>
        <h2>{{ g.label }}</h2>
        <p>{{ g.blurb }}</p>
      </RouterLink>
    </div>

    <p v-if="!filteredGroups.length" class="note">Ничего не найдено. Попробуйте другое слово.</p>
    <p class="note safety-note">{{ SAFETY_NOTICE }}</p>
    <p class="note">{{ GYM_NOTE }}</p>
  </div>
</template>
