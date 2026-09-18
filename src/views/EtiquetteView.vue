<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ETIQUETTE as E } from '@/data/etiquette'

const route = useRoute()
const base = `/u/${route.params.slug}/base`
</script>

<template>
  <div class="guide">
    <RouterLink class="back" :to="base">← Уроки</RouterLink>
    <h1 class="page-title">{{ E.title }}</h1>
    <p class="page-sub">{{ E.lead }}</p>

    <section class="panel guide-block">
      <h2>{{ E.why.title }}</h2>
      <p v-for="(p, i) in E.why.paragraphs" :key="i" class="guide-p">{{ p }}</p>
    </section>

    <section class="panel guide-block">
      <h2>{{ E.dojoKun.title }}</h2>
      <p class="guide-lead">{{ E.dojoKun.subtitle }}</p>
      <p class="guide-p">{{ E.dojoKun.note }}</p>
      <ol class="kun-list">
        <li v-for="(item, i) in E.dojoKun.items" :key="i">
          <p class="kun-text">{{ item.text }}</p>
          <p class="kun-sense">{{ item.sense }}</p>
        </li>
      </ol>
      <p class="note">{{ E.dojoKun.sourceNote }}</p>
    </section>

    <section class="panel guide-block">
      <h2>{{ E.bows.title }}</h2>
      <p class="guide-p">{{ E.bows.intro }}</p>
      <p class="guide-lead">Когда</p>
      <ul class="plain-list">
        <li v-for="(w, i) in E.bows.when" :key="i">{{ w }}</li>
      </ul>
      <div v-for="(k, i) in E.bows.kinds" :key="i" class="term-card">
        <h3><span class="jp">{{ k.jp }}</span> — {{ k.ru }}</h3>
        <p>{{ k.about }}</p>
      </div>
      <p class="guide-lead">Как</p>
      <ul class="plain-list">
        <li v-for="(h, i) in E.bows.how" :key="i">{{ h }}</li>
      </ul>
    </section>

    <section class="panel guide-block">
      <h2>{{ E.osu.title }}</h2>
      <p v-for="(p, i) in E.osu.paragraphs" :key="i" class="guide-p">{{ p }}</p>
    </section>

    <section class="panel guide-block">
      <h2>{{ E.hall.title }}</h2>
      <ul class="plain-list">
        <li v-for="(item, i) in E.hall.items" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section class="panel guide-block">
      <h2>{{ E.encyclopedia.title }}</h2>
      <p class="guide-p">{{ E.encyclopedia.text }}</p>
      <a class="guide-link" :href="E.encyclopedia.href" target="_blank" rel="noopener noreferrer">
        Смотреть на Rutube →
      </a>
    </section>

    <p class="note">
      Справка:
      <template v-for="(r, i) in E.refs" :key="r.href">
        <a :href="r.href" target="_blank" rel="noopener noreferrer">{{ r.label }}</a>
        <span v-if="i < E.refs.length - 1"> · </span>
      </template>
    </p>
  </div>
</template>
