<template>
  <div>
    <v-skeleton-loader v-if="loading && !error" type="card" />
    <div v-show="!loading && !error" id="checkout"></div>
    <v-card v-if="error" class="mt-4">
      <v-alert
        outlined
        color="primary"
        :icon="$vuetify.breakpoint.mdAndUp ? 'mdi-alert-circle-outline' : ''"
        prominent
      >
        {{ error.message }}
        <div
          class="d-flex"
          v-if="['amount_too_small', 'amount_too_large'].includes(error.code)"
        >
          <CustomAmount class="flex-1 flex-grow-1" autofocus />
          <ButtonPrimary class="my-4 ml-4" small @click="reset">
            {{ $t('update_amount') }}</ButtonPrimary
          >
        </div>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

import { loadStripe } from '@stripe/stripe-js/pure'
import DonateAmountStep from '../DonateAmountStep.vue'
loadStripe.setLoadParameters({ advancedFraudSignals: false }) // https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals
export default {
  data() {
    return {
      stripe: null,
      checkout: null,
      clientSecret: null,
      loading: true,
      error: null,
    }
  },
  computed: {
    returnUrl() {
      const url = new URL(window.location.href)
      return `${url.origin}${url.pathname}/confirm/{{DONATION_INTENT_ID}}`
    },
    ...mapState('payment', [
      'amount',
      'donationType',
      'currency',
      'donor',
      'phone',
      'address',
      'consents',
    ]),
    ...mapState('pages', ['page']),
    ...mapState('utms', ['utms']),
    ...mapState('languages', {
      languageCode: 'selected',
    }),
    ...mapState('settings', ['domain']),
    ...mapGetters('payment', ['convertedAmount']),
    ...mapGetters('settings', ['stripeAccountId']),
    // if we are using stripe to setup recurring, we need to pass the donation type as recurring_setup
    stripeDonationType() {
      return this.donationType === 'recurring'
        ? 'recurring_setup'
        : this.donationType
    },
    initializePayload() {
      return {
        returnUrl: this.returnUrl,
        paymentProvider: {
          referenceId: this.checkoutSessionId,
          accountId: this.stripeAccountId,
          name: 'stripe',
        },
        internalReferences: {
          organizationId: this.domain.organization_id,
          donationPageId: this.page.attributes.id,
        },
        donation: {
          donationType: this.stripeDonationType,
          amount: this.convertedAmount,
          currency: this.currency,
        },
        donor: { ...this.donor, languageCode: this.languageCode },
        phone: this.phone,
        address: this.address,
        consents: this.consents,
        utms: this.utms,
      }
    },
  },
  async mounted() {
    await this.initialize()
    this.$emit('loaded')
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    async reset() {
      this.error = null
      this.loading = true
      this.destroy()
      await this.initialize()
    },
    clearVuex() {
      localStorage.removeItem('vuex')
    },
    validateInitData() {
      if (!this.stripeAccountId) {
        throw new Error('stripeAccountId is required')
      }
      if (!this.$config.STRIPE_API_VERSION) {
        throw new Error('stripePublishableKey is required')
      }
    },
    destroy() {
      if (this.checkout) {
        this.checkout.destroy()
      }
    },
    async initialize() {
      try {
        this.validateInitData()
        const stripe = await loadStripe(this.$config.STRIPE_PUBLISHABLE_KEY, {
          apiVersion: this.$config.STRIPE_API_VERSION,
          betas: this.$config.STRIPE_API_BETAS.split(',').map((o) => o.trim()),
          stripeAccount: this.stripeAccountId,
        })
        const response = await this.$api.payment.post(
          '/authorize/stripe/create',
          this.initializePayload
        )
        const {
          clientSecret,
          id: checkoutSessionId,
          donationIntentId = null,
        } = response.data.data
        const checkout = await stripe.initEmbeddedCheckout({
          clientSecret,
        })
        this.checkoutSessionId = checkoutSessionId
        // Store donationIntentId for reuse on the thank you page
        this.$store.commit('payment/SET_DONATION_INTENT_ID', donationIntentId)
        this.loading = false
        checkout.mount('#checkout')
        this.checkout = checkout
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = {
            code: error.response.data?.internal_code || null,
            message: this.$t(
              `invalid_payment_request_exceptions.${
                error.response.data?.internal_code || 'generic'
              }`
            ),
          }
        }
      }
    },
  },
  components: { DonateAmountStep },
}
</script>
