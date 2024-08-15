<script lang="ts" setup>
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
        <h3>
          Run <b class="text-lowercase">{{ props.title }}</b> Operation
        </h3>
      </v-col>
    </v-row>

    <slot name="default" />

    <v-row>
      <v-col>
        <v-btn
          append-icon="mdi-arrow-right-bottom"
          block
          color="primary"
          type="submit"
          variant="tonal"
        >
          Run
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>
