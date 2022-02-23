<template>
  <p class="my-4 text-h5 text-center">
    <slot>No data found</slot>
    <br />
    <v-icon size="64">{{ icon }}</v-icon>
  </p>
</template>

<script>
export default {
  name: 'DataNoData',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
