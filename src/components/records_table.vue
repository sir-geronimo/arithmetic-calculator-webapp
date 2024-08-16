<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { GetRecords } from '@/services/Record'
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Record } from '@/types/record'

const query = ref<string>('')
const page = ref<number>(1)
const perPage = ref<number>(10)
const orderAsc = ref<boolean>(false)

const {
  data: records,
  error,
  isError,
  isPending,
} = useQuery({
  queryKey: ['records', { query, page, perPage, orderAsc }],
  queryFn: () =>
    GetRecords({
      q: query.value,
      page: page.value,
      per_page: perPage.value,
      order_asc: orderAsc.value,
    }),
  throwOnError: true,
})

const headers = [
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Cost', key: 'amount', sortable: false },
  { title: 'Name', key: 'operation.name', sortable: false },
  { title: 'Response', key: 'operation_response', sortable: false },
  { title: 'Balance', key: 'user_balance', sortable: false },
  {
    title: 'Date',
    key: 'date',
    value: (item: Record) => dayjs(item.date).format('YYYY-MM-DD HH:mm:ss'),
  },
]

function handleUpdateOptions({
  sortBy,
}: {
  sortBy: { key: string; order: 'desc' | 'asc' }[]
}): void {
  if (sortBy.length > 0) {
    const { key, order } = sortBy[0]
    orderAsc.value = key === 'date' && order === 'asc'
  }
}
</script>

<template>
  <div>
    <v-text-field v-model="query" label="Search" placeholder="abc123" variant="outlined" />

    <v-sheet v-if="isError">
      <v-alert color="error" icon="mdi-alert-circle" prominent variant="tonal">
        <p class="text-capitalize">
          {{ error }}
        </p>
      </v-alert>
    </v-sheet>

    <div v-else>
      <v-data-table-server
        v-model:items-per-page="perPage"
        v-model:page="page"
        :headers
        :items="records?.data ?? []"
        :items-length="records?.total ?? 0"
        :loading="isPending"
        :search="query"
        @update:options="handleUpdateOptions"
      />
    </div>
  </div>
</template>

<style scoped></style>
