<script setup>
import { computed, inject, ref } from 'vue'
import RingProgress from '@/components/RingProgress.vue'
import { foodsByIds, macros, SOURCE_LABELS } from '@/data/foods'
import { NUTRITION_DISCLAIMER, NUTRITION_LINKS } from '@/data/norms'
import { normFor, dayMacros } from '@/lib/nutrition'
import { formatDay } from '@/lib/period'

const athlete = inject('athlete')
const tracking = computed(() => athlete.value.foodIds.length > 0)
const norm = computed(() => normFor(athlete.value))
const catalog = computed(() => foodsByIds(athlete.value.foodIds))
const selected = ref('')
const grams = ref(100)
const meal = ref([])
const search = ref('')

const food = computed(() => catalog.value.find((f) => f.id === selected.value))

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return catalog.value
  return catalog.value.filter((f) => f.name.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q))
})

const sums = computed(() => {
  let kcal = 0, p = 0, f = 0, c = 0
  for (const row of meal.value) {
    const fd = catalog.value.find((x) => x.id === row.id)
    if (!fd) continue
    const m = macros(fd, row.grams)
    kcal += m.kcal; p += m.p; f += m.f; c += m.c
  }
  return {
    kcal: Math.round(kcal),
    p: Math.round(p * 10) / 10,
    f: Math.round(f * 10) / 10,
    c: Math.round(c * 10) / 10,
  }
})

const days = computed(() => athlete.value.foodDays.map((d) => ({
  date: d.date,
  ...dayMacros(d, athlete.value.foodIds),
})))

function onSelect() {
  if (food.value?.unitGrams) grams.value = food.value.id === 'egg' ? 2 : 1
  else grams.value = 100
}

function add() {
  if (!selected.value || !grams.value) return
  meal.value.push({ id: selected.value, grams: Number(grams.value), uid: Date.now() + Math.random() })
}

function remove(uid) {
  meal.value = meal.value.filter((m) => m.uid !== uid)
}

if (catalog.value[0]) selected.value = catalog.value[0].id
</script>

<template>
  <div>
    <h1 class="page-title">Еда</h1>
    <p class="page-sub">Территория семьи. Блок есть у всех — заполняется, когда захотите.</p>

    <template v-if="!tracking">
      <div class="panel">
        <h2>Рацион пока не ведём</h2>
        <p class="note" style="margin-top:0">
          Когда будете готовы — подтянем в кабинет только те продукты, которые ест семья.
          Общий справочник не показывается целиком.
        </p>
      </div>
    </template>

    <template v-else>
      <div class="status-strip">
        <div class="status-item">
          <div class="lbl">Ориентир ккал</div>
          <div class="val" style="font-size:1.35rem">{{ norm.kcal }}</div>
          <div class="hint">МР 2.3.1.0253-21</div>
        </div>
        <div class="status-item">
          <div class="lbl">Белок</div>
          <div class="val" style="font-size:1.35rem">{{ norm.protein }}</div>
          <div class="hint">г / сутки</div>
        </div>
        <div class="status-item">
          <div class="lbl">Жиры</div>
          <div class="val" style="font-size:1.35rem">{{ norm.fat }}</div>
          <div class="hint">г</div>
        </div>
        <div class="status-item">
          <div class="lbl">Углеводы</div>
          <div class="val" style="font-size:1.35rem">{{ norm.carbs }}</div>
          <div class="hint">г</div>
        </div>
      </div>

      <div class="panel">
        <RingProgress :value="Math.min(sums.p, norm.protein)" :max="norm.protein" label="Белок калькулятора" sub="к ориентиру дня" />
        <div class="totals" style="margin-top:1rem">
          <div class="tot"><div class="lbl">ккал</div><div class="val">{{ sums.kcal }}</div></div>
          <div class="tot"><div class="lbl">Б</div><div class="val">{{ sums.p }}</div></div>
          <div class="tot"><div class="lbl">Ж</div><div class="val">{{ sums.f }}</div></div>
          <div class="tot"><div class="lbl">У</div><div class="val">{{ sums.c }}</div></div>
        </div>
      </div>

      <div class="controls group-gap">
        <label>
          Поиск
          <input v-model="search" type="search" placeholder="продукт" />
        </label>
        <label>
          Продукт
          <select v-model="selected" @change="onSelect">
                      <option v-for="f in filtered" :key="f.id" :value="f.id">
              {{ f.name }} · {{ SOURCE_LABELS[f.source] || f.source }}
            </option>
          </select>
        </label>
        <label>
          {{ food?.unitLabel || 'граммы' }}
          <input v-model.number="grams" type="number" min="1" />
        </label>
        <button class="btn" type="button" @click="add">Добавить</button>
      </div>

      <div v-if="meal.length" class="list">
        <div v-for="row in meal" :key="row.uid" class="list-row">
          <div class="body" style="grid-column:1/-1">
            {{ catalog.find(f => f.id === row.id)?.name }} · {{ row.grams }}
            <button class="text-btn" type="button" @click="remove(row.uid)">убрать</button>
          </div>
        </div>
      </div>

      <div class="section-label group-gap">
        <h2>Дни из дневника</h2>
        <span class="hint">что уже разобрали</span>
      </div>
      <div class="list">
        <div v-for="d in days" :key="d.date" class="list-row session">
          <div class="date">{{ formatDay(d.date) }}</div>
          <div class="type">{{ d.kcal }} ккал</div>
          <div class="body">Б {{ d.p }} · Ж {{ d.f }} · У {{ d.c }}</div>
          <div class="mark">день</div>
        </div>
      </div>
    </template>

    <details class="disclose group-gap" :open="!tracking">
      <summary>
        Откуда цифры
        <span class="meta-line">рекомендательно</span>
      </summary>
      <div class="disclose-body">
        <p class="note" style="margin-top:0">{{ NUTRITION_DISCLAIMER }}</p>
        <p class="note">
          Ориентир дня — МР 2.3.1.0253-21. Состав продуктов — таблицы Скурихина (книга в локальной папке books/, в приложение не выкладывается). Рекомендательно. Не является назначением и ни к чему не призывает.
        </p>
        <ul class="src-list">
          <li v-for="l in NUTRITION_LINKS" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.title }}</a>
          </li>
        </ul>
      </div>
    </details>
  </div>
</template>
