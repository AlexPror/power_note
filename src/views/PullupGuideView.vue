<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { PULLUP_GUIDE as G } from '@/data/pullupGuide'

const route = useRoute()
const base = `/u/${route.params.slug}/base`
</script>

<template>
  <div class="guide">
    <RouterLink class="back" :to="base">← Уроки</RouterLink>
    <h1 class="page-title">{{ G.title }}</h1>
    <p class="page-sub">{{ G.lead }}</p>

    <section class="panel guide-block">
      <p v-for="(p, i) in G.intro" :key="i" class="guide-p">{{ p }}</p>
    </section>

    <section
      v-for="step in G.steps"
      :id="step.id"
      :key="step.id"
      class="panel guide-block step"
    >
      <p class="eyebrow">Шаг {{ step.n }}</p>
      <h2>{{ step.title }}</h2>
      <p v-for="(p, i) in step.body" :key="i" class="guide-p">{{ p }}</p>
      <p v-if="step.cue" class="cue">{{ step.cue }}</p>
      <div v-if="step.media.length" class="media-row" :class="{ duo: step.media.length > 1 }">
        <figure v-for="(m, i) in step.media" :key="i">
          <img :src="m.src" :alt="m.alt" loading="lazy" />
          <figcaption>{{ m.alt }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="panel guide-block">
      <h2>{{ G.workout.title }}</h2>
      <ul class="plain-list">
        <li v-for="(item, i) in G.workout.items" :key="i">{{ item }}</li>
      </ul>
      <p class="guide-p">{{ G.workout.next }}</p>
    </section>

    <p class="guide-p">{{ G.outro }}</p>
    <p class="note">{{ G.mediaNote }}</p>
  </div>
</template>
