<script setup>
import { computed, inject, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { videosForKyu } from '@/data/videos'
import { profileById } from '@/data/profiles'
import { SAFETY_NOTICE } from '@/data/trainingPlan'

const route = useRoute()
const router = useRouter()
const athlete = inject('athlete')
const profile = computed(() => profileById(athlete.value.profileId || 'kyokushin'))
const slug = computed(() => athlete.value.slug)
const sectionId = computed(() => route.params.section)

watch(
  sectionId,
  (id) => {
    if (id === 'figures') {
      router.replace(`/u/${slug.value}/base/figures`)
    }
  },
  { immediate: true },
)

const meta = computed(() =>
  (profile.value.videoSections || []).find((s) => s.id === sectionId.value),
)

const items = computed(() =>
  videosForKyu(athlete.value.kyu).filter((v) => v.section === sectionId.value),
)

const hub = computed(() => `/u/${slug.value}/base`)

function itemTo(v) {
  if (v.internal) return `/u/${slug.value}/base/${v.internal}`
  return v.href
}

function isInternal(v) {
  return Boolean(v.internal)
}
</script>

<template>
  <div>
    <RouterLink class="back" :to="hub">← Уроки</RouterLink>
    <h1 class="page-title">{{ meta?.label || 'Раздел' }}</h1>
    <p v-if="meta?.blurb" class="page-sub">{{ meta.blurb }}</p>

    <div v-if="items.length" class="list">
      <component
        :is="isInternal(v) ? RouterLink : 'a'"
        v-for="v in items"
        :key="v.id"
        class="list-row video"
        v-bind="isInternal(v)
          ? { to: itemTo(v) }
          : { href: itemTo(v), target: '_blank', rel: 'noopener noreferrer' }"
      >
        <div>
          <h2>{{ v.title }}</h2>
          <p>{{ v.why }}</p>
          <p class="hint-line">Смотреть: {{ v.look }}</p>
          <p class="hint-line miss">Ошибка: {{ v.miss }}</p>
        </div>
        <span class="chev">{{ v.host }} →</span>
      </component>
    </div>

    <p v-else class="note">В этом разделе пока нет материалов для вашего уровня.</p>
    <p class="note safety-note">{{ SAFETY_NOTICE }}</p>
  </div>
</template>
