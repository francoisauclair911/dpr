<template>
  <v-card color="primary" tile class="py-6 d-flex flex-column justify-center align-center white--text">
    <v-avatar color="white" size="60">
      <slot name="icon">
        <v-icon size="32" color="primary" v-text="icon" />
      </slot>
    </v-avatar>
    <span class="mt-2 text-subtitle-1">
      <slot name="title" />
    </span>

    <span class="text-subtitle-2 text-center">
      <slot name="subtitle" />
    </span>
  </v-card>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: 'mdi-heart',
  },
})
</script>
