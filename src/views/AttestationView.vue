<script setup>
import { computed, inject } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import KyuBadge from '@/components/KyuBadge.vue'
import { beltByKyu, beltLabel } from '@/data/belts'
import {
  ATTESTATION,
  ATTESTATION_LEAD,
  ATTESTATION_NOTE,
  ATTESTATION_TITLE,
  nextAttestation,
  prepLabel,
} from '@/data/attestation'

const athlete = inject('athlete')
const route = useRoute()
const base = computed(() => `/u/${route.params.slug}/base`)

const currentKyu = computed(() => athlete.value.kyu)
const next = computed(() => nextAttestation(currentKyu.value))
const nextBelt = computed(() => (next.value ? beltByKyu(next.value.kyu) : null))

const rows = computed(() =>
  ATTESTATION.map((r) => ({
    ...r,
    belt: beltByKyu(r.kyu),
    isCurrent: r.kyu === currentKyu.value,
    isNext: next.value && r.kyu === next.value.kyu,
  })),
)

function colorGroup(kyu) {
  return beltByKyu(kyu).color
}
</script>

<template>
  <div class="guide attest">
    <RouterLink class="back" :to="base">← Уроки</RouterLink>
    <h1 class="page-title">{{ ATTESTATION_TITLE }}</h1>
    <p class="page-sub">{{ ATTESTATION_LEAD }}</p>

    <section v-if="next" class="panel guide-block attest-focus">
      <p class="eyebrow">Сейчас готовимся к</p>
      <div class="attest-focus-head">
        <KyuBadge :kyu="next.kyu" />
        <div>
          <h2>{{ beltLabel(next.kyu) }}</h2>
          <p class="hint-line">Срок: {{ prepLabel(next) }}</p>
        </div>
      </div>
      <p class="guide-lead">Ката</p>
      <ul class="plain-list">
        <li v-for="(k, i) in next.kata" :key="i">{{ k }}</li>
      </ul>
      <div class="attest-nums">
        <div><span class="lbl">Отжим.</span><strong>{{ next.push }}</strong></div>
        <div><span class="lbl">Присед</span><strong>{{ next.squat }}</strong></div>
        <div><span class="lbl">Пресс</span><strong>{{ next.crunch }}</strong></div>
        <div><span class="lbl">Кумитэ</span><strong>{{ next.kumite }}</strong><small>×1 мин</small></div>
        <div><span class="lbl">Стойка</span><strong>{{ next.handstand }}</strong><small>сек</small></div>
      </div>
      <p class="note">Ваш пояс сейчас: {{ beltLabel(currentKyu) }}</p>
    </section>

    <section v-else class="panel guide-block">
      <p class="note" style="margin:0">Для чёрного пояса таблица цветных поясов не применяется — ориентиры даёт тренер.</p>
    </section>

    <section class="panel guide-block group-gap">
      <h2>Таблица нормативов · цветные пояса</h2>
      <p class="note">{{ ATTESTATION_NOTE }}</p>
      <div class="attest-table-wrap">
        <table class="attest-table">
          <thead>
            <tr>
              <th>Кю</th>
              <th>Срок</th>
              <th>Ката</th>
              <th>О</th>
              <th>Пр</th>
              <th>Пс</th>
              <th>К</th>
              <th>Ст</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in rows"
              :key="r.kyu"
              :class="{ on: r.isNext, soft: r.isCurrent }"
              :style="{ borderLeftColor: r.belt.hex }"
            >
              <td>
                <span class="attest-kyu">{{ r.kyu }}</span>
                <span class="hint-line">{{ colorGroup(r.kyu) }}</span>
              </td>
              <td>{{ r.months }} мес.</td>
              <td class="attest-kata">{{ r.kata.join(', ') }}</td>
              <td>{{ r.push }}</td>
              <td>{{ r.squat }}</td>
              <td>{{ r.crunch }}</td>
              <td>{{ r.kumite }}</td>
              <td>{{ r.handstand }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="hint-line">О — отжимания · Пр — присед · Пс — пресс · К — кумитэ (1 мин) · Ст — стойка на руках, сек</p>
    </section>
  </div>
</template>
