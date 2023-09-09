<template>
  <v-app id="donation-receiver" class="primary">
    <MainAppBar
      class="px-1 px-md-2"
      color="white"
      flat
      app
      :clipped-left="primaryDrawer"
    >
      <template #prepend-title>
        <v-btn v-show="!$vuetify.breakpoint.xsOnly" nuxt to="/" icon plain text>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </template>
      <v-row class="pl-4" justify="start" justify-sm="end">
        <v-col cols="auto" sm="auto">
          <LanguageSelector />
        </v-col>
      </v-row>
      <!-- <LanguageSelector class="mx-4 flex-grow-1" /> -->
    </MainAppBar>
    <v-main>
      <v-container class="h-full py-0 px-0 mx-0" fluid>
        <v-card
          class="fill-height p-0"
          color="grey lighten-5"
          flat
          tile
          :style="cardStyle"
        >
          <v-row class="fill-height ma-0">
            <v-col class="py-0 px-0">
              <Nuxt />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

    <MainSnackbarNotification />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',

  computed: {
    ...mapState('navigations', ['primaryDrawer']),
    ...mapGetters('pages', ['attributes', 'backgroundSrc']),
    cardStyle() {
      if (this.$nuxt.context.isDev) {
        return {
          transition: `background-image 0.2s ease-in-out`,
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg width='250' height='250' viewBox='0 0 280 250' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ctext x='30' y='40' transform='rotate(-12)' fill='%23007b5f'%3eLOCAL DEV%3c/text%3e%3c/svg%3e ")`,
          backgroundRepeat: `repeat`,
          backgroundPosition: `center`,
        }
      }
      if (this.backgroundSrc) {
        return {
          transition: `background-image 0.2s ease-in-out`,
          backgroundImage: `url("${this.backgroundSrc}")`,
          backgroundRepeat: `repeat`,
          backgroundSize: `cover`,
          backgroundPosition: `center`,
          minHeight: `100vh`,
          maxHeight: '100vh',
          overflowY: 'scroll',
        }
      }
      return {}
    },
  },
}
</script>
<style>
.h-full {
  height: 100%;
  min-height: 100%;
}
/* .row {
  margin: 0;
}*/
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
</style>
