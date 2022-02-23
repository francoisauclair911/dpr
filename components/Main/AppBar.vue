<template>
  <v-app-bar v-bind="$attrs">
    <v-app-bar-nav-icon
      color="white"
      @click="$store.commit('navigations/TOGGLE_PRIMARY_DRAWER')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="white--text text-h6"
      >ADRA Donation Campaign Manager
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon
      v-if="hasSecondary"
      color="white"
      @click="$store.commit('navigations/TOGGLE_SECONDARY_DRAWER')"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainAppBar',
  props: {
    hasSecondary: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
