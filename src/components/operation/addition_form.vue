<script setup lang="ts">
import { reactive } from 'vue'
import OperationForm from './operation_form.vue'

const form = reactive({
  num1: "0",
  num2: "0",
})

const emit = defineEmits<{
  (e: 'submit', payload: string): void
}>()
</script>

<template>
  <OperationForm 
    title="Addition"
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

      <v-col cols="auto">
        <v-sheet class="px-6 py-2 font-weight-bold" rounded color="primary">
          +
        </v-sheet>
      </v-col>

      <v-col>
        <v-text-field
          v-model="form.num2"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
        />
      </v-col>
    </v-row>
  </OperationForm>
</template>
