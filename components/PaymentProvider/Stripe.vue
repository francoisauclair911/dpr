<template>
  <div>
    <!-- <div class="d-flex">
      <v-btn plain class="flex-grow-1" @click="destroy">destroy</v-btn>
      <v-btn plain class="flex-grow-1" @click="initialize">Initialize</v-btn>
      <v-btn plain class="flex-grow-1" @click="completeDonation()"
        >confirm</v-btn
      >
      <v-btn plain class="flex-grow-1" @click="completeDonation()"
        >confirmTrue</v-btn
      >
    </div> -->
    <!-- <v-btn plain class="flex-grow-1" @click="clearVuex">clearVuex</v-btn> -->
    <v-skeleton-loader v-if="loading && !hasError" type="card" />
    <div v-show="!loading && !hasError" id="checkout"></div>
    <v-card v-if="hasError" class="mt-4">
      <v-alert outlined type="warning" color="primary" prominent>
        {{ $t('error_loading_payment_provider') }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

import { loadStripe } from '@stripe/stripe-js/pure'
loadStripe.setLoadParameters({ advancedFraudSignals: false }) // https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals
export default {
  data() {
    return {
      stripe: null,
      checkout: null,
      clientSecret: null,
      loading: true,
      hasError: false,
    }
  },
  computed: {
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
    ...mapState('languages', {
      languageCode: 'selected',
    }),
    ...mapState('settings', ['domain']),
    ...mapGetters('payment', ['convertedAmount']),
    ...mapGetters('settings', ['stripeAccountId']),
    initializePayload() {
      return {
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
          donationType: this.donationType,
          amount: this.convertedAmount,
          currency: this.currency,
        },
        donor: { ...this.donor, languageCode: this.languageCode },
        phone: this.phone,
        address: this.address,
        consents: this.consents,
      }
    },
  },
  async mounted() {
    await this.initialize()
    this.$emit('loaded')
  },
  beforeDestroy() {
    if (this.checkout) {
      this.checkout.destroy()
    }
  },

  methods: {
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
    completeDonation(fake = false) {
      this.$emit('success')
    },
    destroy() {
      this.checkout.destroy()
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
          onComplete: () => {
            this.completeDonation()
          },
        })
        this.checkoutSessionId = checkoutSessionId

        // Store donationIntentId for reuse on the thank you page
        this.$store.commit('payment/SET_DONATION_INTENT_ID', donationIntentId)
        this.loading = false

        checkout.mount('#checkout')
        this.checkout = checkout
      } catch (error) {
        console.log('🚀 ~ file: Stripe.vue:47 ~ initialize ~ error:', error)
        this.hasError = true
      }
    },
  },
}
</script>
