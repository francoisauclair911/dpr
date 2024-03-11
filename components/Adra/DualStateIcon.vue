<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  iconActive: {
    type: String,
    required: true,
  },
  iconInactive: {
    type: String,
    required: true,
  },
})

const icon = computed(() => {
  return props.active ? props.iconActive : props.iconInactive
})
</script>

<style lang="scss" scoped></style>
