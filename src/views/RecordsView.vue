<script setup lang="ts">
import { useAuth } from '@/composables/auth'
import type { Record } from '@/types/record';
import { onMounted, reactive } from 'vue'

const { getToken } = useAuth()

const records = reactive<{
  data: Record[]
  isLoading: boolean
  isError: boolean
}>({
  data: [],
  isLoading: false,
  isError: false,
})

onMounted(async () => {
  await fetchRecords()
})

async function fetchRecords(): Promise<void> {
  try {
    records.isLoading = true
    const res = await fetch(new URL('v1/records', import.meta.env.VITE_API_BASE_URL), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })

    if (!res.ok) {
      records.isError = true
      throw new Error(`failed with status: ${res.status}`)
    }

    records.data = await res.json()
  } finally {
    records.isLoading = false
  }
}
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ records.data }}</pre>
  </div>
</template>