<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-select
          v-bind="$attrs"
          dense
          dark
          flat
          hide-details
          item-color="grey lighten-1"
          class="white--text"
          placeholder="Switch organization"
          item-value="id"
          item-text="name"
          :disabled="$store.state.navigations.organizations.list.length <= 1"
          :items="$store.state.navigations.organizations.list"
          return-object
          :value="$store.state.navigations.organizations.selected"
          @change="
            $store.commit('navigations/SET_SELECTED_ORGANIZATION', $event)
          "
        ></v-select>
      </div>
    </template>
    <span v-text="tooltip" />
  </v-tooltip>
</template>

<script>
export default {
  name: 'MainOrganizationSwitcher',
  computed: {
    hasMultipleOrganizations() {
      return this.$store.state.navigations.organizations.list.length > 1
    },
    tooltip() {
      return this.hasMultipleOrganizations
        ? 'Make a selection'
        : 'No additional organizations available'
    },
  },
}
</script>
