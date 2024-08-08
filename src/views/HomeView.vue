<script setup lang="ts">
import { useAuth } from '@/composables/auth'
import { useOperation } from '@/composables/operation'
import { useAppStore } from '@/stores/app.store'
import type { Operation } from '@/types/operation'
import { computed, defineAsyncComponent, reactive, ref } from 'vue'

const appStore = useAppStore()
const { getToken } = useAuth()
const { performOperation } = useOperation()

const operation = ref(null)
const operations = ref([
  { title: 'Addition', value: 'addition'},
  { title: 'Subtraction', value: 'subtraction'},
  { title: 'Multiplication', value: 'multiplication'},
  { title: 'Division', value: 'division'},
  { title: 'Square Root', value: 'square_root'},
  { title: 'Random String', value: 'random_string'},
])

const createOperation = reactive<{
  data: Operation | null
  isLoading: boolean
  isError: boolean
}>({
  data: null,
  isLoading: false,
  isError: false,
})

const operationComponent = computed(() => createOperation.data?.name 
  ? defineAsyncComponent(() => import(`@/components/${createOperation.data?.name}_form.vue`)) 
  : ''
)

async function handleCreateOperation(): Promise<void> {
  try {
    createOperation.isLoading = true

    const res = await fetch(new URL('v1/operations', import.meta.env.VITE_API_BASE_URL), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ name: operation.value })
    })
    if (!res.ok) {
      // TODO: Logout user if status is 401
      createOperation.isError = true
      throw new Error(`failed with status: ${res.status}`)
    }

    createOperation.data = await res.json()
    if (createOperation.data) {
      appStore.balance -= createOperation.data.cost
    }
  } finally {
    createOperation.isLoading = false
  }
}

async function handlePerformOperation(payload: string): Promise<void> {
  if (!createOperation.data) {
    return
  }

  await performOperation(createOperation.data.id, payload)
}
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <form @submit.prevent="handleCreateOperation">
          <v-row>
            <v-col>
              <h1>Start an operation</h1>
            </v-col>
          </v-row>
      
          <v-row align="center">
            <v-col>
              <v-select
                v-model="operation"
                label="Select operation"
                density="compact"
                :items="operations"
                variant="outlined"
                required
                hide-details
              />
            </v-col>
      
            <v-col>
              <v-btn 
                :disabled="!operation || appStore.balance <= 0"
                :loading="createOperation.isLoading"
                type="submit"
                color="primary" 
                variant="outlined"
              >
                Create
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>

    <v-row v-if="createOperation.data || createOperation.isError">
      <v-col>
        <v-divider />
      </v-col>
    </v-row>

    <v-row v-if="createOperation.data">
      <v-col>
        <keep-alive>
          <component 
            :is="operationComponent"
            @submit="handlePerformOperation"
          />
        </keep-alive>
      </v-col>
    </v-row>

    <v-row v-else-if="createOperation.isError">
      <v-col>
        <v-alert variant="tonal" icon="mdi-alert-circle" color="error" prominent>Something bad happened!</v-alert>
      </v-col>
    </v-row>
  </div>
</template>
