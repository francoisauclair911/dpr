<template>
  <v-btn large class="text-subtitle-2" plain icon @click="$router.back()">
    <v-icon>mdi-chevron-left</v-icon>
    <span class="text-subtitle-2 black--text text-capitalize">
      {{ $t('components.buttons.back') }}
    </span>
  </v-btn>
</template>

<script>
export default {}
</script>
