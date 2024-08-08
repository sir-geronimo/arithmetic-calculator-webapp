<script setup lang="ts">
import { useAuth } from '@/composables/auth';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const { setToken } = useAuth()
const router = useRouter()

const visible = ref(false)
const form = reactive({
  username: '',
  password: '',
})

async function handleSubmit(): Promise<void> {
  const res = await fetch(new URL('v1/login', import.meta.env.VITE_API_BASE_URL), {
    method: 'POST',
    body: JSON.stringify(form)
  })
  if (!res.ok) {
    throw new Error(`failed with: ${res.status}`)
  }

  const { access_token } = await res.json()
  setToken(access_token)

  await router.push({ name: 'home' })
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
            autofocus
            autocomplete="username"
            prepend-inner-icon="mdi-account" 
            placeholder="pepe_agallas" 
            variant="outlined"
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <v-text-field
            v-model="form.password"
            autocomplete="current-password"
            prepend-inner-icon="mdi-key"
            variant="outlined" 
            :type="visible ? 'text' : 'password'"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
          />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <v-btn
            type="submit"
            class="my-8"
            color="blue"
            size="large"
            variant="tonal"
            block
          >
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-card>
</template>