<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { GetRecords } from '@/services/Record'
import { ref } from 'vue'

const query = ref<string | null>()
const page = ref<number>(1)
const perPage = ref<number>(10)

const {
  data: records,
  error,
  isError,
  isPending,
} = useQuery({
  queryKey: ['records', { query, page, perPage }],
  queryFn: () =>
    GetRecords({
      q: query.value,
      page: page.value,
      per_page: perPage.value,
    }),
  throwOnError: true,
})

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Cost', key: 'amount' },
  { title: 'Name', key: 'operation.name' },
  { title: 'Response', key: 'operation_response' },
  { title: 'Balance', key: 'user_balance' },
]
</script>

<template>
  <v-sheet v-if="isError">
    <v-alert color="error" icon="mdi-alert-circle" prominent variant="tonal">
      <p class="text-capitalize">
        {{ error }}
      </p>
    </v-alert>
  </v-sheet>

  <div v-else>
    <v-text-field v-model="query" label="Search" placeholder="abc123" variant="outlined" />

    <v-data-table-server
      v-model:items-per-page="perPage"
      v-model:page="page"
      :headers
      :items="records?.data ?? []"
      :items-length="records?.total ?? 0"
      :loading="isPending"
      :search="query"
    />
  </div>
</template>

<style scoped></style>
