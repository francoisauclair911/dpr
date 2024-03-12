<template>
  <v-app-bar v-bind="$attrs" :extended="display.xs.value">
    <slot name="prepend-title"></slot>
    <v-toolbar-title class="text-primary text-h6 flex-shrink-0 ml-0 px-0">
      <slot name="title">
        <nuxt-link to="/" class="text-primary text-decoration-none">
          {{ settings ? settings.site_title.value : 'ADRA' }}
        </nuxt-link>
      </slot>
    </v-toolbar-title>
    <v-spacer />

    <template v-if="display.xs.value" #extension>
      <slot> </slot>
    </template>
    <template v-if="!display.xs.value">
      <slot> </slot>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const display = useDisplay();
const { settings } = useSettingsStore()

</script>