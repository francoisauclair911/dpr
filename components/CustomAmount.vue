<template>
  <v-text-field v-bind="$attrs" type="number" active :variant="outlined ? 'outlined' : 'underlined'" hide-details="auto"
    :modelValue="displayedValue" color="primary" :placeholder="$t('components.custom_amount.custom_amount_placeholder')"
    :prefix="pagesStore.currencySymbol" :suffix="paymentStore.isRecurring ? ' / monthly' : ''" clearable
    @click:clear="$emit('clear')" @update:modelValue="update">
  </v-text-field>
</template>

<script setup>
const paymentStore = usePaymentStore()
const pagesStore = usePagesStore()

defineProps(['outlined'])

const displayedValue = computed(() => {
  return paymentStore.amount === 0 ? null : paymentStore.amount
})

function update(amount) {
  return paymentStore.updateAmount(amount)
}

</script>

<style scoped>
.v-text-field__suffix {
  color: rgba(0, 0, 0, 0.6);
}
</style>
