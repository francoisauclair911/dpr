<template>
  <div>
    <v-skeleton-loader v-show="loading" type="list-item-two-line@8, actions">
    </v-skeleton-loader>
    <v-card v-show="!loading" flat>
      <!-- <v-card-text> -->

      <v-card-title class="black--text font-weight-bold">
        <DonateTopBar @back="$emit('back')"></DonateTopBar>
      </v-card-title>
      <v-card-text>
        <v-divider />

        <DonorInfoForm
          class="mb-2"
          :donor-info="value.donorInfo"
          @ready="loading = false"
          @input="$emit('input', { ...value, donorInfo: $event })"
        />

        <v-row>
          <v-col class="d-flex">
            <ButtonDonate @click="next">
              {{ $t('components.donor_info_step.payment_details_button_text') }}
            </ButtonDonate>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'DonateDonorInfoStep',
  inject: ['page'],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState('payment', ['amount', 'donor']),
    ...mapGetters('payment', ['formattedAmount', 'isRecurring']),
    displayedAmountText() {
      return !this.isRecurring
        ? this.formattedAmount
        : `${this.formattedAmount}  ${this.$t(
            'components.donor_info_step.monthly'
          )}`
    },
  },
  mounted() {
    const currency = this.page.attributes.settings.currency.toUpperCase()
    const gtmPayload = {
      event: 'add_to_cart',
      currency,
      value: this.amount,
      items: [
        {
          item_id: this.page.attributes.id,
          item_name: this.page.attributes.slug,
          affiliation: 'Donation Form',
          currency,
          item_category: 'One-time Donation',
          price: 0,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },

  methods: {
    next() {
      this.$store
        .dispatch('payment/validateDonorForm')
        .then((result) => {
          if (!result.error) {
            sessionStorage.setItem('donor', JSON.stringify(this.donorInfo))
            this.$emit('next')
          }
        })
        .catch((error) => {
          const code = parseInt(error.response && error.response.status)
          if (code === 422) {
            this.$store.dispatch(
              'notifications/danger',
              'Some fields require your attention'
            )
            this.$store.dispatch(
              'validation/handleValidation',
              error.response.data
            )
          }
        })
    },
  },
}
</script>
