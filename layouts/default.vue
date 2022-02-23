<template>
  <v-app id="user-service">
    <MainAppBar
      color="primary"
      flat
      app
      :clipped-right="hasSecondary"
      :clipped-left="$store.state.navigations.primaryDrawer"
      :has-secondary="hasSecondary"
    />

    <main-navbar
      app
      :value="$store.state.navigations.primaryDrawer"
      color="primary"
      clipped
      left
    />

    <v-main>
      <v-container class="h-full py-0 px-0 mx-0" fluid>
        <v-navigation-drawer
          v-if="hasSecondary"
          :value="$store.state.navigations.secondaryDrawer"
          color="grey lighten-5"
          clipped
          app
          right
        >
          <v-list-item class="px-2" nuxt exact :to="itemHeader.to">
            <v-list-item-avatar>
              <v-icon> {{ itemHeader.icon }} </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="itemHeader.title" />
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list nav>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :disabled="item.disabled"
              nuxt
              exact
              :to="item.to"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-row
          class="fill-height px-4 grey lighten-3"
          justify="center"
          no-gutters
        >
          <v-col cols="12">
            <v-card class="fill-height" color="transparent" flat>
              <v-app-bar dense color="transparent" class="px-0 my-2" flat tile>
                <v-toolbar-title class="text-h6 white--text pl-0">
                  <MainBreadcrumbs />
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-app-bar-nav-icon
                  v-if="hasSecondary"
                  color="primary"
                  @click="$store.commit('navigations/TOGGLE_SECONDARY_DRAWER')"
                ></v-app-bar-nav-icon>
              </v-app-bar>

              <Nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
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
    </v-footer>
    <MainSnackbarNotification />
  </v-app>
</template>

<script>
export default {
  computed: {
    hasSecondary() {
      const categories = ['dashboard', 'users']
      return categories.some((c) => this.$route.path.startsWith(`/${c}`))
    },
    category() {
      return this.$route.path.split('/')[1]
    },
    itemHeader() {
      const headers = {
        dashboard: {
          id: '1',
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/dashboard',
        },
        users: {
          id: '1',
          icon: 'mdi-account-box',
          title: 'Users Directory',
          to: '/users',
        },
      }
      return headers[this.category] || {}
    },
    items() {
      const items = {
        dashboard: [
          {
            id: '3',
            title: 'Your organizations',
            icon: 'mdi-office-building',
            to: '/dashboard/organizations',
          },
          {
            id: '4',
            title: 'Your systems',
            to: '/dashboard/systems',
            icon: 'mdi-desktop-mac-dashboard',

            disabled: true,
          },
          {
            id: '5',
            title: 'Your invites',
            icon: 'mdi-account-plus',

            to: '/dashboard/invites',
            disabled: true,
          },
        ],
        users: [
          {
            id: '3',
            title: 'Attach organizations',
            icon: 'mdi-office-building',
            to: '/users/attach/organizations',
          },
          {
            id: '4',
            title: 'Attach systems',
            to: '/dashboard/systems',
            icon: 'mdi-desktop-mac-dashboard',
          },
        ],
      }
      return items[this.category]
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
