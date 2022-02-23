<template>
  <v-navigation-drawer v-bind="$attrs">
    <v-list color="primary" class="text-h6">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        nuxt
        exact
        :disabled="item.disabled"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon class="grey--text text--lighten-4">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="grey--text text--lighten-2"
            v-text="item.title"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template #append>
      <v-divider></v-divider>
      <MainUserNavigationDrawer
        v-if="$auth.loggedIn"
      ></MainUserNavigationDrawer>
      <v-list v-else>
        <v-list-item-group>
          <v-list-item @click="$auth.loginWith('awsCognito')">
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Login </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    items() {
      let baseItems = []
      if (!this.$auth.loggedIn) {
        return baseItems
      }
      if (this.$auth.loggedIn) {
        baseItems.push(
          {
            title: 'Overview',
            icon: 'mdi-poll',
            to: '/',
            active: true,
            disabled: false,
          },
          {
            title: 'Donation Pages',
            icon: this.$entities.donationPage.icon,
            to: '/pages',
            active: false,
            disabled: false,
          },

          {
            title: 'Campaigns',
            icon: this.$entities.campaign.icon,
            to: '/campaigns',
            active: true,
          },
          {
            title: 'Appeals',
            icon: this.$entities.appeal.icon,
            to: '/appeals',
            active: true,
          },
          {
            title: 'Funds',
            icon: this.$entities.fund.icon,
            to: '/funds',
            active: true,
          }
        )
      }
      if (this.$isSuperadmin) {
        baseItems = [...baseItems]
      }
      return baseItems
    },
  },
}
</script>
