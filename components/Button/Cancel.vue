<template>
  <ButtonBase color="red" plain @click="$emit('click')">
    <slot />
  </ButtonBase>
</template>

<script>
export default {
  name: 'ButtonCancel',
}
</script>
