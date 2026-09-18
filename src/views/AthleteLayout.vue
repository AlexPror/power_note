<script setup>
import { computed, provide, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import PinPad from '@/components/PinPad.vue'
import TabBar from '@/components/TabBar.vue'
import { athleteBySlug } from '@/data/athletes'
import { hashPin, readSession, writeSession, clearSession, canViewAthlete, isStaff } from '@/lib/auth'
import { fullName } from '@/lib/age'

const route = useRoute()
const router = useRouter()
const session = ref(readSession())
const error = ref('')
const pad = ref(null)

const athlete = computed(() => athleteBySlug(route.params.slug))
const allowed = computed(() => athlete.value && canViewAthlete(session.value, athlete.value.slug))
const staff = computed(() => isStaff(session.value))

provide('athlete', athlete)
provide('session', session)

async function onPin(pin) {
  error.value = ''
  if (!athlete.value) return
  const hashed = await hashPin(athlete.value.slug, pin)
  if (hashed !== athlete.value.pinHash) {
    error.value = 'Неверный код'
    pad.value?.reset()
    return
  }
  writeSession({ role: 'family', slug: athlete.value.slug })
  session.value = readSession()
  pad.value?.reset()
}

function logout() {
  const toStaff = isStaff(session.value)
  clearSession()
  session.value = null
  router.push(toStaff ? '/staff' : '/')
}
</script>

<template>
  <div v-if="!athlete" class="shell">
    <p class="page-sub">Кабинет не найден.</p>
    <RouterLink to="/">На главную</RouterLink>
  </div>

  <div v-else-if="!allowed" class="shell">
    <header class="topnav">
      <RouterLink class="brand" to="/">7 вершин</RouterLink>
    </header>
    <h1 class="page-title">{{ fullName(athlete) }}</h1>
    <p class="page-sub">Один PIN на семью: мама, папа, бабушка, ученик.</p>
    <PinPad
      ref="pad"
      title="Код кабинета"
      hint="4 цифры"
      :error="error"
      @submit="onPin"
    />
  </div>

  <div v-else class="shell family">
    <header class="topnav">
      <RouterLink class="brand" to="/">7 вершин</RouterLink>
      <nav class="nav-links">
        <RouterLink v-if="staff" to="/staff">Группа</RouterLink>
        <button type="button" class="text-btn" @click="logout">Выйти</button>
      </nav>
    </header>
    <RouterView />
    <TabBar :slug="athlete.slug" />
  </div>
</template>
