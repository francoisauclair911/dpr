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
    @input="update"
  >
  </v-text-field>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'CustomAmount',

  computed: {
    ...mapState('payment', ['amount']),
    ...mapGetters('pages', ['currencySymbol']),
    displayedValue() {
      return this.amount === 0 ? null : this.amount
    },
  },
  methods: {
    ...mapMutations('payment', ['updateAmount']),
    update(amount) {
      return this.updateAmount(amount)
    },
  },
}
</script>
