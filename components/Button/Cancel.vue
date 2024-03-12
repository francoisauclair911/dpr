<template>
  <ButtonBase color="red" plain @click="$emit('click')">
    <slot />
  </ButtonBase>
</template>

<script setup>
defineEmits(['click'])

</script>