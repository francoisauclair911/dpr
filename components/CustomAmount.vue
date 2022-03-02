<template>
  <v-text-field
    v-bind="$attrs"
    type="number"
    elevation="0"
    oulined
    hide-details="auto"
    :value="displayedValue"
    :placeholder="$t('components.custom_amount.custom_amount_placeholder')"
    :prefix="currencySymbol"
    clearable
    @click:clear="$emit('clear')"
    @input="$emit('input', $event)"
  >
  </v-text-field>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CustomAmount',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('pages', ['currencySymbol']),
    displayedValue() {
      return this.value === 0 ? null : this.value
    },
  },
}
</script>
