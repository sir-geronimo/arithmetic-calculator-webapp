<script lang="ts" setup>
import { useAuth } from '@/composables/auth'
import { Login } from '@/services/Auth'
import { useMutation } from '@tanstack/vue-query'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import { GetBalance } from '@/services/Balance'

const appStore = useAppStore()
const { setToken } = useAuth()
const router = useRouter()

const visible = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const { mutate, error } = useMutation({
  mutationFn: Login,
  async onSuccess({ access_token }) {
    setToken(access_token)
    appStore.balance = await GetBalance()

    await router.push({ name: 'home' })
  }
})

async function handleSubmit(): Promise<void> {
  mutate(JSON.stringify(form))
}
</script>

<template>
  <v-card class="mx-auto pa-12 pb-8" elevation="4" max-width="448" rounded="lg">
    <form @submit.prevent="handleSubmit">
      <v-row>
        <v-col>
          <v-card-title class="text-center">Please login</v-card-title>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="form.username"
            autocomplete="username"
            autofocus
            placeholder="sir-geronimo"
            prepend-inner-icon="mdi-account"
            label="Username"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="form.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            autocomplete="current-password"
            prepend-inner-icon="mdi-key"
            label="Password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          />
        </v-col>
      </v-row>

      <v-row v-if="error">
        <v-col>
          <v-alert color="error" type="warning" variant="tonal">
            <p class="text-capitalize">{{ error?.message }}</p>
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn block class="my-8" color="blue" size="large" type="submit" variant="tonal">
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-card>
</template>
