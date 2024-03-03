<template>
  <div v-if="$config.ADRA_DEBUG">
    <slot />
  </div>
</template>

<script>
export default {}
</script>
