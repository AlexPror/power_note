<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  FIGURES_INTRO,
  FIGURE_CATEGORIES,
  figuresByCategory,
  figuresGroupedBySport,
  searchFigures,
} from '@/data/figures'

const route = useRoute()
const slug = computed(() => route.params.slug)
const hub = computed(() => `/u/${slug.value}/base`)
const cat = ref('all')
const q = ref('')

const query = computed(() => q.value.trim().toLowerCase())

const filteredFlat = computed(() => {
  const byCat = figuresByCategory(cat.value)
  if (!query.value) return byCat
  const ids = new Set(searchFigures(query.value).map((f) => f.id))
  return byCat.filter((f) => ids.has(f.id))
})

const groups = computed(() => {
  if (cat.value !== 'all' || query.value) return null
  return figuresGroupedBySport()
})

function toFigure(f) {
  return `/u/${slug.value}/base/figures/${f.id}`
}
</script>

<template>
  <div>
    <RouterLink class="back" :to="hub">← Уроки</RouterLink>
    <h1 class="page-title">{{ FIGURES_INTRO.title }}</h1>
    <p class="page-sub">{{ FIGURES_INTRO.lead }}</p>

    <label class="search-wrap">
      <span class="sr-only">Поиск по именам</span>
      <input
        v-model="q"
        type="search"
        class="search-input"
        placeholder="Имя: Ояма, Мацуи, Ерёменко…"
        autocomplete="off"
        enterkeyhint="search"
      />
    </label>

    <div class="chip-row" role="tablist" aria-label="Разделы">
      <button
        v-for="c in FIGURE_CATEGORIES"
        :key="c.id"
        type="button"
        class="chip"
        :class="{ on: cat === c.id }"
        @click="cat = c.id"
      >
        {{ c.label }}
      </button>
    </div>

    <template v-if="groups">
      <section v-for="g in groups" :key="g.id" class="sport-block">
        <div class="section-label">
          <h2>{{ g.label }}</h2>
          <span class="hint">{{ g.items.length }}</span>
        </div>
        <div class="list">
          <RouterLink
            v-for="f in g.items"
            :key="f.id"
            class="list-row video compact figure-row"
            :to="toFigure(f)"
          >
            <img
              v-if="f.photo"
              class="figure-thumb"
              :src="f.photo"
              :alt="f.photoAlt || f.name"
              loading="lazy"
            />
            <div>
              <h2>{{ f.name }}<span v-if="f.years" class="years"> · {{ f.years }}</span></h2>
              <p>{{ f.role }}</p>
            </div>
            <span class="chev">→</span>
          </RouterLink>
        </div>
      </section>
    </template>

    <div v-else class="list">
      <RouterLink
        v-for="f in filteredFlat"
        :key="f.id"
        class="list-row video compact figure-row"
        :to="toFigure(f)"
      >
        <img
          v-if="f.photo"
          class="figure-thumb"
          :src="f.photo"
          :alt="f.photoAlt || f.name"
          loading="lazy"
        />
        <div>
          <h2>{{ f.name }}<span v-if="f.years" class="years"> · {{ f.years }}</span></h2>
          <p>{{ f.role }}</p>
        </div>
        <span class="chev">→</span>
      </RouterLink>
    </div>

    <p v-if="groups ? !groups.length : !filteredFlat.length" class="note">Ничего не найдено.</p>
    <p class="note">
      Постепенно добавляем чемпионов и подростков с режимом дня. Другие виды спорта в каталоге скрыты.
    </p>
  </div>
</template>
