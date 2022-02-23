<template>
  <v-menu
    v-model="visibility"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="value"
        outlined
        prepend-inner-icon="mdi-calendar"
        v-bind="{ ...attrs, ...$attrs }"
        clearable
        @input="$emit('input', $event)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker clearable @input="changed"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'AdraDatePicker',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visibility: false,
    }
  },
  methods: {
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    changed(date) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> date', date)
      this.$emit('input', date)
      this.visibility = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
