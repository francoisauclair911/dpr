<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script>
export default {
  name: 'AdraDualStateIcon',
  props: {
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
  },
  computed: {
    icon() {
      return this.active ? this.iconActive : this.iconInactive
    },
  },
}
</script>

<style lang="scss" scoped></style>
