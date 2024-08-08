<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <v-row>
      <v-col>
        <h3>Run <b>{{ props.title }}</b> Operation</h3>
      </v-col>
    </v-row>

    <slot name="default" />

    <v-row>
      <v-col>
        <v-btn
          type="submit"
          block
          color="primary"
          variant="tonal"
          append-icon="mdi-arrow-right-bottom"
        >
          Run
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>