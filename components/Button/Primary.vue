<template>
  <ButtonBase color="primary" @click="$emit('click')" v-bind="$attrs">
    <slot />
  </ButtonBase>
</template>
<script>
export default {
  name: 'ButtonPrimary',
}
</script>
