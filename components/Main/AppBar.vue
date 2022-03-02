<template>
  <v-app-bar
    v-bind="$attrs"
    class="px-1 px-md-2"
    :extended="$vuetify.breakpoint.xsOnly"
  >
    <v-btn class="text-subtitle-2" plain icon @click="$router.back()">
      <v-icon>mdi-chevron-left</v-icon>
      <span class="text-subtitle-2 black--text text-capitalize"> Back</span>
    </v-btn>
    <v-toolbar-title class="primary--text text-h6"
      >ADRA Donation Receiver
    </v-toolbar-title>
    <v-spacer />

    <template v-if="$vuetify.breakpoint.xsOnly" #extension>
      <slot> </slot>
    </template>
    <template v-if="!$vuetify.breakpoint.xsOnly">
      <slot> </slot>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainAppBar',
}
</script>
