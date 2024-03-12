<template>
  <v-app id="donation-receiver" class="primary">
    <MainAppBar class="px-1 px-md-2" color="white" flat app :clipped-left="pagesStore.primaryDrawer">
      <template #prepend-title>
        <v-btn v-show="!display.xs.value" nuxt to="/" icon variant="plain">
          <v-icon>{{ mdiHome }}</v-icon>
        </v-btn>
      </template>
      <v-row class="pl-4" justify="start" justify-sm="end">
        <v-col cols="4" sm="auto">
          <LanguageSelector />
        </v-col>
      </v-row>
      <!-- <LanguageSelector class="mx-4 flex-grow-1" /> -->
    </MainAppBar>
    <v-main>
      <v-container class="h-full py-0 px-0 mx-0" fluid>
        <v-card class="fill-height p-0" color="grey-lighten-5" flat tile :style="cardStyle">
          <v-row class="fill-height ma-0">
            <v-col class="py-0 px-0">
              <slot />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

    <MainSnackbarNotification />
  </v-app>
</template>

<script setup>

import { mdiHome } from '@mdi/js';

import { useDisplay } from 'vuetify';

const pagesStore = usePagesStore()
const runtimeConfig = useRuntimeConfig()
const display = useDisplay()

const cardStyle = computed(() => {

  if (runtimeConfig.public.isDev) {
    return {
      transition: `background-image 0.2s ease-in-out`,
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg width='250' height='250' viewBox='0 0 280 250' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ctext x='30' y='40' transform='rotate(-12)' fill='%23007b5f'%3eLOCAL DEV%3c/text%3e%3c/svg%3e ")`,
      backgroundRepeat: `repeat`,
      backgroundPosition: `center`,
    }
  }
  if (pagesStore.backgroundSrc) {
    return {
      transition: `background-image 0.2s ease-in-out`,
      backgroundImage: `url("${pagesStore.backgroundSrc}")`,
      backgroundRepeat: `repeat`,
      backgroundSize: `cover`,
      backgroundPosition: `center`,
      minHeight: `100vh`,
      maxHeight: '100vh',
      overflowY: 'scroll',
    }
  }
  return {}
});

</script>

<style>
.h-full {
  height: 100%;
  min-height: 100%;
}

/* .row {
  margin: 0;
}*/
.v-col-xl,
.v-col-xl-auto,
.v-col-xl-12,
.v-col-xl-11,
.v-col-xl-10,
.v-col-xl-9,
.v-col-xl-8,
.v-col-xl-7,
.v-col-xl-6,
.v-col-xl-5,
.v-col-xl-4,
.v-col-xl-3,
.v-col-xl-2,
.v-col-xl-1,
.v-col-lg,
.v-col-lg-auto,
.v-col-lg-12,
.v-col-lg-11,
.v-col-lg-10,
.v-col-lg-9,
.v-col-lg-8,
.v-col-lg-7,
.v-col-lg-6,
.v-col-lg-5,
.v-col-lg-4,
.v-col-lg-3,
.v-col-lg-2,
.v-col-lg-1,
.v-col-md,
.v-col-md-auto,
.v-col-md-12,
.v-col-md-11,
.v-col-md-10,
.v-col-md-9,
.v-col-md-8,
.v-col-md-7,
.v-col-md-6,
.v-col-md-5,
.v-col-md-4,
.v-col-md-3,
.v-col-md-2,
.v-col-md-1,
.v-col-sm,
.v-col-sm-auto,
.v-col-sm-12,
.v-col-sm-11,
.v-col-sm-10,
.v-col-sm-9,
.v-col-sm-8,
.v-col-sm-7,
.v-col-sm-6,
.v-col-sm-5,
.v-col-sm-4,
.v-col-sm-3,
.v-col-sm-2,
.v-col-sm-1,
.v-col,
.v-col-auto,
.v-col-12,
.v-col-11,
.v-col-10,
.v-col-9,
.v-col-8,
.v-col-7,
.v-col-6,
.v-col-5,
.v-col-4,
.v-col-3,
.v-col-2,
.v-col-1 {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
</style>
