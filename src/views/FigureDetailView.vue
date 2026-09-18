<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { figureById, isFigureListed } from '@/data/figures'

const route = useRoute()
const slug = computed(() => route.params.slug)
const figure = computed(() => figureById(route.params.figureId))
const listed = computed(() => isFigureListed(figure.value))
const listPath = computed(() => `/u/${slug.value}/base/figures`)

const record = computed(() => figure.value?.record || null)
const hyakunin = computed(() => figure.value?.hyakunin || null)
const training = computed(() => figure.value?.training || null)
const daySchedule = computed(() => training.value?.daySchedule || [])
</script>

<template>
  <div v-if="!figure || !listed">
    <RouterLink class="back" :to="listPath">← Пути</RouterLink>
    <p class="page-sub">Карточка не в текущем каталоге киокушинкай.</p>
  </div>

  <div v-else class="figure-page">
    <RouterLink class="back" :to="listPath">← Пути</RouterLink>

    <div v-if="figure.photo" class="figure-hero">
      <img :src="figure.photo" :alt="figure.photoAlt || figure.name" />
      <p v-if="figure.photoCredit" class="photo-credit">{{ figure.photoCredit }}</p>
    </div>

    <h1 class="page-title">{{ figure.name }}</h1>
    <p class="page-sub">
      <span v-if="figure.years">{{ figure.years }} · </span>{{ figure.role }}
    </p>

    <section v-if="hyakunin" class="panel guide-block record-block hyakunin-block">
      <h2>{{ hyakunin.title || 'Hyakunin kumite (100 боёв)' }}</h2>
      <div v-if="hyakunin.formula" class="record-formula">{{ hyakunin.formula }}</div>
      <p v-if="hyakunin.date || hyakunin.time" class="hint-line" style="margin-bottom: 0.65rem">
        <span v-if="hyakunin.date">{{ hyakunin.date }}</span>
        <span v-if="hyakunin.date && hyakunin.time"> · </span>
        <span v-if="hyakunin.time">{{ hyakunin.time }}</span>
      </p>
      <div class="record-grid">
        <div v-if="hyakunin.wins != null" class="record-tile win">
          <div class="record-n">{{ hyakunin.wins }}</div>
          <div class="record-l">Победы</div>
        </div>
        <div v-if="hyakunin.losses != null" class="record-tile loss">
          <div class="record-n">{{ hyakunin.losses }}</div>
          <div class="record-l">Поражения</div>
        </div>
        <div v-if="hyakunin.draws != null" class="record-tile draw">
          <div class="record-n">{{ hyakunin.draws }}</div>
          <div class="record-l">Ничьи</div>
        </div>
        <div v-if="hyakunin.other != null" class="record-tile other">
          <div class="record-n">{{ hyakunin.other }}</div>
          <div class="record-l">{{ hyakunin.otherLabel || 'Прочее' }}</div>
        </div>
      </div>
      <p v-if="hyakunin.note" class="note" style="margin-top: 0.65rem">{{ hyakunin.note }}</p>
    </section>

    <section v-if="record" class="panel guide-block record-block">
      <h2>{{ record.title || 'Счёт и места' }}</h2>
      <div v-if="record.formula" class="record-formula">{{ record.formula }}</div>
      <div class="record-grid">
        <div v-if="record.wins != null" class="record-tile win">
          <div class="record-n">{{ record.wins }}</div>
          <div class="record-l">Победы</div>
        </div>
        <div v-if="record.losses != null" class="record-tile loss">
          <div class="record-n">{{ record.losses }}</div>
          <div class="record-l">Поражения</div>
        </div>
        <div v-if="record.draws != null" class="record-tile draw">
          <div class="record-n">{{ record.draws }}</div>
          <div class="record-l">Ничьи</div>
        </div>
        <div v-if="record.other != null" class="record-tile other">
          <div class="record-n">{{ record.other }}</div>
          <div class="record-l">{{ record.otherLabel || 'Прочее' }}</div>
        </div>
      </div>
      <ul v-if="record.places?.length" class="place-list">
        <li v-for="(p, i) in record.places" :key="i">
          <span class="place-badge">{{ p.place }}</span>
          <span class="place-event">{{ p.event }}</span>
        </li>
      </ul>
      <p v-if="record.note" class="note" style="margin-top: 0.65rem">{{ record.note }}</p>
    </section>

    <div v-if="figure.stats?.length" class="stat-grid" aria-label="Ключевые цифры">
      <div v-for="(s, i) in figure.stats" :key="i" class="stat-tile">
        <div class="stat-value">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <section v-if="training" class="panel guide-block training-block">
      <h2>{{ training.title || 'Тренировки и дисциплина' }}</h2>
      <p v-if="training.weekly" class="guide-p">{{ training.weekly }}</p>
      <p v-if="training.sessions?.length" class="guide-lead">Режим</p>
      <ul v-if="training.sessions?.length" class="plain-list">
        <li v-for="(s, i) in training.sessions" :key="i">{{ s }}</li>
      </ul>
      <template v-if="daySchedule.length">
        <p class="guide-lead">Распорядок дня</p>
        <ul class="schedule-list">
          <li v-for="(row, i) in daySchedule" :key="i">
            <span class="schedule-time">{{ row.time }}</span>
            <span class="schedule-text">{{ row.text }}</span>
          </li>
        </ul>
      </template>
      <p v-if="training.focus?.length" class="guide-lead">Акцент</p>
      <div v-if="training.focus?.length" class="mark-row">
        <span v-for="(f, i) in training.focus" :key="i" class="mark-chip">{{ f }}</span>
      </div>
    </section>

    <section v-if="figure.videos?.length" class="panel guide-block">
      <h2>Видео</h2>
      <ul class="plain-list">
        <li v-for="(v, i) in figure.videos" :key="i">
          <a :href="v.href" target="_blank" rel="noopener noreferrer">{{ v.title }}</a>
        </li>
      </ul>
    </section>

    <section v-if="figure.timeline?.length" class="panel guide-block">
      <h2>Лента пути</h2>
      <ol class="timeline">
        <li v-for="(t, i) in figure.timeline" :key="i">
          <span class="tl-year">{{ t.year }}</span>
          <span class="tl-text">{{ t.text }}</span>
        </li>
      </ol>
    </section>

    <section v-if="figure.achievements?.length" class="panel guide-block">
      <h2>Достижения</h2>
      <ul class="achieve-list">
        <li v-for="(a, i) in figure.achievements" :key="i">{{ a }}</li>
      </ul>
    </section>

    <section v-if="figure.unusual?.length" class="panel guide-block">
      <h2>Рекорды и необычные факты</h2>
      <ul class="unusual-list">
        <li v-for="(u, i) in figure.unusual" :key="i">{{ u }}</li>
      </ul>
    </section>

    <section v-if="figure.facts?.length" class="panel guide-block">
      <h2>Факты из подготовки и жизни</h2>
      <ul class="fact-list">
        <li v-for="(f, i) in figure.facts" :key="i">{{ f }}</li>
      </ul>
    </section>

    <section v-if="figure.path?.length" class="panel guide-block">
      <h2>Кратко о пути</h2>
      <p v-for="(p, i) in figure.path" :key="i" class="guide-p">{{ p }}</p>
    </section>

    <section v-if="figure.marks?.length" class="panel guide-block">
      <h2>На что обратить внимание</h2>
      <div class="mark-row">
        <span v-for="(m, i) in figure.marks" :key="i" class="mark-chip">{{ m }}</span>
      </div>
    </section>

    <p v-if="figure.note" class="note">{{ figure.note }}</p>

    <section v-if="figure.links?.length" class="panel guide-block">
      <h2>Материалы</h2>
      <ul class="plain-list">
        <li v-for="(l, i) in figure.links" :key="i">
          <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.label }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>
