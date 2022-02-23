<template>
  <v-app id="donation-receiver" :style="style">
    <MainAppBar
      color="white"
      flat
      app
      :clipped-left="$store.state.navigations.primaryDrawer"
    />

    <v-main>
      <v-container class="h-full py-0 px-0 mx-0" fluid>
        <v-row class="fill-height" justify="center" no-gutters>
          <v-col cols="12">
            <v-card class="fill-height py-6" color="transparent" flat>
              <!-- <v-app-bar dense color="transparent" class="px-0 my-2" flat tile>
                <v-toolbar-title class="text-h6 white--text pl-0">
                  <MainBreadcrumbs />
                </v-toolbar-title>

                <v-spacer></v-spacer>
              </v-app-bar> -->

              <Nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-footer>
      <v-row>
        <v-spacer></v-spacer>
        <v-chip-group>
          <v-chip v-show="$config.APP_VERSION_V2" small color="primary"
            >v {{ $config.APP_VERSION_V2 }}</v-chip
          >
          <v-chip
            v-show="$config.GIT_COMMIT_SHA"
            class="ml-2"
            small
            color="secondary"
          >
            {{ $config.GIT_COMMIT_SHA }}</v-chip
          >
        </v-chip-group>
      </v-row>
    </v-footer> -->
    <MainSnackbarNotification />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',

  computed: {
    ...mapGetters('pages', ['settings']),
    style() {
      if (this.$store.state.pages.page) {
        return {
          backgroundColor: 'grey',
          backgroundImage: `url("${this.settings.background_src}")`,
          backgroundSize: 'cover',
        }
      }
      return {
        backgroundColor: 'grey',
      }
    },
  },
}
</script>
<style>
.h-full {
  height: 100%;
}
.row {
  margin: 0;
}
.col {
  padding: 0;
}
</style>
