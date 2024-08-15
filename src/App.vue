<script lang="ts" setup>
import { useAuth } from '@/composables/auth'
import { useAppStore } from '@/stores/app.store'
import { GetBalance } from '@/services/Balance'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()
const { setToken } = useAuth()

onMounted(async () => {
  await fetchBalance()
})

async function fetchBalance(): Promise<void> {
  try {
    appStore.balance = await GetBalance()
  } catch (error) {
    await logout()
  }
}

async function logout(): Promise<void> {
  setToken('')

  appStore.$reset()
  await router.push({ name: 'login' })
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="appStore.loggedIn">
      <v-app-bar-title>
        <v-btn :to="{ name: 'home' }"> Calculator</v-btn>
      </v-app-bar-title>

      <template #append>
        <v-row align="center" style="margin-inline-end: 20px">
          <v-col>
            <p>
              <b>Balance: </b>
              <span>{{ appStore.balance }}</span>
            </p>
          </v-col>

          <v-col>
            <v-btn :to="{ name: 'records' }"> Records</v-btn>
          </v-col>

          <v-col>
            <v-btn append-icon="mdi-logout" color="teal" variant="tonal" @click="logout">
              Sign Out
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-app-bar>

    <v-container>
      <v-main class="mx-auto" style="max-width: 720px">
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<style scoped></style>
