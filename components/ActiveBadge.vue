<template>
  <v-badge dot inline :color="active ? 'primary lighten-2' : 'red lighten-2'" />
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    required: true,
  },
})
</script>
