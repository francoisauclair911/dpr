<template>
  <v-btn v-bind="$attrs" @click="$emit('click')">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonBase',
}
</script>
