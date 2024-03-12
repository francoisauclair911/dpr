<template>
  <div class="d-flex">
    <v-btn elevation="0" plain :class="['flex-grow-1', !isRecurring ? 'text-primary' : 'text-grey']"
      @click="paymentStore.updateDonationType('one_time')">
      <v-icon left>{{ mdiGift }}</v-icon>
      {{ $t('components.donation_type_selector.one_time') }}</v-btn>
    <v-btn elevation="0" v-if="pagesStore.settings.recurring_donation_enabled" plain
      :class="['flex-grow-1', isRecurring ? 'text-primary' : 'text-gray']"
      @click="paymentStore.updateDonationType('recurring')">
      <v-icon left>{{ mdiRefresh }}</v-icon>
      {{ $t('components.donation_type_selector.monthly') }}</v-btn>
  </div>
</template>

<script setup>

import { mdiGift, mdiRefresh } from '@mdi/js';

const paymentStore = usePaymentStore()
const pagesStore = usePagesStore()

const isRecurring = computed(() => {
  return paymentStore.donationType === 'recurring'
})

</script>

<!-- <script>
// import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'DonationTypeSelector',
  computed: {
    ...mapState('payment', ['donationType']),
    ...mapGetters('pages', ['settings']),

    isRecurring() {
    },
  },
  methods: {
    ...mapMutations('payment', ['updateDonationType']),
  },
}
</script> -->

<style lang="scss" scoped></style>
