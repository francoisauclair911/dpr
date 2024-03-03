<template>
  <v-card :elevation="elevation">
    <v-slide-x-transition hide-on-leave>
      <slot />
    </v-slide-x-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    elevation: {
      type: Number,
      default: 10,
    },
  },
}
</script>
