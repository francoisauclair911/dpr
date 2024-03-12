<template>
  <ButtonBase color="secondary" @click="$emit('click')">
    <slot />
  </ButtonBase>
</template>

<script setup>
defineEmits(['click'])

</script>
