<template>
  <v-app-bar v-bind="$attrs" :extended="$vuetify.breakpoint.xsOnly">
    <slot name="prepend-title"></slot>
    <v-toolbar-title class="primary--text text-h6 flex-shrink-0">
      <slot name="title">ADRA Donation Receiver</slot>
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
