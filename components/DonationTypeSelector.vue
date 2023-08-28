<template>
  <div class="d-flex">
    <v-btn
      :color="!isRecurring ? 'primary' : 'secondary'"
      plain
      class="flex-grow-1"
      @click="updateDonationType('one_time')"
    >
      <v-icon left>mdi-gift</v-icon>
      {{ $t('components.donation_type_selector.one_time') }}</v-btn
    >
    <v-btn
      plain
      :color="isRecurring ? 'primary' : 'secondary'"
      class="flex-grow-1"
      @click="updateDonationType('recurring')"
    >
      <v-icon left>mdi-refresh</v-icon>
      {{ $t('components.donation_type_selector.monthly') }}</v-btn
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DonationTypeSelector',
  computed: {
    ...mapState('payment', ['donationType']),
    isRecurring() {
      return this.donationType === 'recurring'
    },
  },
  methods: {
    ...mapMutations('payment', ['updateDonationType']),
  },
}
</script>

<style lang="scss" scoped></style>
