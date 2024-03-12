<template>
  <div>
    <slot :field="field" />
  </div>
</template>

<script setup>

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
})

const trans = computed(() => {
  return props.field
})


</script>
