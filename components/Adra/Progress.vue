<template>
  <div>
    <slot>
      <h3 class="text-subtitle-1" v-text="defaultText" />
    </slot>
    <v-progress-circular class="mt-1" :color="progressColor" :size="loaderSize" :indeterminate="indeterminate"
      :value="value">
      <v-fab-transition>
        <slot name="icon">
          <v-icon v-if="success" :color="iconColor" :size="iconSize">mdi-check</v-icon>
          <v-icon v-else-if="hasError" color="red" :size="iconSize">mdi-exclamation</v-icon>
        </slot>
      </v-fab-transition>
    </v-progress-circular>
  </div>
</template>

<script setup>
const props = defineProps({
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
})

const isBoolean = computed(() => typeof props.loading === 'boolean')

const indeterminate = computed(() => {
  if (isBoolean.value) {
    return props.loading
  }
  return props.loading !== 'success' && props.loading !== 'error'
})

const success = computed(() => {
  return isBoolean.value ? !props.loading : props.loading === 'success'
})

const hasError = computed(() => {
  return props.error === true || props.loading === 'error'
})

const defaultText = computed(() => {
  if (hasError.value) {
    return 'An error occured'
  }
  if (success.value) {
    return 'Completed'
  }
  return 'Submitting your entry please wait...'
})

const progressColor = computed(() => {
  return hasError.value ? 'red' : props.loaderColor
})
</script>

<style lang="scss" scoped></style>
