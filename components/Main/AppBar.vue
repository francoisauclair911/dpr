<template>
  <v-app-bar
    v-bind="$attrs"
    :extended="$vuetify.breakpoint.xsOnly"
    class="mx-4"
  >
    <slot name="prepend-title"></slot>
    <v-toolbar-title class="primary--text text-h6 flex-shrink-0 ml-0 px-0">
      <slot name="title">
        <nuxt-link to="/" class="primary--text text-decoration-none">
          {{ settings.site_title.value }}
        </nuxt-link>
      </slot>
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
import { mapState } from 'vuex'
export default {
  name: 'MainAppBar',
  computed: {
    ...mapState('settings', ['settings']),
  },
}
</script>
