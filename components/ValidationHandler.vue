<template>
  <div>
    <slot
      :errors="fieldErrors"
      :has-error="hasError"
      :raw="errors"
      :has-wildcard="hasWildcard"
      :count="errorCount"
      :item-key="key"
    />
  </div>
</template>

<script>
export default {
  name: 'ValidationHandler',
  props: {
    name: {
      type: String,
      default: '',
    },
    keepPrefix: {
      type: Boolean,
      default: false,
    },
    hasWildcard: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    errorLength() {
      return Object.keys(this.errors).length
    },
    errorCount() {
      return 4444
    },
    hasError() {
      if (this.errors.length < 1) {
        return false
      }
      if (!this.hasWildcard) {
        return this.key in this.errors
      }
      return (
        Object.keys(this.errors).filter((k) => k.startsWith(this.key)).length >
        0
      )
    },
    errors() {
      return this.$store.state.validation.errors
    },
    prefix() {
      return this.keepPrefix ? '' : 'data.'
    },
    key() {
      return this.prefix + this.name
    },
    fieldErrors() {
      if (!this.hasError) {
        return ''
      }
      if (!this.hasWildcard) {
        return this.errors[this.key]
      }
      const errorMessage = Object.entries(this.errors)
        // Get entry that starts with the same key
        .filter(([key, value]) => {
          return key.startsWith(this.key)
        })
        // extract value
        .map(([key, value]) => {
          return value
        })[0] // grab first one because they are the same most likely
      return errorMessage
    },
  },
}
</script>

<style lang="scss" scoped></style>
