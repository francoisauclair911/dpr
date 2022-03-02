<template>
  <v-app-bar v-bind="$attrs" class="px-1 px-md-2">
    <v-btn class="text-subtitle-2" plain icon @click="$router.back()">
      <v-icon>mdi-chevron-left</v-icon>
      <span class="text-subtitle-2 black--text text-capitalize"> Back</span>
    </v-btn>
    <v-toolbar-title class="primary--text text-h6"
      >ADRA Donation Receiver
    </v-toolbar-title>
    <v-spacer />
    <slot />
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainAppBar',
}
</script>
