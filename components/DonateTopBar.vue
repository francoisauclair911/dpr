<template>
  <div class="flex-grow-1 d-flex justify-space-between align-center flex-wrap">
    <ButtonBack v-show="backBtn" @click="$emit('back')"></ButtonBack>
    <div class="text-subtitle-1">
      <span class=""
        >{{ $t('components.donor_info_step.header.donation_amount') }}
        &#8226;
      </span>

      <b
        class="primary--text text-wrap text-break"
        v-text="displayedAmountText"
      >
      </b>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DonateTopBar',
  props: {
    backBtn: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('payment', ['formattedAmount', 'isRecurring']),
    displayedAmountText() {
      return !this.isRecurring
        ? this.formattedAmount
        : `${this.formattedAmount}  ${this.$t(
            'components.donor_info_step.monthly'
          )}`
    },
  },
}
</script>
