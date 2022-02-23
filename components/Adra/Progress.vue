<template>
  <div>
    <slot>
      <h3 class="text-subtitle-1" v-text="defaultText" />
    </slot>
    <v-progress-circular
      class="mt-1"
      :color="progressColor"
      :size="loaderSize"
      :indeterminate="indeterminate"
      :value="value"
    >
      <v-fab-transition>
        <slot name="icon">
          <v-icon v-if="success" :color="iconColor" :size="iconSize"
            >mdi-check</v-icon
          >
          <v-icon v-else-if="hasError" color="red" :size="iconSize"
            >mdi-exclamation</v-icon
          >
        </slot>
      </v-fab-transition>
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'AdraProgressive',
  props: {
    loading: {
      type: [Boolean, String],
      default: true,
    },
    value: {
      type: Number,
      default: 100,
    },
    icon: {
      type: String,
      default: 'mdi-check',
    },
    iconSize: {
      type: Number,
      default: 44,
    },
    iconColor: {
      type: String,
      default: 'primary',
    },
    loaderSize: {
      type: Number,
      default: 68,
    },
    loaderColor: {
      type: String,
      default: 'primary',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isBoolean() {
      return typeof this.loading === 'boolean'
    },
    indeterminate() {
      if (this.isBoolean) {
        return this.loading
      }
      return this.loading !== 'success' && this.loading !== 'error'
    },
    success() {
      return this.isBoolean ? !this.loading : this.loading === 'success'
    },
    hasError() {
      return this.error === true || this.loading === 'error'
    },
    defaultText() {
      if (this.hasError) {
        return 'An error occured'
      }
      if (this.success) {
        return 'Completed'
      }
      return 'Submitting your entry please wait...'
    },
    progressColor() {
      return this.hasError ? 'red' : this.loaderColor
    },
  },
}
</script>

<style lang="scss" scoped></style>
