<template>
  <div>
    <slot :errors="fieldErrors" :has-error="hasError" :raw="errors" :has-wildcard="hasWildcard" :count="errorCount"
      :item-key="key" />
  </div>
</template>

<script setup>

const props = defineProps({
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
})

const validationStore = useValidationStore()

const errorLength = computed(() => {
  return Object.keys(errors.value).length
})

const errorCount = computed(() => {
  return 4444
})
const hasError = computed(() => {
  if (errors.value.length < 1) {
    return false
  }
  if (!props.hasWildcard) {
    return key.value in errors.value
  }
  return (
    Object.keys(errors.value).filter((k) => k.startsWith(key.value)).length >
    0
  )
})
const errors = computed(() => {
  return validationStore.errors
})
const prefix = computed(() => {
  return props.keepPrefix ? '' : 'data.'
})
const key = computed(() => {
  return prefix.value + props.name
})
const fieldErrors = computed(() => {
  if (!hasError.value) {
    return ''
  }
  if (!props.hasWildcard) {
    return errors.value[key.value]
  }
  const errorMessage = Object.entries(errors.value)
    // Get entry that starts with the same key
    .filter(([key, value]) => {
      return key.startsWith(key)
    })
    // extract value
    .map(([key, value]) => {
      return value
    })[0] // grab first one because they are the same most likely
  return errorMessage
})

</script>