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
    :suffix="isRecurring ? '/ monthly' : ''"
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
    ...mapState('payment', ['amount', 'donationType']),
    ...mapGetters('pages', ['currencySymbol']),
    ...mapGetters('payment', ['isRecurring']),

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
<style>
.v-text-field__suffix {
  color: rgba(0, 0, 0, 0.6);
}
</style>
