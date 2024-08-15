<script lang="ts" setup>
import { CreateOperation, PerformOperation } from '@/services/Operation'
import RecordsTable from '@/components/records_table.vue'
import { useAppStore } from '@/stores/app.store'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, defineAsyncComponent, ref } from 'vue'
import type { Record } from '@/types/record'

const appStore = useAppStore()
const queryClient = useQueryClient()

const operation = ref<string | null>(null)
const operations = ref([
  { title: 'Addition', value: 'addition' },
  { title: 'Subtraction', value: 'subtraction' },
  { title: 'Multiplication', value: 'multiplication' },
  { title: 'Division', value: 'division' },
  { title: 'Square Root', value: 'square_root' },
  { title: 'Random String', value: 'random_string' },
])

const {
  data: createOperation,
  isPending: createOperationIsPending,
  isError: createOperationIsError,
  error: createOperationError,
  mutate: createOperationMutate,
  reset: createOperationReset,
} = useMutation({
  mutationFn: CreateOperation,
  onSuccess: async (err) => {
    if (err.status === 401) {
      await router.push({ name: 'login' })

      setToken('')
    }
  },
})

const {
  isError: performOperationIsError,
  error: performOperationError,
  mutate: performOperationMutate,
} = useMutation({
  mutationFn: PerformOperation,
  onSuccess: (record: Record) => {
    appStore.balance -= record.operation.cost
    queryClient.invalidateQueries({ queryKey: ['records'] })
    operation.value = null
    createOperationReset()
  },
})

const isError = computed(() => performOperationIsError.value || createOperationIsError.value)
const error = computed(() => performOperationError.value || createOperationError.value)

const operationComponent = computed(() =>
  createOperation.value
    ? defineAsyncComponent(
        () => import(`@/components/operation/${createOperation.value.name}_form.vue`)
      )
    : ''
)

async function handlePerformOperation(payload: string): Promise<void> {
  if (!createOperation.value) {
    return
  }

  performOperationMutate({
    operationId: createOperation.value.id,
    payload,
  })
}

async function handleCreateOperation(): Promise<void> {
  createOperationMutate(JSON.stringify({ name: operation.value }))
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
                :items="operations"
                density="compact"
                hide-details
                label="Select operation"
                required
                variant="outlined"
              />
            </v-col>

            <v-col>
              <v-btn
                :disabled="!operation || appStore.balance <= 0"
                :loading="createOperationIsPending"
                color="primary"
                type="submit"
                variant="outlined"
              >
                Create
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>

    <v-row v-if="createOperation">
      <v-col>
        <keep-alive>
          <component :is="operationComponent" @submit="handlePerformOperation" />
        </keep-alive>
      </v-col>
    </v-row>

    <v-row v-if="isError">
      <v-col>
        <v-alert color="error" icon="mdi-alert-circle" prominent variant="tonal">
          <p class="text-capitalize">
            {{ error.message }}
          </p>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <RecordsTable style="margin-top: 64px" />
      </v-col>
    </v-row>
  </div>
</template>
