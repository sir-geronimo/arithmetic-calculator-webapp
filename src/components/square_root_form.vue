<script setup lang="ts">
import { reactive } from 'vue'
import OperationForm from './operation_form.vue'

const form = reactive({
  num1: 0,
})

const emit = defineEmits<{
  (e: 'submit', payload: string): void
}>()
</script>

<template>
  <OperationForm 
    title="Square root"
    @submit="emit('submit', JSON.stringify(form))"
  >
    <v-row align="center">
      <v-col>
        <v-text-field
          v-model="form.num1"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
        />
      </v-col>
    </v-row>
  </OperationForm>
</template>