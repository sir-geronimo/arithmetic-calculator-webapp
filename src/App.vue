<script setup lang="ts">
import { useAuth } from '@/composables/auth'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app.store'

const appStore = useAppStore()
const { getToken, setToken } = useAuth()
const router = useRouter()

onBeforeMount(async () => {
  const token = getToken()

  if (token) {
    await router.push({ name: 'home' })
  } else {
    await router.push({ name: 'login' })
  }
})

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
        <v-btn :to="{ name: 'home' }">
          Calculator
        </v-btn>
      </v-app-bar-title>

      <template #append>
        <v-row align="center" style="margin-inline-end: 20px;">
          <v-col>
            <p>
              <b>Balance: </b>
              <span>{{ appStore.balance }}</span>
            </p>
          </v-col>

          <v-col>
            <v-btn :to="{ name: 'records' }">
              Records
            </v-btn>
          </v-col>

          <v-col>
            <v-btn
              color="teal"
              variant="tonal"
              append-icon="mdi-logout"
              @click="logout"
            >
              Sign Out
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-app-bar>

    <v-container>
      <v-main style="max-width: 720px;" class="mx-auto">
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<style scoped>
</style>
