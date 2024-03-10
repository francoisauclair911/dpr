<template>
  <div class="flex-grow-1 d-flex justify-space-between align-center flex-wrap">
    <ButtonBack v-show="backBtn" @click="$emit('back')"></ButtonBack>
    <div class="text-subtitle-1">
      <span class="">{{ $t('components.donor_info_step.header.donation_amount') }}
        &#8226;
      </span>

      <b class="text-primary text-wrap text-break" v-text="displayedAmountText">
      </b>
    </div>
  </div>
</template>

<script setup>

defineProps({
  backBtn: {
    type: Boolean,
    default: true,
  },
})

const { $i18n } = useNuxtApp()
const paymentStore = usePaymentStore()

const displayedAmountText = computed(() => {
  return !paymentStore.isRecurring
    ? paymentStore.formattedAmount
    : `${paymentStore.formattedAmount}  ${$i18n.t(
      'components.donor_info_step.monthly'
    )}`
})

</script>
