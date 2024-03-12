<template>
  <v-list class="text-h6">
    <v-list-item-group>
      <v-list-item>
        <v-list-item-action>
          <v-icon color="grey-lighten-1">{{ mdiOfficeBuilding }}</v-icon>
        </v-list-item-action>

        <MainOrganizationSwitcher />
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group>
      <v-list-item disabled>
        <v-list-item-action>
          <v-icon color="grey-lighten-1">{{ mdiAccount }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-grey-lighten-2">
            {{ $auth.user.username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group>
      <v-list-item @click="$auth.logout()">
        <v-list-item-action>
          <v-icon color="grey-lighten-1">{{ mdiLogout }}</v-icon>
        </v-list-item-action>
        <v-list-item-content class="text-grey-lighten-4">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script setup>

import { mdiLogout, mdiAccount, mdiOfficeBuilding } from '@mdi/js'

</script>
