<template>
  <div class="d-flex">
    <v-btn :color="!isRecurring ? 'primary' : 'secondary'" plain class="flex-grow-1"
      @click="paymentStore.updateDonationType('one_time')">
      <v-icon left>mdi-gift</v-icon>
      {{ $t('components.donation_type_selector.one_time') }}</v-btn>
    <v-btn v-if="pagesStore.settings.recurring_donation_enabled" plain :color="isRecurring ? 'primary' : 'secondary'"
      class="flex-grow-1" @click="updateDonationType('recurring')">
      <v-icon left>mdi-refresh</v-icon>
      {{ $t('components.donation_type_selector.monthly') }}</v-btn>
  </div>
</template>

<script setup>

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
