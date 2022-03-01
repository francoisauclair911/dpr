<template>
  <div><slot :field="field" /></div>
</template>

<script>
export default {
  name: 'TranslationField',
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    trans() {
      return this.field
    },
  },
}
</script>

<style lang="scss" scoped></style>
