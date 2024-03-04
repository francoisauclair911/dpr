<template>
  <v-text-field v-bind="$attrs" type="number" elevation="0" oulined hide-details="auto" :value="displayedValue"
    :placeholder="$t('components.custom_amount.custom_amount_placeholder')" :prefix="pagesStore.currencySymbol"
    :suffix="paymentStore.isRecurring ? '/ monthly' : ''" clearable @click:clear="$emit('clear')" @input="update"
    v-on="$listeners">
  </v-text-field>
</template>

<script setup>
const paymentStore = usePaymentStore()
const pagesStore = usePagesStore()

const displayedValue = computed(() => {
  return paymentStore.amount === 0 ? null : paymentStore.amount
})

function update(amount) {
  return paymentStore.updateAmount(amount)
}

</script>

<style>
.v-text-field__suffix {
  color: rgba(0, 0, 0, 0.6);
}
</style>
