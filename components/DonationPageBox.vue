<template>
  <v-card>
    <!-- <v-card max-height="200" tile flat> -->
    <v-img class="text-white align-end" cover :src="page.attributes.settings.background_src" max-height="400"
      height="300">
      <template #placeholder>
        <v-row class="fill-height grey" justify="center">
          <v-col cols="6">
            <img class="align-center text-center fill-height mx-auto"
              src="https://adra-public-assets.s3.eu-west-1.amazonaws.com/adra-horizontal-logo.svg" width="100%" />
          </v-col>
        </v-row>
      </template>
      <template #default>
        <div class="fill-height bottom-gradient">
          <v-card-title class="d-flex flex-wrap">
            <!-- <v-overlay :absolute="true" :value="true"> -->
            {{ page.attributes.content.title }}
            <v-spacer />
            <ButtonBase color="white" :to="page.attributes.slug">Donate</ButtonBase>
            <!-- </v-overlay> -->
          </v-card-title>
        </div>
      </template>
    </v-img>
    <!-- </v-card> -->
  </v-card>
</template>

<script setup>

import { provide } from 'vue';

const props = defineProps({
  page: {
    type: Object,
    default: () => { },
  }
})

provide('page', props.page)

</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to top,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 72px);
}
</style>
