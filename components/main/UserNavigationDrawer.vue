<template>
  <v-list class="text-h6">
    <v-list-item-group>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="grey lighten-1">mdi-office-building</v-icon>
        </v-list-item-action>

        <MainOrganizationSwitcher />
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group>
      <v-list-item disabled>
        <v-list-item-action>
          <v-icon color="grey lighten-1">mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="grey--text text--lighten-2">
            {{ $auth.user.username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group>
      <v-list-item @click="$auth.logout()">
        <v-list-item-action>
          <v-icon color="grey lighten-1">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content class="grey--text text--lighten-4">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'UserNavigationDrawer',
}
</script>
