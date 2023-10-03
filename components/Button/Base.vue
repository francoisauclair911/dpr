<template>
  <v-btn class="adra-btn" v-bind="$attrs" @click="$emit('click')">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonBase',
}
</script>
<style lang="css">
.adra-btn {
  transition: all 0.1s ease-in-out;
}
</style>
