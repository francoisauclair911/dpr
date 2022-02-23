<template>
  <v-badge dot inline :color="active ? 'primary lighten-2' : 'red lighten-2'" />
</template>

<script>
export default {
  name: 'ActiveBadge',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
