<template>
  <v-menu v-model="data.visibility" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
    offset-y min-width="auto">
    <template #activator="{ on, attrs }">
      <v-text-field :model-value="value" outlined prepend-inner-icon="" v-bind="{ ...attrs, ...$attrs }" clearable
        @update:model-value="$emit('input', $event)" v-on="on"></v-text-field>
    </template>
    <v-date-picker clearable @update:model-value="changed" v-bind="$attrs"></v-date-picker>
  </v-menu>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits([
  'input',
]);

const data = reactive({
  visibility: false,
})

function parseDate(date) {
  if (!date) return null

  const [month, day, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function changed(date) {
  emit('input', date)
  data.visibility = false
}
</script>

<style lang="scss" scoped></style>
