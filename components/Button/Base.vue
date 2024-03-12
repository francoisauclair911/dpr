<template>
  <v-btn class="adra-btn" v-bind="$attrs" @click="$emit('click')">
    <slot />
  </v-btn>
</template>

<script setup>
defineEmits(['click'])

</script>

<style lang="css">
.adra-btn {
  transition: all 0.1s ease-in-out;
}
</style>
