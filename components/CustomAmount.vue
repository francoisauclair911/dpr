<template>
  <v-text-field
    elevation="0"
    oulined
    :value="displayedValue"
    :placeholder="$t('components.custom_amount.custom_amount_placeholder')"
    :prefix="currencySymbol"
    clearable
    @input="$emit('input', $event)"
  >
  </v-text-field>
</template>

<script>
import getSymbolFromCurrency from 'currency-symbol-map'

export default {
  name: 'CustomAmount',
  inject: ['page'],
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    displayedValue() {
      return this.value === 0 ? null : this.value
    },
    currencySymbol() {
      return getSymbolFromCurrency(this.page.attributes.settings.currency) || ''
    },
  },
}
</script>
