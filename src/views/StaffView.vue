<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PinPad from '@/components/PinPad.vue'
import KyuBadge from '@/components/KyuBadge.vue'
import BrandMark from '@/components/BrandMark.vue'
import { ATHLETES } from '@/data/athletes'
import { STAFF } from '@/data/staff'
import { hashPin, readSession, writeSession, clearSession, isStaff } from '@/lib/auth'
import { ageYears, fullName } from '@/lib/age'
import { beltLabel } from '@/data/belts'
import { resolvePeriod } from '@/lib/period'
import { sessionCounts } from '@/lib/trends'
import { profileById } from '@/data/profiles'

import { PLAN_GROUPS } from '@/data/trainingPlan'

const router = useRouter()
const session = ref(readSession())
const error = ref('')
const pad = ref(null)
const staffed = computed(() => isStaff(session.value))

const roster = computed(() => ATHLETES.map((a) => {
  const period = resolvePeriod(a, { mode: 'weeks4' })
  const counts = sessionCounts(a.trainRows, period)
  const last = a.trainRows[a.trainRows.length - 1]
  const profile = profileById(a.profileId || 'kyokushin')
  const kg = a.weightRows?.at(-1)?.kg
  const plan = PLAN_GROUPS[a.planGroup]?.label || a.planGroup
  return { a, period, counts, last, age: ageYears(a.dob), profile, kg, plan }
}))

async function onPin(pin) {
  error.value = ''
  const adminHash = await hashPin('staff-admin', pin)
  const trainerHash = await hashPin('staff-trainer', pin)
  if (adminHash === STAFF.admin.pinHash) {
    writeSession({ role: 'admin' })
    session.value = readSession()
    pad.value?.reset()
    return
  }
  if (trainerHash === STAFF.trainer.pinHash) {
    writeSession({ role: 'trainer' })
    session.value = readSession()
    pad.value?.reset()
    return
  }
  error.value = 'Неверный код'
  pad.value?.reset()
}

function logout() {
  clearSession()
  session.value = null
  router.push('/')
}

const roleLabel = computed(() => (session.value?.role === 'admin' ? 'Админ' : 'Тренер'))
</script>

<template>
  <div class="shell">
    <header class="topnav">
      <RouterLink class="brand" to="/"><BrandMark /></RouterLink>
      <nav class="nav-links">
        <button v-if="staffed" type="button" class="text-btn" @click="logout">Выйти</button>
      </nav>
    </header>

    <template v-if="!staffed">
      <h1 class="page-title">Сотрудники</h1>
      <p class="page-sub">Админ и тренер видят всю группу. PIN разный.</p>
      <PinPad ref="pad" title="Код сотрудника" hint="админ или тренер" :error="error" @submit="onPin" />
    </template>

    <template v-else>
      <div class="home-lead">
        <p class="eyebrow">{{ roleLabel }} · группа</p>
        <h1 class="page-title">Ученики</h1>
        <p class="page-sub">Без рейтинга. Только свои цифры в кабинете.</p>
      </div>

      <div class="list dest-list">
        <RouterLink
          v-for="row in roster"
          :key="row.a.slug"
          class="list-row"
          :to="`/u/${row.a.slug}`"
        >
          <div>
            <h2>{{ fullName(row.a) }}</h2>
            <p>
              {{ row.age }} лет
              <template v-if="row.kg != null"> · {{ row.kg }} кг</template>
              · {{ row.plan }}
            </p>
          </div>
          <KyuBadge :kyu="row.a.kyu" />
        </RouterLink>
      </div>
    </template>
  </div>
</template>
