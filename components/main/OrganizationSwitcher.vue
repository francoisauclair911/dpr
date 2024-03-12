<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-select v-bind="$attrs" density="compact" dark flat hide-details item-color="grey-lighten-1"
          class="text-white" placeholder="Switch organization" item-value="id" item-text="name"
          :disabled="navigationStore.organizations.list.length <= 1" :items="navigationStore.organizations.list"
          return-object :model-value="navigationStore.organizations.selected" @update:model-value="
      navigationStore.organizations.setSelectedOrganization($event)
      "></v-select>
      </div>
    </template>
    <span v-text="tooltip" />
  </v-tooltip>
</template>

<script setup>
const navigationStore = useNavigationStore()

const hasMultipleOrganizations = computed(() => {
  return navigationStore.organizations.list.length > 1
})

const tooltip = computed(() => {
  return hasMultipleOrganizations.value
    ? 'Make a selection'
    : 'No additional organizations available'
})
</script>
