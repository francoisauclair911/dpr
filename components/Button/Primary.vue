<template>
  <ButtonBase color="primary" @click="$emit('click')" v-bind="$attrs">
    <slot />
  </ButtonBase>
</template>

<script setup>
defineEmits(['click'])

</script>
