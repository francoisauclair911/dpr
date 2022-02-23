<template>
  <ButtonBase color="secondary" @click="$emit('click')">
    <slot />
  </ButtonBase>
</template>

<script>
export default {
  name: 'ButtonSecondary',
}
</script>
