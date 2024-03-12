<template>
  <v-card :elevation="elevation">
    <v-slide-x-transition hide-on-leave>
      <slot />
    </v-slide-x-transition>
  </v-card>
</template>

<script setup>
const props = defineProps({
  elevation: {
    type: Number,
    default: 10,
  },
})
</script>
