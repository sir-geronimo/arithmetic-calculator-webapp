<script setup lang="ts">
import OperationForm from './operation_form.vue'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <OperationForm 
    title="Random string"
    @submit="emit('submit')"
  >
  </OperationForm>
</template>