<script setup>
import { RouterLink } from 'vue-router'
import { ATHLETES } from '@/data/athletes'
import { ageYears, fullName } from '@/lib/age'
import { beltLabel } from '@/data/belts'
import KyuBadge from '@/components/KyuBadge.vue'
import BrandMark from '@/components/BrandMark.vue'
</script>

<template>
  <div class="shell">
    <header class="topnav">
      <span class="brand"><BrandMark /></span>
      <nav class="nav-links" aria-label="Вход">
        <RouterLink to="/staff">Сотрудникам</RouterLink>
      </nav>
    </header>

    <div class="home-lead">
      <BrandMark variant="full" />
      <p class="eyebrow">Киокушинкай · ИКО Мацуи</p>
      <h1 class="page-title">Кабинеты группы</h1>
      <p class="page-sub">
        Дневник тренировок, еда по желанию семьи, база ката и ОФП.
        Сравниваем ученика только с ним самим.
      </p>
    </div>

    <div class="section-label">
      <h2>Ученики группы</h2>
      <span class="hint">{{ ATHLETES.length }} кабинетов</span>
    </div>

    <div class="list dest-list">
      <RouterLink
        v-for="a in ATHLETES"
        :key="a.slug"
        class="list-row"
        :class="{ 'demo-row': a.isDemo }"
        :to="`/u/${a.slug}`"
      >
        <div>
          <h2>
            {{ fullName(a) }}
            <span v-if="a.isDemo" class="demo-pill">пример</span>
          </h2>
          <p>
            <template v-if="a.isDemo">9 лет · пример кабинета · PIN 1111 · </template>
            {{ ageYears(a.dob) }} лет · {{ beltLabel(a.kyu) }}
          </p>
        </div>
        <KyuBadge :kyu="a.kyu" />
      </RouterLink>
    </div>

    <p class="note">
      Сначала откройте <strong>Васю Пупкина</strong> — там видно расписание, план, отчёт, графики и еду.
      Остальные кабинеты группы — для семей (один PIN на кабинет).
    </p>

    <footer class="site">7 вершин · Своя вершина — каждый день · 7vershin.vorobjev.pro</footer>
  </div>
</template>
